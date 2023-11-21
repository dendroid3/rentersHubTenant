<template>
  <div class="back">
    <v-card
      class="mx-auto back"
      max-width="344"
      hover
    >
      <v-img
        :src="image_source"
        height="200px"
        cover
        class="back"
      />

      <p class="property-name mb-0 text-center">
        {{ property.name.toUpperCase() }}
      </p>
      <v-card-subtitle>
        {{ property.neighbourhood + ", " + property.county }}
        <br>
        {{ property.type }}
        <br>
        {{ property.price + "/" + property.payment }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          text
          small
          style="background: #A6CE37; color: white;"
          block
          @click="goToProperty"
        >
          <v-icon class="mr-4 white--text">
            mdi-eye
          </v-icon>
          View
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'PropertyCard',

  props: ['property'],

  data: () => ({
    image_index: 0
  }),

  computed: {
    image_source () {
      const baseUrl = 'https://landlords.rentershub.co.ke/'

      if (!this.property) {
        return
      }

      if (!this.property.property_images[0]) {
        return
      }

      return baseUrl + this.property.property_images[this.image_index].url
    }
  },

  methods: {
    ...mapActions(['setCurrentProperty']),

    goToProperty () {
      this.setCurrentProperty(this.property)
      this.$router.push('/property/' + this.property.id)
    }
  }
}
</script>
<style lang="css" scoped>
    .back {
      z-index: 20;
      position: relative;
    }
</style>
