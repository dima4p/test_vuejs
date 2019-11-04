<template>
  <div class="container">
    <h1>Editing Company "{{company.name}}"</h1>
    <div class="form-group">
      <div class="field">
        <label class="col-sm-3 control-label" for="male">Name</label>
        <div class="col-sm-4">
          <input v-model="company.name" placeholder="edit me" class='form-control'>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button v-on:click="patch">Update me</button>
      </div>
    </div>
    <div class="container">
      <router-link :to="`/company/${company.id}`">Show</router-link>
      |
      <router-link to="/companies">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyEdit',
  data () {
    return {
      company: {}
    }
  },
  methods: {
    patch: function () {
      this.$root.axios.request({
        method: 'patch',
        url: `/companies/${this.$route.params.id}.json`,
        data: {
          company: {
            name: this.company.name
          }
        }
      })
        .then(response => {
          this.company = response.data
          this.$router.push(`/company/${this.company.id}`)
        })
        .catch(e => {
          this.error.push(e)
        })
    },
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
    this.read()
  }
}
</script>
