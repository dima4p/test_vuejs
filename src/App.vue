<template>
  <div id="app">
    <div id="nav">
      <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand to="/">Dashboard</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/companies">Companies</b-nav-item>
            <b-nav-item to="/employees">Employees</b-nav-item>
            <b-nav-item to="/partner_companies">Partner Companies</b-nav-item>
            <b-nav-item to="/contractors">Contractors</b-nav-item>
            <b-nav-item to="/clients">Clients</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
