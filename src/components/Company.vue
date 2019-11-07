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
      <router-link :to="`/company/${company.id}/form`">Edit</router-link>
      |
      <router-link to="/companies">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Company',
  data () {
    return {
      company: {}
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: `/companies/${this.$route.params.id}.json`
      })
        .then(response => {
          this.company = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },

  created () {
    this.company = {}
    this.read()
  }
}
</script>
