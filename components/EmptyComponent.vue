<template>
  <div>
    <div class="grey lighten-2 d-flex justify-center pa-4 rounded">
      <section>
        <div class="text-center">
          <img
            class="img"
            cover
            :src="require('../assets/components/empty.svg')"
          >
        </div>
        {{ message }}
      </section>
    </div>
    <div class="d-flex justify-center">
      <v-spacer />
      <v-btn
        :color="`#A6CE37`"
        small
        class="white--text"
        @click="sendMessageToWhatsApp"
      >
        <v-icon
          class="mr-2"
          small
        >
          mdi-whatsapp
        </v-icon>
        WhatsApp
      </v-btn>
      <v-spacer />
      <v-btn
        :color="`#A6CE37`"
        small
        class="white--text"
        @click="call"
      >
        <v-icon
          class="mr-2"
          small
        >
          mdi-phone
        </v-icon>
        Call
      </v-btn>
      <v-spacer />
    </div>
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
      let message = 'Hello.%20I%20am%20from%20the%20website,%20https://rentershub.co.ke%20and%20I%20need%20some%20more%20assistance.%0a%0a'

      if (this.getFilters) {
        message = message + 'I%20am%20searching%20for%20a%20property%20that%20meets%20this%20criterion: '
      }

      if (this.getFilters.category) {
        message = message + '%0a*Category:* ' + this.getFilters.category
      }

      if (this.getFilters.neighbourhood) {
        message = message + '%0a*Neighbourhood:* ' + this.getFilters.neighbourhood
      }

      if (this.getFilters.type) {
        message = message + '%0a*Type:* ' + this.getFilters.type
      }

      if (this.getFilters.max) {
        message = message + '%0a*Max Rent:*  KSh ' + this.getFilters.max
      }

      if (this.getFilters.payment && this.getFilters.max) {
        message = message + '/' + this.getFilters.payment
      }

      if (this.getFilters.keywords) {
        message = message + '%0a*Keywords:* ' + this.getFilters.keywords
      }

      message = message + '%0a%0aPlease%20find%20me%20the%20house.%20Thank you.'

      const url = 'https://wa.me/+254731352350?text=' + message
      // alert(message)
      window.open(url)
    },

    call () {
      const url = 'tel:0731352350'
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
