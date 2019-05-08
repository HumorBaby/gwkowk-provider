<template>
  <div id="main">
    <nav id="navbar" class="navbar has-shadow is-light" role="navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <h4 class="title is-4">H</h4>
        </a>
        <template v-if="listing">
          <div class="vert-div"></div>
          <h5 class="navbar-item subtitle is-5">
            {{listing.botNick}}
            <span v-if="listing.serverHostname">@{{listing.serverHostname}}</span>
          </h5>
        </template>
      </div>
    </nav>
    <router-view v-title="listingId"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    listingId() {
      return this.listing ? this.listing.listingId : ''
    },
    ...mapState(['listing'])
  }
}
</script>

<style>
.vert-div {
  border-left: 2px solid lightgray;
  margin: auto 5px;
  height: 80%;
}
</style>
