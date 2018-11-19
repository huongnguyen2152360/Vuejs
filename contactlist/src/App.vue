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
              <input
                class="form-control"
                type="text"
                id="name"
                v-model="newUser.name"
              />
              <label for="email">Email:</label>
              <input
                class="form-control"
                type="text"
                id="email"
                v-model="newUser.email"
              />
              <label for="phone">Phone:</label>
              <input
                class="form-control"
                type="text"
                id="phone"
                v-model="newUser.phone"
              />
              <label for="address">Address:</label>
              <input
                class="form-control"
                type="text"
                id="address"
                v-model="newUser.address"
              />
              <button class="btn btn-info" @click.prevent="addContact">
                Add Contact
              </button>
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
          </tr>
        </thead>
        <tbody v-for="(user,number) in users">
          <tr>
            <th scope="row" :key="number">{{ number }}</th>
            <td>{{ user[".key"] }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address }}</td>
          </tr>
        </tbody>
      </table>
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
</style>
