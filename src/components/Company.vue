<template>
  <div class="container">
    <h1>Company "{{company.name}}"</h1>
    <p>
      <strong>Identity:</strong>
      {{ company.identity }}
    </p>

    <p>
      <strong>Name:</strong>
      {{ company.name }}
    </p>
    <div class="container">
      <!--{{ link_to 'Edit', edit_company_path(@company) }}
      |
      {{ link_to 'Back', companies_path }}-->
      <router-link to="/companies">Back to list</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Company',
  data () {
    return {
      company: {},
      id: this.$route.params.id
    }
  },

  created () {
    this.company = {}
    axios.request({
      method: 'get',
      url: `http://test.devel:8008/companies/${this.$route.params.id}.json`,
      auth: {
        username: 'username',
        password: 'secret'
      }
    })
      .then(response => {
        this.company = response.data
      })
      .catch(e => {
        this.error.push(e)
      })
  }
}
</script>
