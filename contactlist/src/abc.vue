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
                @click='toRemove(user)'
              >-</button>
            </td>
          </tr>
        </tbody>
      </table>
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
              <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeContact()">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 