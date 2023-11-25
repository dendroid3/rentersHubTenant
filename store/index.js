import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'https://api.rentershub.co.ke/api/'

export const state = () => ({
  alertMessage: null,
  clickRecord: null,
  clicksRecord: null,
  clicksStatistics: null,
  locations: null,
  displayProperties: null,
  filters: null,
  currentProperty: null,
  isFetchingProperties: false,
  searchType: null,
  prospectRecord: null
})

export const getters = {
  getAlertMessage: state => (state.alertMessage),
  getClicksRecord: state => (state.clicksRecord),
  getClicksStatistics: state => (state.clicksStatistics),
  getLocations: state => (state.locations),
  getDisplayProperties: state => (state.displayProperties),
  getFilters: state => (state.filters),
  getCurrentProperty: state => (state.currentProperty),
  isFetchingProperties: state => (state.isFetchingProperties),
  getSearchType: state => (state.searchType),
  getProspectRecord: state => (state.prospectRecord)
}

export const actions = {
  setAlertMessage ({ commit }, data) {
    commit('SET_ALERT_MESSAGE', data)

    setTimeout(() => {
      commit('SET_ALERT_MESSAGE', null)
    }, 2000)
  },

  async recordClick ({ commit }, data) {
    try {
      const res = await axios.post(BASE_URL + 'record_click', data)
      commit('SET_CLICK_RECORD', res.data)
    } catch (err) {
      console.log(err)
    }
  },

  async fetchClicks ({ commit }, data) {
    try {
      const res = await axios.post(BASE_URL + 'get_clicks', data)
      commit('SET_CLICKS_RECORDS', res.data)
    } catch (err) {
      console.log(err)
    }
  },

  async fetchSpecifiedClicks ({ commit }, data) {
    try {
      const res = await axios.post(BASE_URL + 'get_specified_clicks', data)
      commit('SET_CLICKS_RECORDS', res.data)
    } catch (err) {
      console.log(err)
    }
  },

  async fetchClicksStatistics ({ commit }) {
    try {
      const res = await axios.get(BASE_URL + 'get_clicks_statistics')
      commit('SET_CLICKS_STATISTICS', res.data)
    } catch (err) {
      console.log(err)
    }
  },

  async setClickStatus ({ dispatch }, data) {
    try {
      const res = await axios.post(BASE_URL + 'set_click_status', data)
      dispatch('setAlertMessage', res.data, { root: true })
      dispatch('fetchClicksStatistics', null, { root: true })
    } catch (err) {
      console.log(err)
    }
  },

  async fetchLocations ({ commit }, data) {
    try {
      const res = await axios.post(BASE_URL + 'location', data)
      commit('SET_LOCATIONS', res.data)
    } catch (err) {
      console.log(err)
    }
  },
  async fetchFilteredProperties ({ commit }, data) {
    try {
      commit('SET_IS_FETCHINGPROPERTIES', true)
      const url = data.link ? data.link : BASE_URL + 'search'

      const res = await axios.post(url, data)

      commit('SET_SEARCH_TYPE', 'advanced')
      commit('SET_FILTERS', data)
      commit('SET_DISPLAY_VACANCIES', res.data)
      commit('SET_IS_FETCHINGPROPERTIES', false)
      console.log(res)
    } catch (err) {
      commit('SET_IS_FETCHINGPROPERTIES', false)
      console.log(err)
    }
  },

  async fetchSimpleFilteredProperties ({ commit, getters }, data) {
    try {
      commit('SET_SEARCH_TYPE', 'simple')
      commit('SET_IS_FETCHINGPROPERTIES', true)
      commit('SET_FILTERS', data)
      let url = data.link ? data.link : BASE_URL + 'simple_search'
      if (data.next) {
        url = getters.getDisplayProperties.properties.links.filter(link => (
          link.label === 'Next &raquo;'
        ))[0].url
      }

      const res = await axios.post(url, data)

      if (data.next) {
        const properties = res.data.properties.data
        const allProperties = {
          ...getters.getDisplayProperties.properties.data,
          properties
        }
        const fullRes = res
        fullRes.data.properties.data = allProperties
        commit('SET_DISPLAY_VACANCIES', fullRes)
      } else {
        commit('SET_DISPLAY_VACANCIES', res.data)
      }
      commit('SET_IS_FETCHINGPROPERTIES', false)
      console.log(res)
    } catch (err) {
      commit('SET_IS_FETCHINGPROPERTIES', false)
      console.log(err)
    }
  },

  async fetchProperty ({ commit }, data) {
    try {
      const res = await
      axios.post(BASE_URL + 'property', data)
      commit('SET_CURRENT_PROPERTY', res.data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },

  setCurrentProperty ({ commit }, data) {
    commit('SET_CURRENT_PROPERTY', data)
    return true
  },

  async fetchPropertyFeatures ({ commit, getters }, data) {
    try {
      const res = await
      axios.post(BASE_URL + 'get_features', data)
      console.log(res)
      const features = res.data
      const property = {
        ...getters.getCurrentProperty,
        features
      }
      commit('SET_CURRENT_PROPERTY', property)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },

  async recordProspect ({ commit }, data) {
    try {
      const res = await
      axios.post(BASE_URL + 'record_prospect', data)
      commit('SET_PROSPECT_RECORD', res.data)
    } catch (err) {
      console.log(err)
    }
  }
}

export const mutations = {
  SET_ALERTMESSAGE: (state, alertMessage) => (state.alertMessage = alertMessage),
  SET_CLICK_RECORD: (state, clickRecord) => (state.clickRecord = clickRecord),
  SET_CLICKS_RECORDS: (state, clicksRecord) => (state.clicksRecord = clicksRecord),
  SET_CLICKS_STATISTICS: (state, clicksStatistics) => (state.clicksStatistics = clicksStatistics),
  SET_LOCATIONS: (state, locations) => (state.locations = locations),
  SET_DISPLAY_VACANCIES: (state, displayProperties) => (state.displayProperties = displayProperties),
  SET_FILTERS: (state, filters) => (state.filters = filters),
  SET_CURRENT_PROPERTY: (state, currentProperty) => (state.currentProperty = currentProperty),
  SET_IS_FETCHINGPROPERTIES: (state, isFetchingProperties) => (state.isFetchingProperties = isFetchingProperties),
  SET_SEARCH_TYPE: (state, searchType) => (state.searchType = searchType),
  SET_PROSPECT_RECORD: (state, prospectRecord) => (state.prospectRecord = prospectRecord)
}
