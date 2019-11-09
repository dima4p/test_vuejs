<template>
  <div>
    <div class="container table-responsive">
      <h1>Partner Companies</h1>

      <table class="table table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th>Identity</th>
            <th>Name</th>
            <th>Employees</th>
            <th>Contractors</th>
            <th>Clients</th>
            <th colspan="3"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(partner_company, index) in partner_companies"
            v-bind:key="partner_company.id"
          >
            <td>{{ partner_company.identity }}</td>
            <td>{{ partner_company.name }}</td>
            <td><router-link :to="{path: 'contractors', query: {partner_company_id: partner_company.id}}">{{ partner_company.contractors }}</router-link></td>
            <td><router-link :to="{path: 'clients', query: {partner_company_id: partner_company.id}}">{{ partner_company.clients }}</router-link></td>
            <td><router-link :to="`/partner_company/${partner_company.id}`">Show</router-link></td>
            <td><router-link :to="`/partner_company/${partner_company.id}/form`">Edit</router-link></td>
            <td><a href="#" v-on:click="destroy(index)">Destroy</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container">
      <router-link class="btn btn-primary" :to="`/partner_company/0/form`">New Partner Company</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerCompanies',
  data () {
    return {
      partner_companies: [],
      name: [],
      relationship: [],
      error: []
    }
  },

  methods: {
    read: function () {
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
    },
    destroy: function (index) {
      if (confirm(`Do you really want to delete the partner company "${this.partner_companies[index].name}"`)) {
        this.$root.axios.request({
          method: 'delete',
          url: `/partner_companies/${this.partner_companies[index].id}.json`
        })
          .then(response => {
            this.$delete(this.partner_companies, index)
          })
          .catch(e => {
            this.error.push(e)
          })
      }
    }
  },

  created () {
    this.partner_companies = [{}]
    this.read()
  }
}
</script>
