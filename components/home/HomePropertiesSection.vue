<template>
  <div class="pb-4 wrapper">
    <div class="mb-4 pb-4 grey lighten-3" flat>
      <v-row class="no-gutters d-flex align-center">
        <v-col
          v-if="($vuetify.breakpoint.xl || $vuetify.breakpoint.lg || $vuetify.breakpoint.md)"
          class="col-2 justify-end align-end d-flex"
        >
          <nav>
            <ul>
              <li>
                <span class="dropdown main-color-2 pa-4">
                  {{ "Order: " }}
                  <span class="white pointer" @click="showOrder = !showOrder">
                    {{ selectedOrder }}
                    <v-icon small class="black--text ml-4 pl-4">
                      mdi-arrow-down
                    </v-icon>
                  </span>
                </span>
                <ul
                  class="forward-z-index"
                  :class="{
                    'show-categories': showOrder
                  }"
                >
                  <li
                    v-for="(order_by, index) in order"
                    :key="index"
                    class="pointer"
                    @click="changeOrder(order_by)"
                  >
                    <a>
                      {{ order_by }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </v-col>

        <v-col class="col-md-8 col-12 my-2">
          <div>
            <div v-if="filterData" class="text-center d-flex justify-center" style="overflow-x: auto; width: 100%;">
              <span v-for="(filter, index) in filterData" :key="index" class="d-flex">
                <div
                  v-if="index != 'pagination' && index != 'order' && filter != null && index != 'keywords' && index != 'includeAllKeyWords' && index != 'link'"
                  class="filter-span main-color-2 mx-1 lighten-2 pointer"
                >
                  {{ (index +": " + filter) | toSentenseCase }}
                  <v-icon small class="red--text pointer close" @click="removeFilter(index)">
                    mdi-close
                  </v-icon>
                </div>
              </span>
            </div>
            <div
              v-if="keywords"
              class="align-center my-1 d-flex justify-center"
              style="overflow-x: auto; width: 100%;"
              :class="{
                'my-4': !($vuetify.breakpoint.xl || $vuetify.breakpoint.lg || $vuetify.breakpoint.md)
              }"
            >
              <span v-for="(keyword, index) in keywords" :key="index" class="d-flex">
                <span class="filter-span main-color-2 mx-1 lighten-2">
                  {{ keyword }}
                  <v-icon small class="red--text pointer close" @click="removeKeyword(index)">
                    mdi-close
                  </v-icon>
                </span>
              </span>
            </div>
          </div>
        </v-col>
        <v-col
          v-if="!($vuetify.breakpoint.xl || $vuetify.breakpoint.lg || $vuetify.breakpoint.md)"
          class="col-7 justify-start align-end d-flex"
          :class="{
            'my-4': !($vuetify.breakpoint.xl || $vuetify.breakpoint.lg || $vuetify.breakpoint.md)
          }"
        >
          <nav>
            <ul>
              <li>
                <span class="dropdown main-color-2 pa-4">
                  {{ "Order: " }}
                  <span class="white pointer" @click="showOrder = !showOrder">
                    {{ selectedOrder }}
                    <v-icon small>
                      mdi-arrow-down
                    </v-icon>
                  </span>
                </span>
                <ul
                  class="forward-z-index"
                  :class="{
                    'show-categories': showOrder
                  }"
                >
                  <li
                    v-for="(order_by, index) in order"
                    :key="index"
                    class="pointer"
                    @click="changeOrder(order_by)"
                  >
                    <a>
                      {{ order_by }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </v-col>
        <v-col
          class="col-md-2 col-5 justify-end align-end d-flex"
          :class="{
            'my-4': !($vuetify.breakpoint.xl || $vuetify.breakpoint.lg || $vuetify.breakpoint.md)
          }"
        >
          <nav>
            <ul>
              <li>
                <span class="dropdown main-color-2 mx-1 d-flex align-end lighten-2 pa-4">
                  {{ "Showing: " }}

                  <span class="white pointer" @click="showPagination = !showPagination">
                    <span v-if="filterData">
                      {{ filterData.pagination }}
                    </span>
                    <v-icon small>
                      mdi-arrow-down
                    </v-icon>
                  </span>
                </span>

                <ul
                  class="forward-z-index"
                  :class="{
                    'show-categories': showPagination
                  }"
                >
                  <li
                    v-for="(pagination_value, index) in paginationValues"
                    :key="index"
                    class="pointer"
                    @click="changePagination(pagination_value)"
                  >
                    <a>
                      {{ pagination_value }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </v-col>
      </v-row>
    </div>

    <div v-if="!is_fecthing_properties">
      <h2 class="pl-4 ml-4">
        {{ 'Available Properties' }}
      </h2>
      <h3 v-if="properties.properties" class="pl-4 ml-4 mb-4">
        {{ "Page " + properties.properties.current_page + "(" }}
        {{ properties.properties.data.length }}
        {{ " out of " }}
        {{ properties.properties.total + " properties )" }}
      </h3>
      <v-row
        v-if="properties.properties"
        class="back"
      >
        <v-row v-if="properties" class="col-md-10 offset-md-1">
          <v-col
            v-if="properties.properties.data.length < 1"
            class="col-12 d-flex justify-center"
          >
            <empty-component :message="`Landlords and Property Agents are yet to post such a house in that area. Please contact Renters Hub office for a further assistance.`" />
          </v-col>
          <v-col
            v-for="property in properties.properties.data"
            v-else
            :key="property.id"
            class="col-md-3 col-12"
          >
            <property-card :property="property" />
          </v-col>
        </v-row>
      </v-row>

      <div v-if="pagination_links" class="mt-4" style="overflow-x: auto; ">
        <div
          class="d-flex"
          :class="{
            'justify-center': ($vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl)
          }"
        >
          <span
            v-for="(link, index) in pagination_links"
            :key="index"
            class="pagination-link white--text  text-center"
            :class="{
              'main-color-2 lighten-1 pointer': (index != getDisplayProperties.properties.current_page),
              'grey lighten-1': (link.active || (getDisplayProperties.properties.current_page == 1 && link.previous) || (link.label == '...'))
            }"
            @click="(index == getDisplayProperties.properties.current_page || link.label == '...') ? null :goToPage(link.url)"
          >
            <span>
              <span v-if="link.previous">
                {{ "<<" }}
              </span>
              <span v-if="!link.previous && !link.next">
                {{ link.label }}
              </span>
              <span v-if="(link.next)">
                {{ ">>" }}
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <loading-widget :message="`Feching Properties`" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import PropertyCard from '../properties/PropertyCard'
import LoadingWidget from '../LoadingWidget'
// import EmptyComponent from '../EmptyComponent'

