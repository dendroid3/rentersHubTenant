<template>
  <div>
    <section id="heading" class="mx-4 my-2">
      <h2>Clicks</h2>
      <admin-revenue-belt v-show="!($vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg)" />
      <v-row class="no-gudtters d-flex align-center">
        <v-col class="col-3">
          <input v-model="searchData.landlord_primary_phone_number" class="px-2 col-12 mx-2" placeholder="Landlord Phone">
        </v-col>
        <v-col class="col-3">
          <input v-model="searchData.prospect_phone_number" class="px-2 col-12 mx-2" placeholder="Prospect Phone">
        </v-col>
        <v-col class="col-3">
          <input v-model="searchData.property_id" class="px-2 col-12 mx-2" placeholder="Property ID">
        </v-col>
        <v-col class="col-3 d-flex justify-space-between align-center">
          <v-menu
            transition="slide-y-transition"
            bottom
            open-on-hover
          >
            <template #activator="{ on, attrs }">
              <span
                class="pointer"
                v-bind="attrs"
                v-on="on"
              >
                {{ searchData.status ? searchData.status : 'Status' }}
              </span>
            </template>
            <v-list>
              <v-list-item
                class="pointer"
                @click="searchData.status = `Unresolved`"
              >
                {{ 'Unresolved' }}
              </v-list-item>
              <v-list-item
                class="pointer"
                @click="searchData.status = `Rejected`"
              >
                {{ 'Rejected' }}
              </v-list-item>
              <v-list-item
                class="pointer"
                @click="searchData.status = `Moved (Paid)`"
              >
                {{ 'Moved (Paid)' }}
              </v-list-item>
              <v-list-item
                class="pointer"
                @click="searchData.status = `Moved (Unpaid)`"
              >
                {{ 'Moved (Unpaid)' }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn class="green white--text" small @click="submit">
            Search
          </v-btn>
        </v-col>
      </v-row>
    </section>
    <div class="px-2">
      <section v-if="!loading" id="click_page_inner_wrapper">
        <table v-if="clicks" class="table table-striped table-bordered table-hover">
          <thead>
            <tr class="grey white--text">
              <th>Date</th>
              <th>Property</th>
              <th>Landlord</th>
              <th>Prospect </th>
              <th>Channel</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="click in clicks"
              :key="click.id"
              class="odd gradeX pa-2 wrapper"
              :class="{
                'redlist': click.status === 1 || click.status === 3,
                'greenlist': click.status === 4,
                'blacklist': click.status === 2 || click.status === 5
              }"
            >
              <td class="text-center pointer">
                {{ click.created_at | time }}
              </td>
              <td class="text-center pointer" @click="goToProperty(click.property.id)">
                {{ click.property.name }}
              </td>
              <td class="text-center pointer" @click="call(click.property.contact)">
                {{ "0" + click.property.contact }}
              </td>
              <td class="text-center pointer" @click="call(click.prospect.phone_number)">
                {{ click.prospect.name }} <br>
                {{ "0" + click.prospect.phone_number }}
              </td>
              <td class="text-center">
                {{ click.channel }}
              </td>
              <td
                class="text-center"
                :class="{
                  'red--text': click.status == 2,
                  'green--text': click.status == 3 || click.status == 4
                }"
              >
                {{ click.status | statusName }} <br>
                <span v-if="click.status == 3" class="black--text">
                  {{ click.commission + "/=" }}
                </span>
              </td>
              <td class="text-center">
                <section v-if="click.status == 1">
                  <span class="pointer link blue--text mx-4" @click="prepToSetClickStatus(3, click.id)">
                    Moved
                  </span>
                  <span class="pointer link red--text mx-4" @click="prepToSetClickStatus(2, click.id)">
                    Rejected
                  </span>
                </section>
                <section v-else-if="click.status == 3">
                  <span class="pointer link green--text mx-4" @click="prepToSetClickStatus(4, click.id)">
                    Paid
                  </span>
                </section>
                <section v-else>
                  No Action Required
                </section>
              </td>
            </tr>
          </tbody>
        </table>
        <section v-else>
          <empty-component
            :hide-buttons="true"
            :message="`No Clicks Meet This Creteria.`"
          />
        </section>
      </section>
      <loading-widget
        v-else
        :message="`Fetching Clicks`"
      />
    </div>
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
      </v-row>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
  name: 'ClicksPage',

  filters: {
    statusName (status) {
      if (status === 1) {
        return 'Unresolved'
      }
      if (status === 2) {
        return 'Rejected'
      }
      if (status === 3) {
        return 'Moved (Unpaid)'
      }
      if (status === 4) {
        return 'Moved (Paid)'
      }
    },

    time (createdAt) {
      return dayjs(createdAt).format('HH:mm\nDD\nMMM\nYYYY')
    }
  },

  data: () => ({
    isSearchBlockOpen: true,
    loading: false,
    searchData: {}
  }),

  watch: {
    $route () {
      const navHeight = document.getElementById('nav_bar').offsetHeight
      const viewPortHeight = window.innerHeight
      this.loading = true

      if (this.$router.history.current.query.status) {
        const status = this.$router.history.current.query.status
        const data = {
          status
        }
        this.fetchClicks(data).then(() => {
          this.loading = false
          setTimeout(() => {
            const headingHeight = document.getElementById('heading').offsetHeight
            document.getElementById('click_page_inner_wrapper').style.height = (viewPortHeight - (navHeight + headingHeight)) + 'px'
          }, 0)
        })
      } else {
        this.fetchClicks().then(() => {
          this.loading = false
          setTimeout(() => {
            const headingHeight = document.getElementById('heading').offsetHeight
            document.getElementById('click_page_inner_wrapper').style.height = (viewPortHeight - (navHeight + headingHeight)) + 'px'
          }, 0)
        })
      }
    }
  },

  computed: {
    ...mapGetters(['getClicksRecord']),

    clicks () {
      if (!this.getClicksRecord) {
        return
      }

      if (!this.getClicksRecord.data) {
        return
      }

      if (!this.getClicksRecord.data[0]) {
        return
      }

      return this.getClicksRecord.data
    }
  },

  methods: {
    ...mapActions(['fetchClicks', 'fetchClicksStatistics', 'setClickStatus', 'fetchSpecifiedClicks']),

    goToProperty (id) {
      this.$router.push('/property/' + id)
    },

    call (phoneNumber) {
      alert(phoneNumber)
    },

    prepToSetClickStatus (status, clickId) {
      let statusName

      switch (status) {
        case 2:
          statusName = 'Rejected'
          break

        case 3:
          statusName = 'Moved (Unpaid)'
          break

        default:
          statusName = 'Paid'
          break
      }

      const message = 'You are about to turn this click into the status of: ' + statusName + '\nProceed?'

      if (!confirm(message)) {
        return
      }
      const data = {
        clickId,
        status
      }
      console.log(data)

      if (status === 3) {
        const commission = prompt('Enter commission payable')
        if (isNaN(commission)) {
          alert('commission must be a number!')
          this.prepToSetClickStatus(status)
        }

        if (commission) {
          data.commission = commission
        }
      }
      this.setClickStatus(data).then(() => {
        this.boot()
      })
    },

    submit () {
      const data = this.searchData
      let statusCode

      if (data.status) {
        switch (data.status) {
          case 'Unresolved':
            statusCode = 1
            break
          case 'Rejected':
            statusCode = 2
            break
          case 'Moved (Paid)':
            statusCode = 3
            break
          case 'Moved (Unpaid)':
            statusCode = 4
            break

          default:
            break
        }

        data.statusCode = statusCode
      }

      console.log(data)

      this.loading = true
      this.fetchSpecifiedClicks(data).then(() => {
        this.loading = false
      })

      console.log(data)
    },

    boot () {
      const navHeight = document.getElementById('nav_bar').offsetHeight
      const viewPortHeight = window.innerHeight

      this.loading = true
      this.fetchClicksStatistics()

      this.loading = true

      const data = {}

      if (this.$router.history.current.query.status) {
        const status = this.$router.history.current.query.status
        data.status = status
      }
      this.fetchClicks(data.status ? data : null).then(() => {
        this.loading = false

        setTimeout(() => {
          const headingHeight = document.getElementById('heading').offsetHeight
          document.getElementById('click_page_inner_wrapper').style.height = (viewPortHeight - (navHeight + headingHeight)) + 'px'
        }, 0)
      })
    }
  },

  mounted () {
    this.boot()
  },

  created () {
    dayjs.extend(relativeTime)
  }
}
</script>
<style lang="css" scoped>
  .link{
    text-decoration: underline;
  }

  #click_page_inner_wrapper{
    overflow-y: scroll;
      /* height: 5rem; */
  }

  input{
    border: black solid 1px;
    border-radius: 3px;
  }
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
</style>
