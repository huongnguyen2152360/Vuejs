<template>
    <div class="component">
      <h3>User Component</h3>
      <p>The name is {{ name }}, {{ age }} years old.</p>
      <button class="btn btn-info" @click="changeName">Change Name</button>
      <div class="row">
          <div class="col-xs-12 col-md-12 col-xl-6 col-lg-6">
              <app-user-details 
              :detailsName="name" 
              @nameWasReset="name = $event"
              :resetNameFunction="resetName"
              :userAge="age"
              ></app-user-details>
          </div>
          <div class="col-xs-12 col-md-12 col-xl-6 col-lg-6">
            <app-user-edit 
            :userAge="age"
            @ageWasEdited="age = $event"
            ></app-user-edit>
          </div>
      </div>
    </div>
  </template>
  
  <script>
    import UserDetails from "./UserDetails.vue"
    import UserEdit from "./UserEdit.vue"
    export default {
      data: () => {
        return {
          name: "Huong Nguyen",
          age: 18
        }
      },
      methods: {
        changeName() {
          this.name = "Name's changed to 'Robert'."
        },
        resetName() {
          this.name = "Huong Nguyen"
        }
      },
      components: {
        "appUserDetails": UserDetails,
        "appUserEdit": UserEdit
      }
    }
  </script>
  
  <style scoped>
  div {
    margin: 0 auto;
    text-align: center;
  }
  </style>
  