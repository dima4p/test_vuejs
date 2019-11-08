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
          <input v-model="partner_company.name" placeholder="partner_company name" class='form-control'>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button v-on:click="save">{{submit}}</button>
      </div>
    </div>
    <div class="container">
      <template v-if="'id' in this.partner_company && this.partner_company.id">
        <router-link :to="`/partner_company/${partner_company.id}`">Show</router-link>
        |
      </template>
      <router-link to="/partner_companies">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerCompanyForm',
  data () {
    return {
      partner_company: {},
      error: [],
      errors: {},
      submit: '',
      title: ''
    }
  },
  methods: {
    save: function () {
      let method, url
      if ('id' in this.partner_company && this.partner_company.id) {
        method = 'patch'
        url = `/partner_companies/${this.$route.params.id}.json`
      } else {
        method = 'post'
        url = '/partner_companies.json'
      }
      this.$root.axios.request({
        method: method,
        url: url,
        data: {
          partner_company: {
            name: this.partner_company.name
          }
        }
      })
        .then(response => {
          if (response.status < 300) {
            this.partner_company = response.data
            this.$router.push(`/partner_company/${this.partner_company.id}`)
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
          url: `/partner_companies/${this.$route.params.id}.json`
        })
          .then(response => {
            this.partner_company = response.data
            this.submit = 'Update Partner Company'
            this.title = 'Editing Partner Company "' + this.partner_company.name + '"'
          })
          .catch(e => {
            this.error.push(e)
          })
      } else {
        this.submit = 'Create Partner Company'
        this.title = 'Creating a Partner Company'
      }
    }
  },

  created () {
    this.read()
  }
}
</script>
