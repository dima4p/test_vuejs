<template>
  <div class="container">
    <h1>Client "{{client.first_name}} {{client.last_name}}"</h1>
    <p>
      <strong>Ctoken:</strong>
      {{ client.ctoken }}
    </p>

    <p>
      <strong>First Name:</strong>
      {{ client.first_name }}
    </p>

    <p>
      <strong>Last Name:</strong>
      {{ client.last_name}}
    </p>

    <div class="container">
      <router-link :to="`/client/${client.id}/form`">Edit</router-link>
      |
      <router-link to="/clients">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Client',
  data () {
    return {
      client: {}
    }
  },

  methods: {
    read: function () {
      this.$root.axios.request({
        method: 'get',
        url: `/clients/${this.$route.params.id}.json`
      })
        .then(response => {
          this.client = response.data
        })
        .catch(e => {
          this.error.push(e)
        })
    }
  },

  created () {
    this.client = {}
    this.read()
  }
}
</script>
