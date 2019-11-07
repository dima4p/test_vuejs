<template>
  <div class="container">
    <h1>Employee "{{employee.first_name}} {{employee.last_name}}"</h1>
    <p>
      <strong>Identifier:</strong>
      {{ employee.identifier }}
    </p>

    <p>
      <strong>First Name:</strong>
      {{ employee.first_name }}
    </p>

    <p>
      <strong>Last Name:</strong>
      {{ employee.last_name}}
    </p>

    <p>
      <strong>Company Name:</strong>
      {{ employee.company_name}}
    </p>

    <div class="container">
      <router-link :to="`/employee/${employee.id}/form`">Edit</router-link>
      |
      <router-link to="/employees">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Employee',
  data () {
    return {
      employee: {}
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: `/employees/${this.$route.params.id}.json`
      })
        .then(response => {
          this.employee = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },

  created () {
    this.employee = {}
    this.read()
  }
}
</script>
