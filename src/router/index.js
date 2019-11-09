import Vue from 'vue'
import Router from 'vue-router'
import Client from '@/components/Client'
import ClientForm from '@/components/ClientForm'
import Clients from '@/components/Clients'
import Companies from '@/components/Companies'
import Company from '@/components/Company'
import CompanyForm from '@/components/CompanyForm'
import Contractors from '@/components/Contractors'
import Contractor from '@/components/Contractor'
import ContractorForm from '@/components/ContractorForm'
import Employees from '@/components/Employees'
import Employee from '@/components/Employee'
import EmployeeForm from '@/components/EmployeeForm'
import PartnerCompanies from '@/components/PartnerCompanies'
import PartnerCompany from '@/components/PartnerCompany'
import PartnerCompanyForm from '@/components/PartnerCompanyForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Companies
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/client/:id',
      name: 'Client',
      component: Client
    },
    {
      path: '/client/:id/form',
      name: 'ClientForm',
      component: ClientForm
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
    },
    {
      path: '/contractors',
      name: 'Contractors',
      component: Contractors
    },
    {
      path: '/contractor/:id',
      name: 'Contractor',
      component: Contractor
    },
    {
      path: '/contractor/:id/form',
      name: 'ContractorForm',
      component: ContractorForm
    },
    {
      path: '/employees',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/employee/:id',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/employee/:id/form',
      name: 'EmployeeForm',
      component: EmployeeForm
    },
    {
      path: '/partner_companies',
      name: 'PartnerCompanies',
      component: PartnerCompanies
    },
    {
      path: '/partner_company/:id',
      name: 'PartnerCompany',
      component: PartnerCompany
    },
    {
      path: '/partner_company/:id/form',
      name: 'PartnerCompanyForm',
      component: PartnerCompanyForm
    }
  ]
})
