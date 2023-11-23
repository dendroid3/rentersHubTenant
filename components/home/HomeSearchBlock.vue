<template>
  <div class="grey lighten-3 py-4">
    <div id="top_div" />
    <v-row class="no-gutters text--center align-center d-flex justify-center">
      <h1 class="text-center mb-4">
        The place where smart Kenyans come to find houses.
      </h1>
    </v-row>
    <v-row class="no-gutters text--center align-center d-flex justify-center">
      <input v-model="simpleSearchKeywords" class="search-input" placeholder="Search, eg Bedsitter in Kasarani">
      <button class="search-button white--text d-flex justify-center align-center" @click="simpleSearchSubmit">
        <span v-if="!isSimpleSeaching">
          Search
        </span>
        <v-progress-circular
          v-else
          :size="20"
          :width="1"
          color="white"
          indeterminate
        />
      </button>
    </v-row>
    <v-row class="no-gutters text--center align-center d-flex justify-center mt-4">
      <v-btn
        small
        class="ml-4 white--text"
        :color="`#A6CE37`"
        :class="{
          'main-color-2': !isSearchBlockOpen,
          'red': isSearchBlockOpen,
        }"
        @click="isSearchBlockOpen = !isSearchBlockOpen"
      >
        {{ isSearchBlockOpen ? 'close' : 'Advanced Search' }}
      </v-btn>
    </v-row>
    <section
      v-show="isSearchBlockOpen"
      id="search-block"
      class="grey lighten-2"
    >
      <v-row class="no-gutters inner-row mb-4">
        <v-icon
          class="close-button red white--text"
          @click="isSearchBlockOpen = false"
        >
          mdi-close
        </v-icon>
        <v-col class="col-12 d-flex justify-center mb-4">
          <h3>
            Refine Your Search
          </h3>
        </v-col>
        <v-col class="col-3 " />
        <v-col class="col-md-2 col-12 d-flex justify-center">
          <v-btn
            small
            :color="(categorySelection === 'Residential') ? '#A6CE37' : 'grey'"
            :class="{
              'white--text': categorySelection === 'Residential'
            }"
            @click="setTypeSelection('Residential')"
          >
            Residential
          </v-btn>
        </v-col>
        <v-col class="col-md-2 col-12 mt-1 d-flex justify-center">
          <v-btn
            small
            :color="(categorySelection === 'Commercial') ? '#A6CE37' : 'grey'"
            :class="{
              'white--text': categorySelection === 'Commercial'
            }"
            @click="setTypeSelection('Commercial')"
          >
            Commercial
          </v-btn>
        </v-col>
        <v-col class="col-md-2 col-12 mt-1 d-flex justify-center">
          <v-btn
            small
            :color="(categorySelection === 'Furnished') ? '#A6CE37' : 'grey'"
            :class="{
              'white--text': categorySelection === 'Furnished'
            }"
            @click="setTypeSelection('Furnished')"
          >
            Furnished
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="pa-0 no-gutters ma-0">
        <v-col class="pa-0 col-2" />
        <v-col
          class="pa-0 col-md-8 col-12 ma-0"
          :class="{
            'd-flex no-gutters': ($vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl)
          }"
        >
          <v-col class="pa-0 col-sm-6 col-12">
            <v-autocomplete
              id="neighbourhood_input"
              v-model="filters.neighbourhood"
              :disabled="!categorySelection"
              clearable
              :loading="isTypingNeighbourhood || isFetchingNeighbourhood"
              placeholder="neighbourhood"
              outlined
              class="px-4 py-0"
              :items="neighbourhoods"
              @keyup="setIsTypingNeighbourhood"
            />
          </v-col>
          <v-col class="pa-0 col-sm-6 col-12">
            <v-select
              v-model="filters.type"
              placeholder="property type"
              outlined
              :disabled="!categorySelection"
              clearable
              class="px-4 py-0"
              :items="house_types"
            />
          </v-col>
        </v-col>
        <v-col class="pa-0 col-2" />
      </v-row>
      <v-row class="no-gutters pa-0 ma-0">
        <v-col class="pa-0 col-2" />
        <v-col
          class="pa-0 col-md-8 col-12 ma-0"
          :class="{
            'd-flex no-gutters': ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)
          }"
        >
          <v-col class="pa-0 col-sm-6 col-12">
            <v-text-field
              v-model="filters.max"
              placeholder="maximum rent"
              clearable
              :disabled="!categorySelection"
              outlined
              type="number"
              class="px-4 py-0"
            />
          </v-col>
          <v-col class="pa-0 col-sm-6 col-12">
            <v-select
              v-model="filters.payment"
              placeholder="payment frequency"
              outlined
              :disabled="!categorySelection"
              clearable
              class="px-4 py-0"
              :items="['Month', 'Year', 'Day']"
            />
          </v-col>
        </v-col>
        <v-col class="col-2" />
      </v-row>
      <v-row class="no-gutters ma-0">
        <v-col class="col-2" />
        <v-col class="col-md-8 col-12 ma-0">
          <v-text-field
            v-model="filters.keywords"
            :disabled="!categorySelection"
            placeholder="enter key words"
            :hint="`Separate the keywords with a comma.`"
            clearable
            outlined
            class="px-4 py-0"
          />
        </v-col>
      </v-row>

      <v-row class="no-gutters ma-0 pa-0">
        <v-col class="col-2 pa-0" />
        <v-col class="col-md-8 col-12 ma-0 pa-0">
          <v-checkbox
            v-model="filters.include_all_key_words"
            :disabled="!filters.keywords"
            label="Results must include all keywords"
            class="px-4 py-0"
          />
        </v-col>
      </v-row>

      <v-row class="no-gutters ma-0 pa-0">
        <v-col class="col-2 pa-0" />
        <v-col class="col-8 ma-0 pa-0">
          <v-btn
            class="green white--text"
            block
            :disabled="!canSubmit"
            :loading="isSubmittingData"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HomeSearchBlock',

  data () {
    return {
      categorySelection: null,
      isSearchBlockOpen: false,
      filters: {},
      simpleSearchKeywords: null,
      isSimpleSeaching: false,
      isTypingNeighbourhood: false,
      neighbourhood: null,
      isFetchingNeighbourhood: false,
      isSubmittingData: false
    }
  },

  computed: {
    ...mapGetters(['getFilters', 'getLocations']),

    canSubmit () {
      if (!this.categorySelection && (!this.filters.county || !this.filters.type || !this.filters.min || !this.filters.max || !this.filters.keywords)) {
        return false
      }
      return true
    },

    neighbourhoods () {
      if (!this.getLocations) {
        return ['Type in a location']
      }

      if (!this.getLocations[0]) {
        return
      }

      const neighbourhoods = []

      this.getLocations.forEach((neighbourhood) => {
        neighbourhoods.push(neighbourhood.name)
      })

      return neighbourhoods
    },

    house_types () {
      const types = {
        commercial: [
          'Shops', 'Hotels', 'Offices', 'Schools', 'Outlets', 'Butchery', 'Container', 'Studios', 'Stalls', 'Shelves', 'Outdoor-Space', 'Picnic/Hiking-sites', 'Warehouses'
        ],

        residential: [
          'Singles', 'Double', 'Bedsitters', 'One Bedrooms', 'Two Bedrooms', 'Three Bedrooms', 'Apartments', 'Four Bedrooms', 'Five Bedrooms', 'Guest Houses', 'Day Care', 'Studio'
        ]
      }

      if (this.categorySelection === 'Commercial') {
        return types.commercial
      }

      return types.residential
    }
  },

  methods: {
    ...mapActions(['fetchFilteredProperties', 'fetchSimpleFilteredProperties']),

    setTypeSelection (selection) {
      this.categorySelection = selection
    },

    submit () {
      const data = {}

      if (this.categorySelection) {
        data.category = this.categorySelection
      }
      if (this.filters.county) {
        data.county = this.filters.county
      }
      if (this.filters.neighbourhood) {
        data.neighbourhood = this.filters.neighbourhood
      }
      if (this.filters.type) {
        data.type = this.filters.type
      }
      if (this.filters.min) {
        data.min = this.filters.min
      }
      if (this.filters.max) {
        data.max = this.filters.max
      }
      if (this.filters.payment) {
        data.payment = this.filters.payment
      }
      if (this.filters.keywords) {
        data.keywords = this.filters.keywords
      }
      if (this.filters.include_all_key_words) {
        data.include_all_key_words = this.filters.include_all_key_words
      }

      this.$store.getters.getFilters.order ? data.order = this.$store.getters.getFilters.order : data.order = 'Random'
      this.$store.getters.getFilters.pagination ? data.pagination = this.$store.getters.getFilters.pagination : data.pagination = 10

      this.isSubmittingData = true
      this.fetchFilteredProperties(data).then(() => {
        this.isSubmittingData = false
        this.isSearchBlockOpen = false
      })
    },

    simpleSearchSubmit () {
      if (!this.simpleSearchKeywords) {
        alert('Enter a key word to search.')
        return
      }
      this.isSimpleSeaching = true

      const data = {
        keywords: this.simpleSearchKeywords
      }

      this.$store.getters.getFilters ? (this.$store.getters.getFilters.order ? data.order = this.$store.getters.getFilters.order : data.order = 'Random') : data.order = 'Random'
      this.$store.getters.getFilters ? (this.$store.getters.getFilters.pagination ? data.pagination = this.$store.getters.getFilters.pagination : data.pagination = 10) : data.pagination = 10

      // this.$store.dispatch('fetchSimpleFilteredProperties', data, { root: true })

      this.fetchSimpleFilteredProperties(data).then(() => {
        this.isSimpleSeaching = false
      })
    },

    setIsTypingNeighbourhood () {
      this.isTypingNeighbourhood = true

      const timeout = setTimeout(() => {
        this.isTypingNeighbourhood = false
        clearTimeout(timeout)
      }, 1000)
    }
  }
}
</script>
<style lang="css" scoped>
 @media only screen and (max-width: 960px) {
    #search-block{
        left: 0.25rem;
        right: 0.25rem;
    }
 }
 @media only screen and (min-width: 961px) {
    #search-block{
        left: 5rem;
        right: 5rem;
    }
 }
    #search-block{
        position: fixed;
        top: 2rem;
        bottom: 2rem;
        overflow-y: auto;
        z-index: 990;
        padding: 2rem;
        border-radius: 0.5rem;
    }

    .inner-row{
        position: relative;
    }
    .close-button{
        position: absolute;
        top: -1.5rem;
        right: -1.5rem;
        border-radius: 50%;
    }
    .search-input{
        border-left: solid #E0E0E0 1px;
        border-top: solid #E0E0E0 1px;
        border-bottom: solid #E0E0E0 1px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: white;
        padding: 0 1.5rem;
        line-height: 2.5rem;
        width: 50vw;
        height: 2.5rem;
    }

    .search-input:focus{
        border-left: solid #E0E0E0 1px;
        border-top: solid #E0E0E0 1px;
        border-bottom: solid #E0E0E0 1px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: white;
        padding: 0 1.5rem;
        line-height: 2.5rem;
    }

    .search-button{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: #A6CE37;
        padding: 0 1.5rem;
        border-right: solid #E0E0E0 1px;
        border-top: solid #E0E0E0 1px;
        border-bottom: solid #E0E0E0 1px;
        line-height: 2.5rem;
        font-weight: 800;
        width: 6rem;
        height: 2.5rem;
    }
    .container-fluid {
        padding-bottom: 10px;
    }
    .list-group {
        margin-top: 10px;
        margin-left: 15px;
        margin-right: 15px;
    }

    .main-color-2{
      background: #A6CE37;
    }
</style>
