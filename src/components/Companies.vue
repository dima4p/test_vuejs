<template>
  <div class="companies">
    <h1>Companies</h1>
    <b-table :items="companies" :fields="fields" />

    <div class="container">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Companies',
  data () {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['first_name', 'last_name', 'age'],
      companies: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>
