<template>
  <div>
    <v-row class="pa-2 no-gutters">
      <v-col class="col-12 pa-3 rounded main-color-2">
        <v-row class="no-gutters">
          <v-col class="col-6 main-font">
            Total
          </v-col>
          <v-col class="col-6 secondary-font">
            {{ getClicksStatistics ? Intl.NumberFormat().format(getClicksStatistics.total_commission) : 0 }}
          </v-col>
        </v-row>
        <v-row class="no-gutters">
          <v-col class="col-6 main-font">
            Paid
          </v-col>
          <v-col class="col-6 secondary-font">
            {{ getClicksStatistics ? Intl.NumberFormat().format(getClicksStatistics.paid_commission) : 0 }}
          </v-col>
        </v-row>
        <v-row class="no-gutters">
          <v-col class="col-6 main-font">
            Pending
          </v-col>
          <v-col class="col-6 secondary-font">
            {{ getClicksStatistics ? Intl.NumberFormat().format(getClicksStatistics.pending_commission) : 0 }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AdminRevenueBelt',

  computed: {
    ...mapGetters(['getClicksStatistics'])
  }
}
</script>
<style lang="css" scoped>
    .main-font{
        font-weight: 600;
        font-size: 120%;
    }
    .secondary-font{
        font-size: 120%;
    }
</style>
