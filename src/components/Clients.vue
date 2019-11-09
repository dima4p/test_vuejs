<template>
  <div>
    <div class="container table-responsive">
      <h1>Clients</h1>

      <table class="table table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Ctoken</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Consultants (Company)</th>
            <th colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(client, index) in clients" v-bind:key="client.id">
            <td>{{ client.ctoken }}</td>
            <td>{{ client.first_name }}</td>
            <td>{{ client.last_name }}</td>
            <td><ul>
              <li v-for="consultant in client.consultants" v-bind:key="consultant.id">
                {{consultant.full_name}} ({{consultant.company_name}})
              </li>
            </ul></td>
            <td><router-link :to="`/client/${client.id}`">Show</router-link></td>
            <td><router-link :to="`/client/${client.id}/form`">Edit</router-link></td>
            <td><a href="#" v-on:click="destroy(index)">Destroy</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <router-link class="btn btn-primary" :to="`/client/0/form`">New Client</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clients',
  data () {
    return {
      clients: [],
      name: [],
      relationship: [],
      error: []
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: '/clients.json'
      })
        .then(response => {
          this.clients = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    destroy: function (index) {
      if (confirm(`Do you really want to delete the client "${this.clients[index].name}"`)) {
        this.$root.axios.request({
          method: 'delete',
          url: `/clients/${this.clients[index].id}.json`
        })
          .then(response => {
            this.$delete(this.clients, index)
          })
          .catch(e => {
            this.error.push(e)
          })
      }
    }
  },

  created () {
    this.clients = [{}]
    this.read()
  }
}
</script>
