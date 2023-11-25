<template>
  <div id="wrapper" class="grey lighten-4">
    <admin-revenue-belt />

    <v-row class="no-gutters">
      <admin-content-tab :count="all" :title="`All`" :url="'/admin?section=clicks'" />

      <admin-content-tab :count="unresolved" :title="`Unresolved`" :url="'/admin?section=clicks&status=1'" />

      <admin-content-tab :count="not_moved" :title="`Rejected`" :url="'/admin?section=clicks&status=2'" />

      <admin-content-tab :count="moved_unpaid" :title="`Unpaid`" :url="'/admin?section=clicks&status=3'" />

      <admin-content-tab :count="moved_paid" :title="`Paid`" :url="'/admin?section=clicks&status=4'" />
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AdminMidNav',

  computed: {
    ...mapGetters(['getClicksStatistics']),

    all () {
      return this.unresolved + this.not_moved + this.moved_paid + this.moved_paid
    },

    unresolved () {
      if (!this.getClicksStatistics) {
        return 0
      }

      return this.getClicksStatistics.unresolved
    },

    not_moved () {
      if (!this.getClicksStatistics) {
        return 0
      }

      return this.getClicksStatistics.not_moved
    },

    moved_paid () {
      if (!this.getClicksStatistics) {
        return 0
      }

      return this.getClicksStatistics.moved_paid
    },

    moved_unpaid () {
      if (!this.getClicksStatistics) {
        return 0
      }

      return this.getClicksStatistics.moved_unpaid
    }
  },

  mounted () {
    this.boot()
  },

  methods: {
    boot () {
      const navHeight = document.getElementById('nav_bar').offsetHeight
      const viewPortHeight = window.innerHeight

      document.getElementById('wrapper').style.height = (viewPortHeight - navHeight) + 'px'
    }
  }
}
</script>