export default {
  name: 'PropertiesSection',

  components: {
    PropertyCard,
    LoadingWidget
    // EmptyComponent
  },

  filters: {
    toSentenseCase (string) {
      if (!string[0]) {
        return
      }
      return string[0].toUpperCase() + string.slice(1)
    }
  },

  props: [
    'title'
  ],

  watch: {
    filters: function () {
      this.filterData = this.filters
    },

    pageUrl: function () {
      this.filterData.link = this.pageUrl
      this.prepForSearch()
    }
  },

  computed: {
    ...mapGetters(['getDisplayProperties', 'getFilters', 'isFetchingProperties', 'getSearchType']),

    filters () {
      if (!this.$store.getters.getFilters) {
        const data = {
          order: 'Random',
          pagination: 10
        }

        return data
      }

      return this.$store.getters.getFilters
    },

    properties () {
      if (!this.$store.getters.getDisplayProperties) {
        const data = {
          order: 'Random',
          pagination: 10
        }

        return data
      }

      return this.$store.getters.getDisplayProperties
    },

    is_fecthing_properties () {
      if (!this.isFetchingProperties) {
        return false
      }

      return this.isFetchingProperties
    },

    keywords () {
      if (!this.filterData) {
        return []
      }
      if (!this.filterData.keywords) {
        return
      }

      return this.filterData.keywords.split(',')
    },

    pagination_links () {
      if (!this.getDisplayProperties) {
        return
      }
      if (!this.getDisplayProperties.properties) {
        return
      }
      const links = []
      this.getDisplayProperties.properties.links.forEach((link) => {
        link.previous = link.label === '&laquo; Previous'
        link.next = link.label === 'Next &raquo;'
        links.push(link)
      })
      return links
    }
  },

  data: () => ({
    order: [
      'Random',
      'Oldest',
      'Newest',
      'Cheapest',
      'Expensive'
    ],
    selectedOrder: 'Newest',
    showOrder: false,
    showPagination: false,
    paginationValues: [5, 10, 25, 50, 75, 100],
    selectedPagination: 10,
    filterData: null,
    includeAllKeyWords: null,
    pageUrl: null
  }),

  methods: {
    ...mapActions(['fetchFilteredProperties', 'fetchSimpleFilteredProperties']),

    goToPage (url) {
      this.pageUrl = url
    },

    changeOrder (order) {
      this.pageUrl = null
      this.showOrder = false
      this.showPagination = false
      this.selectedOrder = order
      const filterData = {
        ...this.filterData,
        order
      }
      this.filterData = filterData
      this.prepForSearch()
    },

    changePagination (pagination) {
      this.pageUrl = null
      this.showOrder = false
      this.showPagination = false
      this.selectedPagination = pagination
      const filterData = {
        ...this.filterData,
        pagination
      }
      this.filterData = filterData
      this.prepForSearch()
    },

    removeFilter (index) {
      this.pageUrl = null
      this.showOrder = false
      this.showPagination = false

      const oldData = this.filterData
      delete oldData[index]
      this.filterData = oldData
      this.prepForSearch()
    },

    removeKeyword (index) {
      this.pageUrl = null
      this.showOrder = false
      this.showPagination = false

      const oldKeywords = this.filterData.keywords
      const oldKeywordsArray = oldKeywords.split(',')
      oldKeywordsArray.splice(index, 1)
      const keywords = oldKeywordsArray.join()

      const data = {
        ...this.filterData,
        keywords
      }

      this.filterData = data

      this.prepForSearch()
    },

    prepForSearch () {
      this.goToTop()

      const data = this.filterData
      if (this.pageUrl) {
        data.link = this.pageUrl
      }

      setTimeout(() => {
        if (this.getSearchType === 'advanced') {
          this.fetchFilteredProperties(data).then(() => {
            this.goToTop()
          })
        } else {
          this.fetchSimpleFilteredProperties(data).then(() => {
            this.goToTop()
          })
        }
      }, 0)
    },

    goToTop () {
      this.$vuetify.goTo('#top_div', {
        duration: 1500,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    },

    boot () {
      this.filterData = this.filters
      this.prepForSearch()
    }

  },

  mounted () {
    this.boot()
  }

}
</script>
<style lang="css" scoped>
.pagination-link{
  padding: 0 0.5rem;
  margin: 0 0.1rem;
}
.filter-span{
  padding: 0.25rem 1.5rem;
  color: white;
  border-radius: 0.5rem;
  position: relative;
}

.close{
  position: absolute;
  right: 0.25rem;
  top: 50%;
  height: 1rem;
  transform: translate(0, -0.5rem)
}

nav ul {
  -webkit-font-smoothing: antialiased;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
nav li {
  float: left;
  margin: 0;
  padding: 0;
  position: relative;
}
nav a {
  color: #444;
  display: block;
  font: normal 13px/50px Arial, Helvetica, sans-serif;
  padding: 0 25px;
  text-align: center;
  text-decoration: none;
  -webkit-transition: all .25s ease;
  -moz-transition: all .25s ease;
  -ms-transition: all .25s ease;
  -o-transition: all .25s ease;
  transition: all .25s ease;
}
nav .dropdown {
  /* background:url('../images/arrow.jpg') no-repeat right center; */
}
nav li:hover a {
}
nav li ul {
  float: left;
  left: 0;
  width:100%;
  opacity: 0;
  position: absolute;
  top: -50px;
  visibility: hidden;
  z-index: 999;
  -webkit-transition: all .25s ease;
  -moz-transition: all .25s ease;
  -ms-transition: all .25s ease;
  -o-transition: all .25s ease;
  transition: all .25s ease;
}
.show-categories {
  color:#FFF;
  background: #A6CE37;
  opacity: 1;
  top: 0;
  visibility: visible;
  z-index: 999;
  position: relative;
}
nav li ul li {
  float: none;
  width: 100%;
}
nav li ul a:hover {
  background: #bbb;
}
/* Clearfix */
.cf:after, .cf:before {
  content: "";
  display: table;
}
.cf:after {
  clear: both;
}

.forward-z-index{
    z-index: 9999;
    position: absolute;
}

.back{
    position: relative;
    z-index: 1;
}

.wrapper{
    overflow-x: hidden;
}

</style>
