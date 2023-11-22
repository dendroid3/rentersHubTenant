export const AlertComponent = () => import('../..\\components\\AlertComponent.vue' /* webpackChunkName: "components/alert-component" */).then(c => wrapFunctional(c.default || c))
export const EmptyComponent = () => import('../..\\components\\EmptyComponent.vue' /* webpackChunkName: "components/empty-component" */).then(c => wrapFunctional(c.default || c))
export const FooterComponent = () => import('../..\\components\\FooterComponent.vue' /* webpackChunkName: "components/footer-component" */).then(c => wrapFunctional(c.default || c))
export const LoadingWidget = () => import('../..\\components\\LoadingWidget.vue' /* webpackChunkName: "components/loading-widget" */).then(c => wrapFunctional(c.default || c))
export const NavBar = () => import('../..\\components\\NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const HomePropertiesSection = () => import('../..\\components\\home\\HomePropertiesSection.vue' /* webpackChunkName: "components/home-properties-section" */).then(c => wrapFunctional(c.default || c))
export const HomeSearchBlock = () => import('../..\\components\\home\\HomeSearchBlock.vue' /* webpackChunkName: "components/home-search-block" */).then(c => wrapFunctional(c.default || c))
export const PropertiesPropertyCard = () => import('../..\\components\\properties\\PropertyCard.vue' /* webpackChunkName: "components/properties-property-card" */).then(c => wrapFunctional(c.default || c))

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
