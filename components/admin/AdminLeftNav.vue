<template>
  <div class="red">
    <div class="bold-2 blue">
      <v-list
        id="nav_wrapper"
        class="white--text main-color text-uppercase"
        nav
      >
        <v-list-item-group
          class="row no-gutters d-flex justify-center wrapper"
          active-class="deep-blue--text red--text"
        >
          <v-list-item class="short-line-under" dark @click="goToSection(null)">
            {{ 'Landlords' }}
          </v-list-item>
          <v-list-item class="short-line-under" dark @click="goToSection(null)">
            {{ 'Properties' }}
          </v-list-item>
          <v-list-item class="short-line-under" dark @click="goToSection(null)">
            {{ 'Prospects' }}
          </v-list-item>
          <v-list-item class="short-line-under" dark @click="goToSection('clicks')">
            {{ 'Clicks' }}
          </v-list-item>
          <v-list-item class="short-line-under" dark @click="goToSection(null)">
            {{ 'Queries' }}
          </v-list-item>
          <v-list-item class="short-line-under" dark @click="goToSection(null)">
            {{ 'Transactions' }}
          </v-list-item>
          <v-list-item class="short-line-under" dark @click="goToSection(null)">
            {{ 'Activity' }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminLeftNav',

  mounted () {
    this.boot()
  },

  methods: {
    goToSection (section) {
      if (!section) {
        alert('page unavailable')
        return
      }
      this.$router.push('?section=' + section)
    },

    boot () {
      const navHeight = document.getElementById('nav_bar').offsetHeight
      const viewPortHeight = window.innerHeight

      document.getElementById('nav_wrapper').style.height = (viewPortHeight - navHeight) + 'px'
    }
  }
}
</script>
<style lang="css" scoped>
     .active_list .v-list-group .v-list-item--active {
    color: green !important;
  }
    .left-bar{
        height: 100vh;
        /* position: relative; */
        overflow-y: hidden;

    }
    .short-line-under{
/* background-color: #e0e0e0; */
        position: relative;
    }
    .short-line-under::after{
        content: '';
        border-bottom: solid 1px white;
        position: absolute;
        bottom: 0;
        width: 60%;
        left: 20%;
    }
    .primary-color{
        background-color: rgb(15,14,56);
    }

    .available-icon{
        padding: 0.25rem;
        background-color: green;
        font-size: 0.75rem;
        line-height: 0.75rem;
        border-radius: 0.25rem;
        position: absolute;
        top: -0.25rem;
        right: -1rem;
    }
    .outer-icon-wrapper{
        position: relative;
    }
    .wrapper{
        position: relative;
    }
    .toogle-button{
        padding: 0.5rem;
        border-radius: 50%;
        bottom: 0rem;
        position: fixed;
        cursor: pointer;
    }
  .main-color{
    background: #09308F;
  }
</style>
