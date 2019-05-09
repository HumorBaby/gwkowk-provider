import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import { STATUS_FAIL, STATUS_SUCCESS } from './constants'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
    state: {
        listing: {},
        status: null,
        error: null,
    },
    mutations: {
        SET_STATUS: (state, newStatus) => {
            state.status = newStatus
        },
        SET_ERROR: (state, newError) => {
            state.error = newError
        },
        SET_LISTING: (state, newListing) => {
            /// Store storted listing
            // Sort modules
            newListing.modules.sort((a, b) =>
                (a.moduleName < b.moduleName)
                    ? -1
                    : (a.moduleName > b.moduleName)
                        ? 1
                        : 0
            )
            // Sort entries in each module
            newListing.modules.forEach(module => {
                module.entries.sort((a, b) =>
                    (a.commands[0] < b.commands[0])
                        ? -1
                        : (a.commands[0] > b.commands[0])
                            ? 1
                            : 0
                )
            });
            // Store storted listing
            state.listing = newListing
        }
    },
    actions: {
        async fetchListing({ commit }, listingId) {
            try {
                let response = await axios.get(`/api/v1/helpListing/${listingId}`)
                commit('SET_STATUS', STATUS_SUCCESS)
                commit('SET_LISTING', response.data.data)
            } catch (err) {
                commit('SET_ERROR', err.message)
                commit('SET_STATUS', STATUS_FAIL)
            }
        }
    }
})

export default store
