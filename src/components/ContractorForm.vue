<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="form-group">
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          First Name
          <span class="error">{{'first_name' in errors ? errors.first_name.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <input v-model="contractor.first_name" placeholder="contractor first name" class='form-control'>
        </div>
      </div>
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          Last Name
          <span class="error">{{'last_name' in errors ? errors.last_name.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <input v-model="contractor.last_name" placeholder="contractor last name" class='form-control'>
        </div>
      </div>
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          Partner company
          <span class="error">{{'partner_company' in errors ? errors.partner_company.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <select v-model="partner_company_id">
            <option v-if="partner_company_id === 0" value="0">Select the Company</option>
            <option
              v-for="partner_company in partner_companies"
              v-bind:key="partner_company.id"
              v-bind:value="partner_company.id"
            >
              {{partner_company.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button v-on:click="save">{{submit}}</button>
      </div>
    </div>
    <div class="container">
      <template v-if="'id' in this.contractor && this.contractor.id">
        <router-link :to="`/contractor/${contractor.id}`">Show</router-link>
        |
      </template>
      <router-link to="/contractors">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractorForm',
  data () {
    return {
      partner_companies: [],
      contractor: {},
      error: [],
      errors: {},
      partner_company_id: 0,
      submit: '',
      title: ''
    }
  },

  methods: {
    save: function () {
      let method, url
      if ('id' in this.contractor && this.contractor.id) {
        method = 'patch'
        url = `/contractors/${this.$route.params.id}.json`
      } else {
        method = 'post'
        url = '/contractors.json'
      }
      this.$root.axios.request({
        method: method,
        url: url,
        data: {
          contractor: {
            first_name: this.contractor.first_name,
            last_name: this.contractor.last_name,
            partner_company_id: this.partner_company_id
          }
        }
      })
        .then(response => {
          if (response.status < 300) {
            this.contractor = response.data
            this.$router.push(`/contractor/${this.contractor.id}`)
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
          url: `/contractors/${this.$route.params.id}.json`
        })
          .then(response => {
            this.contractor = response.data
            this.partner_company_id = this.contractor.partner_company.id
            this.submit = 'Update Contractor'
            this.title = 'Editing Contractor "' + this.contractor.first_name +
              ' ' + this.contractor.last_name + '"'
          })
          .catch(e => {
            this.error.push(e)
          })
      } else {
        this.submit = 'Create Contractor'
        this.title = 'Creating a Contractor'
      }
      this.$root.axios.request({
        method: 'get',
        url: '/partner_companies.json'
      })
        .then(response => {
          this.partner_companies = response.data
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
