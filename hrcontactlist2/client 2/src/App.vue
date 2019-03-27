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
          <el-table-column label="ID" prop="_id"></el-table-column>
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Email" prop="email"></el-table-column>
          <el-table-column label="Phone" prop="phone"></el-table-column>
          <el-table-column label="Address" prop="address"></el-table-column>
          <el-table-column width="200" align="left">
            <template slot="header" slot-scope="scope" @click="slotBtn(scope.$index, scope.row)">
              <el-input v-model="search" size="mini" placeholder="Type to search name" class="contact-search"/>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="editBtn(scope.$index, scope.row), dialogFormVisible = true">Edit</el-button>
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
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      tableData: [],
      newUser: {},
      dialogFormVisible: false,
      editUser: {},
      search: ''
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    getUserData: function() {
      axios({
        method: 'get',
        url: "https://contactlisthr.herokuapp.com/getContacts"
      }).then(rs => {
        let number = 1
        rs.data.forEach(data => {
          data['number'] = number++
        })
        this.tableData = rs.data
      })
    },
    addContact: function() {
      const vm = this
      axios({
        method: 'post',
        url: 'https://contactlisthr.herokuapp.com/addContact',
        data: {
          ...this.newUser
        }
      }).then(rs => {
        rs.data['number'] = vm.tableData[vm.tableData.length-1].number + 1
        vm.tableData.push(rs.data)
      })
    },
    cfRemove: function(index, contact) {
      this.$confirm('This will permanently delete the contact. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(() => {
          axios({
            method: 'post',
            url: 'https://contactlisthr.herokuapp.com/deleteContact',
            data: {
              id: contact._id
            }
          }).then(() => {
            this.tableData.splice(index,1)
            console.log(contact['number']);
            this.$message({
              type: 'success',
              message: 'Deleted successfully'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    },
    editBtn: function(index, contact) {
      // Hiển thị info trong form
      this.editUser = contact
      this.editUser.index = index
    },
    slotBtn: function(index,row) {
      return
    },
    cfEdit: function() {
      axios({
        method: 'post',
        url: 'https://contactlisthr.herokuapp.com/editContact',
        data: {
          ...this.editUser
        }
      }).then(() => {
        this.tableData[this.editUser.index] = this.editUser
      })
    }
  }
}
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
