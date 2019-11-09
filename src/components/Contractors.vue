<template>
  <div>
    <div class="container table-responsive">
      <h1>Contractors</h1>

      <table class="table table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Partner Company Identifier</th>
            <th>Clients</th>
            <th>Clients without Employees</th>
            <th colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(contractor, index) in contractors" v-bind:key="contractor.id">
            <td>{{ contractor.first_name }}</td>
            <td>{{ contractor.last_name }}</td>
            <td v-if="'partner_company' in contractor">{{ contractor.partner_company.identity}}</td>
            <td v-if="'partner_company' in contractor">
              <li
                v-for="client in contractor.partner_company.clients"
                v-bind:key="client.id"
              >
                <router-link :to="`/client/${client.id}`">
                  {{client.first_name}} {{client.last_name}}
                </router-link>
              </li>
            </td>
            <td>
              <li
                v-for="client in contractor.clients_without_employees"
                v-bind:key="client.id"
              >
                <router-link :to="`/client/${client.id}`">
                  {{client.first_name}} {{client.last_name}}
                </router-link>
              </li>
            </td>
            <td><router-link :to="`/contractor/${contractor.id}`">Show</router-link></td>
            <td><router-link :to="`/contractor/${contractor.id}/form`">Edit</router-link></td>
            <td><a href="#" v-on:click="destroy(index)">Destroy</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <router-link class="btn btn-primary" :to="`/contractor/0/form`">New Contractor</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contractors',
  data () {
    return {
      contractors: [],
      name: [],
      relationship: [],
      error: []
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: '/contractors.json'
      })
        .then(response => {
          this.contractors = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    destroy: function (index) {
      if (confirm(`Do you really want to delete the contractor "${this.contractors[index].name}"`)) {
        this.$root.axios.request({
          method: 'delete',
          url: `/contractors/${this.contractors[index].id}.json`
        })
          .then(response => {
            this.$delete(this.contractors, index)
          })
          .catch(e => {
            this.error.push(e)
          })
      }
    }
  },

  created () {
    this.contractors = [{}]
    this.read()
  }
}
</script>
