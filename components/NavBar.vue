<template>
  <v-app-bar
    id="nav_bar"
    app
    color="primary lighten-1"
  >
    <div class="d-flex align-center pointer" @click="goTo('/')">
      <v-img
        alt="Vuetify Logo pointer"
        class="shrink mr-2"
        contain
        :src="require('../assets/logo.png')"
        transition="scale-transition"
        width="70"
      />
    </div>

    <v-spacer />

    <!-- <v-btn
      v-if="$vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg"
      text
      @click="goTo('/blogs')"
    >
      <span class="mr-2">Valuable Advice</span>
    </v-btn> -->

    <v-btn
      class="red white--text"
      href="https://landlords.rentershub.co.ke/account.php"
      text
    >
      <v-icon small>
        mdi-post
      </v-icon>
      <span>Post</span>
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
