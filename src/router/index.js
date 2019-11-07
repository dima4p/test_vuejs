import Vue from 'vue'
import Router from 'vue-router'
import Companies from '@/components/Companies'
import Company from '@/components/Company'
import CompanyForm from '@/components/CompanyForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Companies
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies
    },
    {
      path: '/company/:id',
      name: 'Company',
      component: Company
    },
    {
      path: '/company/:id/form',
      name: 'CompanyForm',
      component: CompanyForm
    }
  ]
})
