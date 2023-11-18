<template>
  <div>
    <v-alert
      type="success"
    >
      {{ getAlertMessage }}
    </v-alert>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AlertComponent',

  computed: {
    ...mapGetters(['getAlertMessage'])
  }
}
</script>
<style lang="css" scoped>
    div{
        position: fixed;
        top: 1rem;
        right: 1rem;
        left: 1rem;
        z-index: 9999999;
    }
</style>
