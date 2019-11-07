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
          <input v-model="employee.first_name" placeholder="employee first name" class='form-control'>
        </div>
      </div>
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          Last Name
          <span class="error">{{'last_name' in errors ? errors.last_name.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <input v-model="employee.last_name" placeholder="employee last name" class='form-control'>
        </div>
      </div>
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          Company
          <span class="error">{{'company' in errors ? errors.company.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <select v-model="company_id">
            <option v-if="company_id === 0" value="0">Select the Company</option>
            <option
              v-for="company in companies"
              v-bind:key="company.id"
              v-bind:value="company.id"
            >
              {{company.name}}
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
      <template v-if="'id' in this.employee && this.employee.id">
        <router-link :to="`/employee/${employee.id}`">Show</router-link>
        |
      </template>
      <router-link to="/employees">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  data () {
    return {
      companies: [],
      employee: {},
      error: [],
      errors: {},
      company_id: 0,
      submit: '',
      title: ''
    }
  },

  methods: {
    save: function () {
      let method, url
      if ('id' in this.employee && this.employee.id) {
        method = 'patch'
        url = `/employees/${this.$route.params.id}.json`
      } else {
        method = 'post'
        url = '/employees.json'
      }
      this.$root.axios.request({
        method: method,
        url: url,
        data: {
          employee: {
            first_name: this.employee.first_name,
            last_name: this.employee.last_name,
            company_id: this.company_id
          }
        }
      })
        .then(response => {
          if (response.status < 300) {
            this.employee = response.data
            this.$router.push(`/employee/${this.employee.id}`)
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
          url: `/employees/${this.$route.params.id}.json`
        })
          .then(response => {
            this.employee = response.data
            this.company_id = this.employee.company_id
            this.submit = 'Update Employee'
            this.title = 'Editing Employee "' + this.employee.first_name +
              ' ' + this.employee.last_name + '"'
          })
          .catch(e => {
            this.error.push(e)
          })
      } else {
        this.submit = 'Create Employee'
        this.title = 'Creating a Employee'
      }
      this.$root.axios.request({
        method: 'get',
        url: '/companies.json'
      })
        .then(response => {
          this.companies = response.data
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
