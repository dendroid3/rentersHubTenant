<template>
  <div class="grey lighten-2 d-flex justify-center pa-4 rounded">
    <section>
      <div class="text-center">
        <img
          class="img"
          cover
          :src="require('../assets/components/empty.svg')"
        >
      </div>
      <div>
        {{ message }}
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'EmptyComponent',

  props: ['message']
}
</script>
<style lang="css" scoped>
    .img{
        max-width: 15rem;
    }
</style>
