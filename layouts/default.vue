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
export default {
  name: 'DefaultLayout'
}
</script>
