<template>
  <div id="main">
    <nav id="navbar" class="navbar has-shadow" role="navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <h4 class="title is-4">Helpel</h4>
        </a>
        <template v-if="status === constants.STATUS_SUCCESS">
          <div class="vert-div"></div>
          <h5 class="navbar-item subtitle is-5">
            {{listing.botNick}}
            <span v-if="listing.serverHostname">@{{listing.serverHostname}}</span>
          </h5>
          <div class="vert-div"></div>
          <h6 class="navbar-item subtitle is-6">
            Command prefix:
            <code>{{listing.helpPrefix}}</code>
          </h6>
        </template>
      </div>
    </nav>
    <router-view v-title="listingId"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import * as constants from '../constants.js'

export default {
  data() {
    return {
      constants
    }
  },
  computed: {
    listingId() {
      return this.status === constants.STATUS_SUCCESS
        ? this.listing.listingId
        : ''
    },
    ...mapState(['listing', 'status'])
  }
}
</script>

<style lang="sass" scoped>
.navbar-brand:first-child
  margin-left: 1rem

.subtitle:not(:last-child)
    margin-bottom: 0

.vert-div
  border-left: 2px solid lightgray
  margin: auto 5px
  height: 80%

code
    background: $white
    color: $red
    margin-left: 1rem
</style>
