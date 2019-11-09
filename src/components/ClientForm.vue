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
          <input v-model="client.first_name" placeholder="client first name" class='form-control'>
        </div>
      </div>
      <div class="field">
        <label class="col-sm-3 control-label" for="male">
          Last Name
          <span class="error">{{'last_name' in errors ? errors.last_name.join(', ') : ''}}</span>
        </label>
        <div class="col-sm-4">
          <input v-model="client.last_name" placeholder="client last name" class='form-control'>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button v-on:click="save">{{submit}}</button>
      </div>
    </div>
    <div class="container">
      <template v-if="'id' in this.client && this.client.id">
        <router-link :to="`/client/${client.id}`">Show</router-link>
        |
      </template>
      <router-link to="/clients">Back to list</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientForm',
  data () {
    return {
      client: {},
      error: [],
      errors: {},
      submit: '',
      title: ''
    }
  },

  methods: {
    save: function () {
      let method, url
      if ('id' in this.client && this.client.id) {
        method = 'patch'
        url = `/clients/${this.$route.params.id}.json`
      } else {
        method = 'post'
        url = '/clients.json'
      }
      this.$root.axios.request({
        method: method,
        url: url,
        data: {
          client: {
            first_name: this.client.first_name,
            last_name: this.client.last_name
          }
        }
      })
        .then(response => {
          if (response.status < 300) {
            this.client = response.data
            this.$router.push(`/client/${this.client.id}`)
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
          url: `/clients/${this.$route.params.id}.json`
        })
          .then(response => {
            this.client = response.data
            this.submit = 'Update Client'
            this.title = 'Editing Client "' + this.client.first_name +
              ' ' + this.client.last_name + '"'
          })
          .catch(e => {
            this.error.push(e)
          })
      } else {
        this.submit = 'Create Client'
        this.title = 'Creating a Client'
      }
    }
  },

  created () {
    this.read()
  }
}
</script>
