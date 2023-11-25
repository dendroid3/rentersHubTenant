<template>
  <v-row id="admin_view_wrapper" class="no-gutters">
    <v-col
      v-show="$vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg"
      class="col-2"
    >
      <admin-left-nav />
    </v-col>
    <v-col
      v-show="$vuetify.breakpoint.md || $vuetify.breakpoint.xl || $vuetify.breakpoint.lg"
      class="col-3"
    >
      <admin-mid-nav />
    </v-col>
    <v-col class="col-md-7">
      <admin-pages-clicks />
    </v-col>
  </v-row>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>
