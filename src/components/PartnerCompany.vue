<template>
  <div class="container">
    <h1>Partner Company "{{partner_company.name}}"</h1>
    <p>
      <strong>Identity:</strong>
      {{ partner_company.identity }}
    </p>

    <p>
      <strong>Name:</strong>
      {{ partner_company.name }}
    </p>
    <div class="container">
      <router-link :to="`/partner_company/${partner_company.id}/form`">Edit</router-link>
      |
      <router-link to="/partner_companies">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerCompany',
  data () {
    return {
      partner_company: {}
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: `/partner_companies/${this.$route.params.id}.json`
      })
        .then(response => {
          this.partner_company = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },

  created () {
    this.partner_company = {}
    this.read()
  }
}
</script>
