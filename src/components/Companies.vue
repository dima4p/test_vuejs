<template>
  <div class="container table-responsive">
    <h1>Companies</h1>
    {{errors[0]}}

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

        <tr v-for="company in companies" v-bind:key="company.id">
            <td>{{ company.identity }}</td>
            <td>{{ company.name }}</td>
            <td><router-link :to="{path: 'employees', query: {company_id: company.id}}">{{ company.employees }}</router-link></td>
            <td><router-link :to="{path: 'contractors', query: {company_id: company.id}}">{{ company.contractors }}</router-link></td>
            <td><router-link :to="{path: 'clients', query: {company_id: company.id}}">{{ company.clients }}</router-link></td>
            <td><router-link :to="`/company/${company.id}`">Show</router-link></td>
            <td><router-link :to="`/company/${company.id}/edit`">Edit</router-link></td>
          <!--
            <td>{{ link_to 'Destroy', company, method: :delete, data: { confirm: 'Are you sure?' } }}</td>
          -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Companies',
  data () {
    return {
      companies: [],
      name: [],
      relationship: [],
      errors: []
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: '/companies.json'
      })
        .then(response => {
          this.companies = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },

  created () {
    this.companies = [{}]
    this.read()
  }
}
</script>
