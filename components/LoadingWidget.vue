<template>
  <div
    class="wrapper text-center"
  >
    <v-progress-circular
      :size="70"
      color="primary"
      indeterminate
    >
      <v-img
        class="white pa-2 my-h2 rounded pointer"
        :src="require(`../assets/logo.png`)"
        max-height="25"
        max-width="25"
        contain
        @click="go('')"
      />
    </v-progress-circular>
    <br>
    <br>
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'LoadingWidget',

  props: ['message']
}
</script>
