<template>
  <div id="app">
    <div class="container">
      <h1 class="list-title">Contact list</h1>
      <div class="card">
        <div class="card-header">Add New Contact</div>
        <div class="card-body">
          <form class="form-inline">
            <div class="form-group">
              <label for="name">Name:</label>
              <input class="form-control" type="text" id="name" v-model="newUser.name">
              <label for="email">Email:</label>
              <input class="form-control" type="text" id="email" v-model="newUser.email">
              <label for="phone">Phone:</label>
              <input class="form-control" type="text" id="phone" v-model="newUser.phone">
              <label for="address">Address:</label>
              <input class="form-control" type="text" id="address" v-model="newUser.address">
              <button class="btn btn-info" @click.prevent="addContact">Add Contact</button>
            </div>
          </form>
        </div>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-for="(user,number) in users" :key="number">
          <tr>
            <td scope="row">{{ number + 1 }}</td>
            <td>{{ user[".key"].slice(1) }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address }}</td>
            <td>
              <button
                class="btn btn-danger list-delete"
                data-toggle="modal" data-target="#exampleModal"
                @click='removeContact(user)'
              >-</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">Are you sure you want to delete this contact?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" >Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      newUser: {
        name: "",
        email: "",
        phone: "",
        address: ""
      }
    };
  },
  methods: {
    addContact: function() {
      usersRef.push(this.newUser);
      this.newUser.name = "";
      this.newUser.email = "";
      this.newUser.phone = "";
      this.newUser.address = "";
    },
    removeContact: function(user) {
      // usersRef.child(user[".key"]).remove();
    }
  }
};
</script>

<style>
.container {
  margin: 3rem auto;
}
.list-title {
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
}
.table td {
  vertical-align: middle !important;
}
tr:hover {
  background-color: rgb(235, 233, 233);
}
.card {
  margin-bottom: 2rem;
}
.card-header {
  font-weight: bold;
}
.form-inline input {
  width: 12vw !important;
}
.form-inline button {
  margin-left: 15px;
  font-size: 0.9em;
}
.form-inline label {
  margin: 0.5rem 5px;
  font-size: 0.9em;
  font-weight: bold;
}
.list-delete {
  padding: 2px 10px !important;
  font-weight: bold;
}
</style>
