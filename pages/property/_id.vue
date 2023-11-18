<template>
  <div>
    <div class="pa-4 wrapper">
      <div id="top_div"> </div>
      <section v-if="propertyIsAvailable">
        <v-row class="pa-4">
          <v-col class="col-md-8 col-12">
            <v-row class="d-flex justify-center mb-2 mt-1">
              <h3 class="text-center">
                {{ getCurrentProperty.name }}
              </h3>
            </v-row>
            <v-img
              :src="image_source"
              height="350px"
              cover
              class="back"
            />

            <div class="d-flex justify-center mt-1 image-preview-strip">
              <div v-for="(image, index) in getCurrentProperty.property_images" :key="image.id" class="d-flex col-md-1 col-2 " @click="showImage(index)">
                <v-img
                  :src="`https://landlords.rentershub.co.ke/` + image.url"
                  cover
                  :class="{
                    'image-preview': image_in_view == index
                  }"
                />
              </div>
            </div>
          </v-col>
          <v-col class="col-md-4 col-12">
            <h4>Managed by:</h4>
            <span>{{ getCurrentProperty.contact.name }}</span> <br> <br>

            <h4>Company:</h4>
            <span>{{ getCurrentProperty.company.name }}</span> <br> <br>

            <v-btn block class="red white--text" small @click="toogleContactForm">
              Contact Landlord
            </v-btn> <br><br>

            <h4>Description:</h4>
            <span v-html="description" />
          </v-col>
        </v-row>
        <div v-if="show_contact_form" class="contact grey lighten-2 rounded">
          <v-row class="no-gutters inner-row">
            <v-icon class="close-button red white--text" @click="show_contact_form = false">
              mdi-close
            </v-icon>
            <section v-if="prospect_recorded">
              <v-col class="col-12 text-center">
                {{ "Hello " + prospect.name + "," }} <br>
                You can contact {{ getCurrentProperty.contact.name }} through the following contacts:
              </v-col>
              <v-col class="col-12 mt-4">
                <div class="text-center">
                  Primary phone: <br>
                  {{ "+254 " + getCurrentProperty.contact.primary_phone_number }}
                </div>
                <v-row class="text-center no-gutters">
                  <v-col class="col-6 text-end">
                    <v-btn
                      text
                      color="orange-lighten-2"
                      variant="text"
                      @click="perpToRecordClick('Primary Phone')"
                    >
                      <v-icon large class="blue--text">
                        mdi-phone
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col class="col-6 text-start">
                    <v-btn
                      text
                      color="orange-lighten-2"
                      variant="text"
                      @click="perpToRecordClick('Primary WhatsApp')"
                    >
                      <v-icon large class="green--text">
                        mdi-whatsapp
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col v-if="getCurrentProperty.contact.secondary_phone_number" class="col-12 mt-4">
                <div class="text-center">
                  Secondary phone: <br>
                  {{ "+254 " + getCurrentProperty.contact.secondary_phone_number }}
                </div>
                <v-row class="text-center no-gutters">
                  <v-col class="col-6 text-end">
                    <v-btn
                      text
                      color="orange-lighten-2"
                      variant="text"
                      @click="perpToRecordClick('Secondary Phone')"
                    >
                      <v-icon large class="blue--text">
                        mdi-phone
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col class="col-6 text-start">
                    <v-btn
                      text
                      color="orange-lighten-2"
                      variant="text"
                      @click="perpToRecordClick('Secondary WhatsApp')"
                    >
                      <v-icon large class="green--text">
                        mdi-whatsapp
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col class="col-12 mt-4">
                <div class="text-center">
                  Email: <br>
                  {{ getCurrentProperty.contact.email }}
                </div>
                <v-row class="text-center no-gutters">
                  <v-col class="col-12 text-center">
                    <v-btn
                      text
                      color="orange-lighten-2"
                      variant="text"

                      @click="perpToRecordClick('Email')"
                    >
                      <v-icon large class="green--text">
                        mdi-mail
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </section>
            <section v-else class="full-width">
              <p class="text-center">
                To get connected, please enter your name:
              </p>
              <v-text-field
                v-model="prospect.name"
                placeholder="Enter name"
                clearable
                outlined
                type="text"
                class="px-4 py-0"
              />
              <v-text-field
                v-model="prospect.phone_number"
                placeholder="Enter phone number"
                clearable
                outlined
                type="number"
                class="px-4 py-0 d-flex align-center"
              >
                <template #prepend-inner>
                  <span slot="prepend">
                    +254
                  </span>
                </template>
              </v-text-field>
              <div class="mx-4 px-4">
                <v-btn
                  class="green white--text"
                  small
                  block
                  :loading="is_recording_prospect"
                  :disabled="!canSubmitProspectData"
                  @click="prepToRecordProspect"
                >
                  Submit
                </v-btn>
              </div>
            </section>
          </v-row>
        </div>
      </section>
      <section v-else class="mt-4 pt-4">
        <loading-widget :message="`Fetching property`" />
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  head () {
    if (process.browser) {
      return { title: this.getCurrentProperty.name }
    }
  },

  computed: {
    ...mapGetters(['getCurrentProperty', 'getProspectRecord']),

    image_source () {
      const baseUrl = 'https://landlords.rentershub.co.ke/'

      if (!this.getCurrentProperty) {
        return
      }

      if (!this.getCurrentProperty.property_images[0]) {
        return
      }

      return baseUrl + this.getCurrentProperty.property_images[this.image_in_view].url
    },

    description () {
      if (!this.getCurrentProperty) {
        return
      }

      const descriptionArray = this.getCurrentProperty.description.split(' ')
      const newDescriptionArray = []
      const disposedDescriptionArray = []

      descriptionArray.forEach((description) => {
        if ((description.charAt(0) === 0 && description.charAt(1) === 7) || (description.charAt(0) === 0 && description.charAt(1) === 1)) {
          disposedDescriptionArray.push(description)
        } else if (description.length > 4) {
          if (description.charAt(0) === '+' && description.charAt(1) === 2 && description.charAt(2) === 5 && description.charAt(3) === 4) {
            disposedDescriptionArray.push(description)
          } else {
            newDescriptionArray.push(description)
          }
        } else {
          newDescriptionArray.push(description)
        }
      })

      const newDescriptionString = newDescriptionArray.join(' ')
      return newDescriptionString.replace(/(?:\r\n|\r|\n)/g, '<br>')
    },

    canSubmitProspectData () {
      if (!this.prospect.name || !this.prospect.phone_number) {
        return false
      }

      if ((this.prospect.phone_number.charAt(0) === '1' || this.prospect.phone_number.charAt(0) === '7') && this.prospect.phone_number.length === 9 && this.prospect.name) {
        return true
      }

      return false
    }
  },

  data: () => ({
    show_contact_form: false,
    image_in_view: 0,
    show_contact: false,
    prospect: {},
    prospect_recorded: false,
    propertyIsAvailable: false,
    is_recording_prospect: false
  }),

  methods: {
    ...mapActions(['fetchProperty', 'recordProspect', 'recordClick']),

    perpToRecordClick (channel) {
      const data = {
        prospect_id: this.getProspectRecord.id,
        company_id: this.getCurrentProperty.company_id,
        propertyId: this.getCurrentProperty.id,
        channel
      }

      this.recordClick(data)

      let url = null

      if (channel === 'Primary Phone') {
        url = 'tel:' + this.getCurrentProperty.contact.primary_phone_number
      }

      if (channel === 'Secondary Phone') {
        url = 'tel:' + this.getCurrentProperty.contact.secondary_phone_number
      }

      if (channel === 'Primary WhatsApp') {
        url = 'https://wa.me/254' +
                this.getCurrentProperty.contact.primary_phone_number +
                '?text=I\'m%20interested%20in%20your%20property%20found%20on:%20https://rentershub.co.ke/property/' +
                this.getCurrentProperty.id
      }

      if (channel === 'Secondary WhatsApp') {
        url = 'https://wa.me/254' +
                this.getCurrentProperty.contact.secondary_phone_number +
                '?text=I\'m%20interested%20in%20your%20property%20found%20on:%20https://rentershub.co.ke/property/' +
                this.getCurrentProperty.id
      }

      if (channel === 'Email') {
        url = 'mailto:' + this.getCurrentProperty.contact.email
      }

      window.open(url)
    },

    prepToRecordProspect () {
      this.is_recording_prospect = true
      this.recordProspect(this.prospect).then(() => {
        this.is_recording_prospect = false
        this.prospect_recorded = true
      })
    },

    toogleContactForm () {
      if (this.getProspectRecord) {
        if (this.getProspectRecord.id) {
          this.prospect.name = this.getProspectRecord.name
          this.prospect.phone_number = this.getProspectRecord.phone_number
          this.prospect_recorded = true
          this.show_contact_form = true
          return
        }
      }
      this.show_contact_form = true
    },

    showImage (imageIndex) {
      this.image_in_view = imageIndex
    },

    goToTop () {
      this.$vuetify.goTo('#top_div', {
        duration: 1500,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    },

    gofetchProperty () {
      // check whether current property is similar to the id

      const propertyId = this.$router.history.current.params
      if (this.getCurrentProperty) {
        if (this.getCurrentProperty.id === propertyId) {
          this.propertyIsAvailable = true
          this.goToTop()
          return
        }
      }

      // check whether that property is in the properties array
      if (this.getDisplayProperties) {
        const propertyIsAvailable = this.getDisplayProperties.properties.data.filter(property => (
          propertyId === property.id
        ))

        if (propertyIsAvailable[0]) {
          this.setCurrentProperty(propertyIsAvailable[0])
          this.propertyIsAvailable = true
          this.goToTop()
          return
        }
      }

      const data = {
        propertyId
      }

      this.fetchProperty(data).then(() => {
        this.propertyIsAvailable = true
        this.goToTop()
      })
    }
  },

  created () {
    this.gofetchProperty()
    // check whether that property is in the properties array
    // if not, fetch
  }
}
</script>
<style lang="css" scoped>
    @media only screen and (max-width: 960px) {
        .contact{
            top: 50%;
            left: 5%;
            right: 5%;
            height: 25rem;
            transform: translate(0, -12.5rem)
        }
    }
    @media only screen and (min-width: 961px) {
        .contact{
            position: fixed;
            top: 50%;
            height: 25rem;
            left: 50%;
            padding: 0 0.5rem;
            transform: translate(-12.5rem, -12.5rem)
        }
    }
    .contact{
        position: fixed;
        top: 50%;
        min-height: 25rem;
    }

    .inner-row{
        position: relative;
        padding-top: 2.5rem;
    }
    .close-button{
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border-radius: 50%;
    }
    .image-preview {
        border: solid 2px blue;
    }
    .full-width{
        width: 100%;
    }
    .wrapper{
        overflow-x: hidden;
    }
    .image-preview-strip{
        overflow-x: auto;
    }
</style>