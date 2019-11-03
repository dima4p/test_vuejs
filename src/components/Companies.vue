<template>
  <div class="container table-responsive">
    <h1>Companies</h1>
    {{errors[0]}}

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

        <tr v-for="company in companies" v-bind:key="company.id">
            <td>{{ company.identity }}</td>
            <td>{{ company.name }}</td>
            <td><router-link :to="{path: 'employees', query: {company_id: company.id}}">{{ company.employees }}</router-link></td>
            <td><router-link :to="{path: 'contractors', query: {company_id: company.id}}">{{ company.contractors }}</router-link></td>
            <td><router-link :to="{path: 'clients', query: {company_id: company.id}}">{{ company.clients }}</router-link></td>
            <td><router-link :to="`/company/${company.id}`">Show</router-link></td>
          <!--
            <td>{{ link_to 'Show', company }}</td>
            <td>{{ link_to 'Edit', edit_company_path(company) }}</td>
            <td>{{ link_to 'Destroy', company, method: :delete, data: { confirm: 'Are you sure?' } }}</td>
          -->
        </tr>
      </tbody>
    </table>
  <!--
  <div>bootstrap</div>
    <b-table :items="companies" :fields="fields" />
      <template v-slot:cell(employees)="data">
        <b-link :href='/employees?company_id=' + "data.item.id">{{data.value}}</b-link>
      </template>

    <div class="container">
    </div>
  -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Companies',
  data () {
    return {
      fields: [
        {
          key: 'identity',
          sortable: false
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'employees',
          sortable: false
        },
        {
          key: 'contractors',
          sortable: false
        },
        {
          key: 'clients',
          sortable: false
        },
        {
          key: 'show',
          label: '',
          sortable: false
        }
      ],
      companies: [],
      name: [],
      relationship: [],
      errors: []
    }
  },

  created () {
    this.companies = [{}]
    axios.request({
      method: 'get',
      url: 'http://test.devel:8008/companies.json',
      auth: {
        username: 'username',
        password: 'secret'
      }
    })
      .then(response => {
        this.companies = response.data
      })
      .catch(e => {
        this.error.push(e)
      })
  }
}
</script>
