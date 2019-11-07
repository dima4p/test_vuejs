<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="form-group">
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          Name
          <span class="error">{{'name' in errors ? errors.name.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <input v-model="company.name" placeholder="company name" class='form-control'>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button v-on:click="save">{{submit}}</button>
      </div>
    </div>
    <div class="container">
      <template v-if="'id' in this.company && this.company.id">
        <router-link :to="`/company/${company.id}`">Show</router-link>
        |
      </template>
      <router-link to="/companies">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyForm',
  data () {
    return {
      company: {},
      error: [],
      errors: {},
      submit: '',
      title: ''
    }
  },
  methods: {
    save: function () {
      let method, url
      if ('id' in this.company && this.company.id) {
        method = 'patch'
        url = `/companies/${this.$route.params.id}.json`
      } else {
        method = 'post'
        url = '/companies.json'
      }
      this.$root.axios.request({
        method: method,
        url: url,
        data: {
          company: {
            name: this.company.name
          }
        }
      })
        .then(response => {
          if (response.status < 300) {
            this.company = response.data
            this.$router.push(`/company/${this.company.id}`)
          } else {
            this.errors = response.data
          }
        })
        .catch(e => {
          this.error.push(e)
        })
    },
    read: function () {
      if (this.$route.params.id > 0) {
        this.$root.axios.request({
          method: 'get',
          url: `/companies/${this.$route.params.id}.json`
        })
          .then(response => {
            this.company = response.data
            this.submit = 'Update Company'
            this.title = 'Editing Company "' + this.company.name + '"'
          })
          .catch(e => {
            this.error.push(e)
          })
      } else {
        this.submit = 'Create Company'
        this.title = 'Creating a Company'
      }
    }
  },

  created () {
    this.read()
  }
}
</script>
