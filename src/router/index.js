import Vue from 'vue'
import Router from 'vue-router'
import Companies from '@/components/Companies'
import Company from '@/components/Company'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Companies',
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
    }
  ]
})
