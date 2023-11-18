<template>
  <v-app-bar
    id="nav_bar"
    app
    color="#09308F"
  >
    <div class="d-flex align-center pointer white rounded" @click="goTo('/')">
      <v-img
        alt="Renters Hub Logo"
        class="shrink"
        contain
        :src="require('../assets/logo.png')"
        transition="scale-transition"
        width="70"
      />
    </div>

    <v-spacer />

    <v-btn
      class="red white--text"
      href="https://landlords.rentershub.co.ke/account.php"
      text
    >
      <span>Post Property</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'NavBar',

  methods: {
    goTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
<style lang="">

</style>
