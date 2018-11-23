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
              <el-input placeholder="Name" v-model="newUser.name" class="contact-add"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Email" v-model="newUser.email" class="contact-add"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Phone" v-model="newUser.phone" class="contact-add"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="5" :xl="5">
              <el-input placeholder="Address" v-model="newUser.address" class="contact-add"></el-input>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="4" :xl="4">
              <el-button type="primary" plain @click.prevent="addContact">Add Contact</el-button>
            </el-col>
          </el-row>
        </el-card>
        <!-- End of Add Contact -->
        <!-- Table -->
        <el-table height="500" style="width: 100%" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
          <el-table-column label="#" width="70" prop="number"></el-table-column>
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Email" prop="email"></el-table-column>
          <el-table-column label="Phone" prop="phone"></el-table-column>
          <el-table-column label="Address" prop="address"></el-table-column>
          <el-table-column width="200" align="left">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="Type to search name" class="contact-search"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                @click="editBtn(scope.$index, scope.row), dialogFormVisible = true"
              >Edit</el-button>
              <el-button size="mini" type="danger" @click="cfRemove(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- End of table -->
        <el-dialog title="Edit Form" :visible.sync="dialogFormVisible">
          <el-form :data="tableData">
            <el-form-item label="Name">
              <el-input autocomplete="off" v-model="editUser.name"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input autocomplete="off" v-model="editUser.email"></el-input>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input autocomplete="off" v-model="editUser.phone"></el-input>
            </el-form-item>
            <el-form-item label="Address">
              <el-input autocomplete="off" v-model="editUser.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="cfEdit(),dialogFormVisible = false">Confirm</el-button>
          </span>
        </el-dialog>
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
      dialogFormVisible: false,
      editUser: {},
      search: ''
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
            ...childData,
            id: childKey.slice(1),
            number: i++
          };
          dis.tableData.push(data);
          console.log(dis.tableData);
        });
      });
    },
    addContact: function() {
      usersRef.push(this.newUser).then(contact => {
        // newUser trả về 1 structor có lv1 là key của contact, lv2 là name, phone, ...
        // cần dùng once vs tên là "value" để lắng nghe event emit từ firebase rằng: trả data lv1 (key) và lv2 (name, phone, ...) của contact
        // để trả được về thì phải lấy data từ contact
        usersRef.child(contact.key).once("value", snapshot => {
          let snapValue = snapshot.val();
          this.tableData.push({
            name: snapValue.name,
            email: snapValue.email,
            phone: snapValue.phone,
            address: snapValue.address,
            id: contact.key.slice(1),
            number: this.tableData.length + 1
          });
        });
      });
    },
    cfRemove: function(index, contact) {
      this.$confirm(
        "This will permanently delete the contact. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          usersRef
            .child(`-${contact.id}`)
            .remove()
            .then(() => {
              this.tableData.splice(index, 1);
              this.$message({
                type: "success",
                message: `Delete completed: "${contact.name}"`
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    editBtn: function(index, contact) {
      // Hiển thị info trong form
      this.editUser.name = contact.name;
      this.editUser.phone = contact.phone;
      this.editUser.email = contact.email;
      this.editUser.address = contact.address;
      this.editUser.id = contact.id;
      this.editUser.number = contact.number;
    },
    cfEdit: function() {
      let updates = {};
      // usersRef.child(this.editUser.id).once("value", snapshot => {
      //   console.log(snapshot.val());
      // console.log(this.editUser);
      updates["name"] = this.editUser.name;
      updates["phone"] = this.editUser.phone;
      updates["email"] = this.editUser.email;
      updates["address"] = this.editUser.address;
      // console.log(`-${this.editUser.id}`);
      usersRef.child(`-${this.editUser.id}`).set(updates);
    }
    // usersRef.child(editUserValue.id).update(editUserValue);
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
.contact-add {
  margin-bottom: 1rem;
}
.el-table {
  margin: 2rem auto;
}
.el-form-item {
  margin-bottom: 0;
}
.contact-search {
  padding-left: 0 !important;
}
</style>
