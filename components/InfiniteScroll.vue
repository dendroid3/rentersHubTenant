<template>
  <div id="infinite">
    Laoder
  </div>
</template>
<script>
export default {
  name: 'InfiniteScroll',

  mounted () {
    const emit = () => {
      console.log('in emit')
      this.$emit('InfiniteScrollerLoaded')
    }
    const observer = new IntersectionObserver(function (entries) {
      // isIntersecting is true when element and viewport are overlapping
      // isIntersecting is false when element and viewport don't overlap
      if (entries[0].isIntersecting === true) {
        console.log('Element has just become visible in screen')
        emit()
      }
    }, { threshold: [1] })

    observer.observe(document.getElementById('infinite'))
  }
}
</script>
<style lang="">

</style>
