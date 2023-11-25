export { default as AlertComponent } from '../..\\components\\AlertComponent.vue'
export { default as EmptyComponent } from '../..\\components\\EmptyComponent.vue'
export { default as FooterComponent } from '../..\\components\\FooterComponent.vue'
export { default as InfiniteScroll } from '../..\\components\\InfiniteScroll.vue'
export { default as LoadingWidget } from '../..\\components\\LoadingWidget.vue'
export { default as NavBar } from '../..\\components\\NavBar.vue'
export { default as AdminContentTab } from '../..\\components\\admin\\AdminContentTab.vue'
export { default as AdminLeftNav } from '../..\\components\\admin\\AdminLeftNav.vue'
export { default as AdminMidNav } from '../..\\components\\admin\\AdminMidNav.vue'
export { default as AdminRevenueBelt } from '../..\\components\\admin\\AdminRevenueBelt.vue'
export { default as HomePropertiesSection } from '../..\\components\\home\\HomePropertiesSection.vue'
export { default as HomeSearchBlock } from '../..\\components\\home\\HomeSearchBlock.vue'
export { default as PropertiesPropertyCard } from '../..\\components\\properties\\PropertiesPropertyCard.vue'
export { default as PropertiesPropertySkeleton } from '../..\\components\\properties\\PropertiesPropertySkeleton.vue'
export { default as AdminPagesClicks } from '../..\\components\\admin\\pages\\AdminPagesClicks.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
