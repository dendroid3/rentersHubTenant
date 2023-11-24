<template>
  <v-app-bar
    id="nav_bar"
    app
    color="#09308F"
  >
    <div
      id="logoDiv"
      class="d-flex align-center pointer white rounded pr-4 pt-1 pb-1"
      @click="goTo('/home')"
    >
      <v-img
        alt="Renters Hub Logo"
        class="shrink"
        contain
        :src="require('../assets/logo.png')"
        transition="scale-transition"
        width="60"
      />
      <h2>
        RentersHub
      </h2>
    </div>

    <v-spacer />

    <v-btn
      id="postButton"
      class="red white--text pr-4 pt-1 pb-1"
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
<style lang="css" scoped>
  #logoDiv{
    height: 100%;
  }
  #postButton{
    height: 100%;
  }
</style>
