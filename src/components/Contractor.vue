<template>
  <div class="container">
    <h1>Contractor "{{contractor.first_name}} {{contractor.last_name}}"</h1>
    <p>
      <strong>First Name:</strong>
      {{ contractor.first_name }}
    </p>

    <p>
      <strong>Last Name:</strong>
      {{ contractor.last_name}}
    </p>

    <p>
      <strong>Partner Company:</strong>
      {{ contractor.partner_company.name}}
    </p>

    <div class="container">
      <router-link :to="`/contractor/${contractor.id}/form`">Edit</router-link>
      |
      <router-link to="/contractors">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contractor',
  data () {
    return {
      contractor: {}
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: `/contractors/${this.$route.params.id}.json`
      })
        .then(response => {
          this.contractor = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },

  created () {
    this.contractor = {}
    this.read()
  }
}
</script>
