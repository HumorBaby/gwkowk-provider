import Vue from 'vue'
import Router from 'vue-router'

import HelpListing from './views/HelpListing.vue'
import HomePage from './views/HomePage.vue'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: function (to) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
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
