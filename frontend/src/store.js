import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
    state: {
        listing: null
    },
    mutations: {
        setListing(state, newListing) {
            state.listing = newListing
        }
    },
    actions: {
        async fetchListing({ commit }, listingId) {
            let response = await axios.get(`/api/v1/helpListing/${listingId}`)
            commit('setListing', response.data.data)
        }
    }
})

export default store
