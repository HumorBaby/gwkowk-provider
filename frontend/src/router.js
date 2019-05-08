import Vue from 'vue'
import Router from 'vue-router'

import HelpListing from './views/HelpListing.vue'
import HomePage from './views/HomePage.vue'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: ':listingId',
          name: 'help-listing',
          component: HelpListing,
          props: true
        },
        {
          path: '',
          name: 'home-page',
          component: HomePage
        }
      ]
    },
  ]
})
