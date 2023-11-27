<template>
  <div>
    <div class="px-4 pt-4 wrapper">
      <div id="top_div" />
      <section v-if="propertyIsAvailable">
        <!-- {{ getCurrentProperty }} -->
        <v-row class="pa-4">
          <v-col class="col-md-8 col-12">
            <v-row class="d-flex justify-center mb-2 mt-1">
              <h3 class="text-center">
                {{ getCurrentProperty.name }}
              </h3>
            </v-row>
            <div class="grey lighten-4 text-center" style="max-height: 20rem; position: relative;">
              <img
                v-for="(image, index) in getCurrentProperty.property_images"
                :key="index"
                :src="getImageSource(image.url)"
                alt="Property Image"
                :class="{
                  'd-none': index != image_in_view
                }"
                style="max-height: 20rem;"
              >
              </img>
              <v-icon class="rounded blue lighten-4" style="position: absolute; top: 50%; left: 0.25rem;" @click="reduceImageIndex()">
                mdi-arrow-left
              </v-icon>
              <v-icon class="rounded blue lighten-4" style="position: absolute; top: 50%; right: 0.25rem;" @click="addImageIndex()">
                mdi-arrow-right
              </v-icon>
            </div>
            <div class="d-flex justify-center mt-1 image-preview-strip">
              <div v-for="(image, index) in getCurrentProperty.property_images" :key="image.id" class="d-flex col-md-1 col-2 " @click="showImage(index)">
                <v-img
                  :src="getImageSource(image.url)"
                  cover
                  :class="{
                    'image-preview': image_in_view == index
                  }"
                />
              </div>
            </div>
          </v-col>
          <v-col class="col-md-4 col-12">
            <h4 class="mt-4">
              Managed By:
            </h4>
            <span>{{ getCurrentProperty.company_name }}</span> <br> <br>

            <h4>
              Amount:
            </h4>
            <span>{{ getCurrentProperty.price + " / " + getCurrentProperty.payment }}</span> <br> <br>

            <v-btn class="red white--text contact-button" @click="toogleContactForm">
              Contact Landlord
            </v-btn> <br>

            <h4>Description:</h4>
            <span v-html="description" />
            <!-- <h4>Featureswertyuiytrewertyu:</h4> -->
          </v-col>
          <!-- <v-col v-if="getCurrentProperty.features[0]" class="col-12">
            <h3 class="text-center mt-4">
              Features:
            </h3>
            <p
              v-for="(feature, index) in getCurrentProperty.features"
              :key="index"
              class="blue lighten-4 rounded pa-4"
              :class="{
                'd-none': !feature.name
              }"
              style=" font-size: 1.25rem; font-weight: 600;"
            >
              {{ feature.name }}
            </p>
          </v-col> -->
        </v-row>
        <div v-if="show_contact_form" class="contact grey lighten-2 rounded">
          <v-row class="no-gutters inner-row">
            <v-icon class="close-button red white--text" @click="show_contact_form = false">
              mdi-close
            </v-icon>
            <section v-if="prospect_recorded">
              <v-col class="col-12 text-center">
                {{ "Hello " + prospect.name + "," }} <br>
                You can contact the landlord through the following contact:
              </v-col>
              <v-col class="col-12 mt-4">
                <div class="text-center">
                  {{ getCurrentProperty.contact }}
                </div>
                <v-row class="text-center no-gutters">
                  <v-col class="col-6 text-end">
                    <v-btn
                      text
                      color="orange-lighten-2"
                      variant="text"
                      @click="perpToRecordClick('Phone')"
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
                      @click="perpToRecordClick('WhatsApp')"
                    >
                      <v-icon large class="green--text">
                        mdi-whatsapp
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col class="col-12 d-flex text-center">
                <v-icon class="red--text">
                  mdi-alert
                </v-icon>
                Do NOT send any money before viewing the property first.
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
      return { title: this.getCurrentProperty ? this.getCurrentProperty.name : 'View Property' }
    }
  },

  computed: {
    ...mapGetters(['getCurrentProperty', 'getProspectRecord']),

    image_source () {
      const baseUrl = 'https://landlords.rentershub.co.ke/propertyimages/'

      if (!this.getCurrentProperty) {
        return
      }

      if (!this.getCurrentProperty.property_images[0]) {
        return
      }

      const imageUrl = this.getCurrentProperty.property_images[this.image_in_view].url

      const imageUrlsArray = imageUrl.split('/')

      if (imageUrlsArray.length === 2) {
        return baseUrl + imageUrlsArray[1]
      }

      return baseUrl + imageUrlsArray[0]
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
    ...mapActions(['fetchProperty', 'recordProspect', 'recordClick', 'setCurrentProperty', 'fetchPropertyFeatures']),

    reduceImageIndex () {
      if (this.image_in_view > 0) {
        this.image_in_view = this.image_in_view - 1
      } else {
        this.image_in_view = this.getCurrentProperty.property_images.length - 1
      }
    },

    addImageIndex () {
      if (this.image_in_view === (this.getCurrentProperty.property_images.length - 1)) {
        this.image_in_view = 0
      } else {
        this.image_in_view = this.image_in_view + 1
      }
    },

    perpToRecordClick (channel) {
      const data = {
        prospectId: this.getProspectRecord.id,
        propertyId: this.getCurrentProperty.id,
        channel
      }

      this.recordClick(data)

      let url = null

      if (channel === 'Phone') {
        url = 'tel:+254' + this.getCurrentProperty.contact
      }

      if (channel === 'WhatsApp') {
        url = 'https://wa.me/+254' +
                this.getCurrentProperty.contact +
                '?text=I\'m%20interested%20in%20your%20property%20found%20on:%20https://rentershub.co.ke/property/' +
                this.getCurrentProperty.id
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

    getImageSource (imageUrl) {
      const baseUrl = 'https://landlords.rentershub.co.ke/propertyimages/'

      const imageUrlsArray = imageUrl.split('/')

      if (imageUrlsArray.length === 2) {
        return baseUrl + imageUrlsArray[1]
      }

      return baseUrl + imageUrlsArray[0]
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
          if (this.getCurrentProperty.features) {
            const timeout = setTimeout(() => {
              this.propertyIsAvailable = true
              this.goToTop()
              clearTimeout(timeout)
            }, 10)
            return
          }
        }
      }

      // check whether that property is in the properties array
      if (this.getDisplayProperties) {
        const propertyIsAvailable = this.getDisplayProperties.properties.data.filter(property => (
          propertyId === property.id
        ))

        if (propertyIsAvailable[0]) {
          this.setCurrentProperty(propertyIsAvailable[0]).then(() => {
            // fetch features
            if (!this.getCurrentProperty.features) {
              const data = {
                propertyId
              }
              this.fetchPropertyFeatures(data).then(() => {
                const timeout = setTimeout(() => {
                  this.propertyIsAvailable = true
                  this.goToTop()
                  clearTimeout(timeout)
                }, 10)
              })
            }
          })
          return
        }
      }

      const data = {
        propertyId
      }

      this.fetchProperty(data).then(() => {
        const timeout = setTimeout(() => {
          this.propertyIsAvailable = true
          this.goToTop()
          clearTimeout(timeout)
        }, 10)
      })
    }
  },

  mounted () {
    // if (process.browser) {
    const timeout = setTimeout(() => {
      this.gofetchProperty()
      clearTimeout(timeout)
    }, 0)
    // }
  }
}
</script>
<style lang="css" scoped>
    @media only screen and (max-width: 960px) {
        .contact-button{
          position: fixed;
          z-index: 9999;
          height: 2rem;
          bottom: 0.5rem;
          left: 0.5rem;
          right: 0.5rem;
        }
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
        .contact-button{
          position: fixed;
          z-index: 9999;
          height: 2rem;
          bottom: 0.5rem;
          left: 65%;
          right: 0.5rem;
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
        padding-bottom: 3rem;
    }
    .image-preview-strip{
        overflow-x: auto;
    }
</style>
