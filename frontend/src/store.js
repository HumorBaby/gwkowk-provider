import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import Fuse from 'fuse.js'

import { STATUS_FAIL, STATUS_SUCCESS } from './constants'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
    state: {
        listing: {},
        status: null,
        error: null,
        searchString: '',
        fuse: null
    },
    mutations: {
        SET_STATUS: (state, newStatus) => {
            state.status = newStatus
        },
        SET_ERROR: (state, newError) => {
            state.error = newError
        },
        SET_SEARCH_STRING: (state, newSearchString) => {
            state.searchString = newSearchString
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

            // Init new Fuse for search
            let entries = []
            state.listing.modules.forEach(module => { entries.push(...module.entries) })
            state.fuse = new Fuse(entries, {
                shouldSort: false,
                threshold: 0.2,
                distance: 1000,
                id: "_id", // Return entries._id on match
                keys: ['commands', 'doc']
            })
        }
    },
    getters: {
        getModules: state => {
            // If search string is empty, return all entries
            if (state.searchString === '') { return state.listing.modules }

            // Otherwise, search
            let matches = state.fuse.search(state.searchString)
            if (matches.length === 0) { return [] }

            return state.listing.modules.map(module => {
                return Object.assign(
                    {},
                    module,
                    {
                        entries: module.entries.filter(
                            entry => matches.includes(entry._id)
                        )
                    }
                )
            }).filter(module => module.entries.length > 0)

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
