<template>
  <nuxt-link :to="`/property/` + property.id">
    <div class="back mx-auto">
      <v-card
        class="back mx-auto"
        max-width="344"
        hover
      >
        <v-img
          :src="image_source"
          height="200px"
          cover
          class="back preview-image"
        >
          <div class="landlord-initials d-flex align-center justify-center">
            <v-img
              height="10"
              width="10"
              :src="require('../../assets/logo.png')"
            />
          </div>
        </v-img>
        <p class="property-name mb-0 text-center grey lighten-4">
          {{ property.name.toUpperCase() }}
        </p>
        <v-card-subtitle class="grey lighten-4 sub-title">
          <v-icon
            class="red--text"
            small
          >
            mdi-map-marker
          </v-icon>
          {{ property.neighbourhood + ", " + property.county }}
          <br>
          <v-icon
            class="black-text"
            small
          >
            mdi-home
          </v-icon>
          {{ property.type }}
          <br>
          <v-icon
            class="black--text"
            small
          >
            mdi-currency-usd
          </v-icon>
          {{ property.price + "/" + property.payment }}
        </v-card-subtitle>
      </v-card>
    </div>
  </nuxt-link>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'PropertiesPropertyCard',

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
    ...mapActions(['setCurrentProperty'])
  }
}
</script>
<style lang="css" scoped>
  .back {
    z-index: 20;
    position: relative;
  }
  .property-name{
    color: #09308F;
    z-index: 50;
    position: relative;
    font-size: 800;
  }
  .preview-image{
    position: relative;
    z-index: 50;
  }
  .sub-title{
    position: relative;
    z-index: 50;
  }
  .landlord-initials{
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    background: white;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border: 1px solid #09308F;
    z-index: 9999;
  }
  a{
    text-decoration: none;
  }
</style>
