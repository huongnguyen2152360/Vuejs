<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 class="list-title">Contact list</h1>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="list-add-title">Add New Contact</span>
          </div>
          <!-- Add Contact -->
          <el-row :gutter="15">
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Name" v-model="newUser.name"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Email" v-model="newUser.email"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Phone" v-model="newUser.phone"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Address" v-model="newUser.address"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="4" :xl="4">
              <el-button type="primary" plain @click.prevent="addContact">Add Contact</el-button>
            </el-col>
          </el-row>
        </el-card>
        <!-- End of Add Contact -->
        <!-- Table -->
        <el-table height="500" style="width: 100%" :data="tableData">
          <el-table-column label="#" width="100" prop="number"></el-table-column>
          <el-table-column label="ID" width="180" prop="id"></el-table-column>
          <el-table-column label="Name" width="180" prop="name"></el-table-column>
          <el-table-column label="Email" width="180" prop="email"></el-table-column>
          <el-table-column label="Phone" width="180" prop="phone"></el-table-column>
          <el-table-column label="Address" width="180" prop="address"></el-table-column>
          <el-table-column label="##" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="cfRemove(tableData)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- End of table -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { usersRef } from "./firebase.js";

export default {
  name: "app",
  firebase: {
    users: usersRef
  },
  data() {
    return {
      tableData: [],
      newUser: {},
      modalUser: {}
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData: function() {
      let i = 1;
      const dis = this;
      usersRef.once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          const data = {
            id: childKey.slice(1),
            name: childData.name,
            email: childData.email,
            phone: childData.phone,
            address: childData.address,
            number: i++
          };
          dis.tableData.push(data);
        });
      });
    },
    addContact: function() {
      usersRef.push(this.newUser).then(contact => {
        // newUser trả về 1 structor có lv1 là key của contact, lv2 là name, phone, ...
        // cần dùng once vs tên là "value" để lắng nghe event emit từ firebase rằng: trả data lv1 (key) và lv2 (name, phone, ...) của contact
        // để trả được về thì phải lấy data từ contact
        usersRef.child(contact.key).once("value", snapshot => {
          console.log(snapshot.val());
          let snapValue = snapshot.val();
          this.tableData.push({
            id: contact.key.slice(1),
            name: snapValue.name,
            email: snapValue.email,
            phone: snapValue.phone,
            address: snapValue.address,
            number: tableData.length + 1
          });
        });
      });
    },
    cfRemove: function(tableData) {
      this.$confirm(
        "This will permanently delete the contact. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          beforeClose: (action, instance, done) => {
            if (action == "confirm") {
              console.log(tableData);
            } else {
              done();
            }
          }
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    toRemove: function(user) {
      this.modalUser = user;
    },
    removeContact: function() {
      usersRef.child(this.modalUser[".key"]).remove();
    }
  }
};
</script>

<style>
.list-add-title {
  font-weight: bold;
}
.list-title {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2rem;
}
.el-input {
  margin-bottom: 1rem;
}
.el-table {
  margin: 2rem auto;
}
</style>
