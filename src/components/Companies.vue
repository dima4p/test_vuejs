<template>
  <div>
    <div class="container table-responsive">
      <h1>Companies</h1>

      <table class="table table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Identity</th>
            <th>Name</th>
            <th>Employees</th>
            <th>Contractors</th>
            <th>Clients</th>
            <th colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(company, index) in companies" v-bind:key="company.id">
            <td>{{ company.identity }}</td>
            <td>{{ company.name }}</td>
            <td><router-link :to="{path: 'employees', query: {company_id: company.id}}">{{ company.employees }}</router-link></td>
            <td><router-link :to="{path: 'contractors', query: {company_id: company.id}}">{{ company.contractors }}</router-link></td>
            <td><router-link :to="{path: 'clients', query: {company_id: company.id}}">{{ company.clients }}</router-link></td>
            <td><router-link :to="`/company/${company.id}`">Show</router-link></td>
            <td><router-link :to="`/company/${company.id}/form`">Edit</router-link></td>
            <td><a href="#" v-on:click="destroy(index)">Destroy</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <router-link class="btn btn-primary" :to="`/company/0/form`">New Company</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Companies',
  data () {
    return {
      companies: [],
      name: [],
      params: {per_page: '0'},
      relationship: [],
      error: []
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: '/companies.json',
        params: this.params
      })
        .then(response => {
          this.companies = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    destroy: function (index) {
      if (confirm(`Do you really want to delete the company "${this.companies[index].name}"`)) {
        this.$root.axios.request({
          method: 'delete',
          url: `/companies/${this.companies[index].id}.json`
        })
          .then(response => {
            this.$delete(this.companies, index)
          })
          .catch(e => {
            this.error.push(e)
          })
      }
    }
  },

  created () {
    this.companies = [{}]
    this.read()
  }
}
</script>
