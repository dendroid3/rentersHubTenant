<template>
  <v-col class="col-4 px-1 mb-1 white--text">
    <div
      class=" black--text pointer rounded elevation-10"
      :class="{
        'main-color-2': is_here,
        'blue lighten-4': !is_here
      }"
      @click="go"
    >
      <div class="d-flex justify-center bold">
        {{ title }}
      </div>
      <v-divider inset class="red--text dark" dark />
      <div class="d-flex justify-end align-center px-1">
        <v-spacer />
        <span> {{ count }} </span>
      </div>
    </div>
  </v-col>
</template>
<script>
export default {
  name: 'AdminContentTab',

  props: ['title', 'count', 'url'],

  data: () => ({
    is_here: false
  }),

  watch: {
    $route () {
      this.isItHere()
    }
  },

  mounted () {
    this.boot()
  },

  methods: {
    go () {
      this.$router.push(this.url)
    },

    isItHere () {
      if (this.$router.history.current.query.status) {
        const status = this.$router.history.current.query.status
        const url = this.url
        if (status === url.charAt((url.length - 1))) {
          this.is_here = true
        } else {
          this.is_here = false
        }
      } else if (this.title === 'All') {
        this.is_here = true
      } else {
        this.is_here = false
      }
    },

    boot () {
      this.isItHere()
    }
  }
}
</script>
