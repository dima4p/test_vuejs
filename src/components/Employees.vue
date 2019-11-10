<template>
  <div>
    <div class="container table-responsive">
      <h1>Employees</h1>

      <table class="table table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Identifier</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Clients</th>
            <th colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(employee, index) in employees" v-bind:key="employee.id">
            <td>{{ employee.identifier }}</td>
            <td>{{ employee.first_name }}</td>
            <td>{{ employee.last_name }}</td>
            <td>{{ employee.company_name }}</td>
            <td><router-link :to="{path: 'clients', query: {employee_id: employee.id}}">{{ employee.clients }}</router-link></td>
            <td><router-link :to="`/employee/${employee.id}`">Show</router-link></td>
            <td><router-link :to="`/employee/${employee.id}/form`">Edit</router-link></td>
            <td><a href="#" v-on:click="destroy(index)">Destroy</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <router-link class="btn btn-primary" :to="`/employee/0/form`">New Employee</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Employees',
  data () {
    return {
      employees: [],
      name: [],
      params: {per_page: '0'},
      relationship: [],
      error: []
    }
  },

  methods: {
    read: function () {
      console.log(this.$route.query)
      if (this.$route.query.company_id) {
        this.params['company_id'] = this.$route.query.company_id
      }
      console.log(this.params)
      this.$root.axios.request({
        method: 'get',
        url: '/employees.json',
        params: this.params
      })
        .then(response => {
          this.employees = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    destroy: function (index) {
      if (confirm(`Do you really want to delete the employee "${this.employees[index].name}"`)) {
        this.$root.axios.request({
          method: 'delete',
          url: `/employees/${this.employees[index].id}.json`
        })
          .then(response => {
            this.$delete(this.employees, index)
          })
          .catch(e => {
            this.error.push(e)
          })
      }
    }
  },

  created () {
    this.employees = [{}]
    this.read()
  }
}
</script>
