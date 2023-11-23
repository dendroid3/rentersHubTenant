<template>
  <v-app>
    <nav-bar />
    <v-main>
      <Nuxt />
    </v-main>
    <footer-component />
    <!-- <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',

  methods: {
    ...mapActions(['fetchLocations'])
  },

  created () {
    this.fetchLocations()
  }
}
</script>
<style lang="css">
  .pointer{
    cursor: pointer;
  }

  .main-color{
    background: #09308F;
  }

  .main-color-2{
    background: #A6CE37;
  }
</style>
