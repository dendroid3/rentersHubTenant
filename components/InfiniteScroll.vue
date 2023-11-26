<template>
  <div id="infinite" style="background: transparent; color: transparent;">
    Laoder
  </div>
</template>
<script>
export default {
  name: 'InfiniteScroll',

  mounted () {
    const emit = () => {
      this.$emit('InfiniteScrollerLoaded')
    }
    const observer = new IntersectionObserver(function (entries) {
      // isIntersecting is true when element and viewport are overlapping
      // isIntersecting is false when element and viewport don't overlap
      if (entries[0].isIntersecting === true) {
        emit()
      }
    }, { threshold: [1] })

    observer.observe(document.getElementById('infinite'))
  }
}
</script>
<style lang="">

</style>
