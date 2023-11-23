<template>
  <div class="grey lighten-2 d-flex justify-center pa-4 rounded">
    <section>
      <div class="text-center">
        <img
          class="img"
          cover
          :src="require('../assets/components/empty.svg')"
        >
      </div>
      <div>
        {{ message }}
      </div>
      <div class="d-flex justify-center">
        <v-btn small class="green white--text" @click="sendMessageToWhatsApp">
          <v-icon small>
            mdi-whatsapp
          </v-icon>
          Contact Customer Care
        </v-btn>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EmptyComponent',

  props: ['message'],

  computed: {
    ...mapGetters(['getFilters', 'getSearchType'])
  },

  methods: {
    sendMessageToWhatsApp () {
      let message = 'Hello.%20I%20am%20from%20your%20website%20and%20I%20need%20some%20more%20assistance.\n'

      if (this.getFilters) {
        message = message + 'I%20am%20searching%20for%20a%20property%20that%20meet%20this%20creterion: '
      }

      if (this.getFilters.category) {
        message = message + '\n*Category:*' + this.getFilters.category
      }

      if (this.getFilters.neighbourhood) {
        message = message + '\n*Neighbourhood:*' + this.getFilters.neighbourhood
      }

      if (this.getFilters.type) {
        message = message + '\n*Type:*' + this.getFilters.type
      }

      if (this.getFilters.max) {
        message = message + '\n*Max Rent:* KSh ' + this.getFilters.max
      }

      if (this.getFilters.payment && this.getFilters.max) {
        message = message + '/' + this.getFilters.payment
      }

      if (this.getFilters.keywords) {
        message = message + '\n*Keyowrds:*' + this.getFilters.keywords
      }

      message = message + '\nCould%20you%20please%20help%20me%20on%20with%20this?\nI%20used%20the%20' + this.getSearchType + '%20search%20functionality.'

      const url = 'https://wa.me/25431352350?text=' + message
      // alert(message)
      window.open(url)
    }
  }
}
</script>
<style lang="css" scoped>
    .img{
        max-width: 15rem;
    }
</style>
