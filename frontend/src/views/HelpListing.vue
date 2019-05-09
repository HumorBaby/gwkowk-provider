<template>
  <section>
    <div v-if="status === constants.STATUS_SUCCESS" class="columns is-fullheight">
      <the-listing-menu class="column is-3 is-sidebar-menu"/>
      <the-listing-print class="column is-main-content"/>
    </div>
  </section>
</template>

<script>
import TheListingMenu from '../components/TheListingMenu'
import TheListingPrint from '../components/TheListingPrint'
import { mapState } from 'vuex'

import * as constants from '../constants.js'

export default {
  components: {
    TheListingMenu,
    TheListingPrint
  },

  data() {
    return {
      constants
    }
  },

  props: ['listingId'],

  async created() {
    await this.$store.dispatch('fetchListing', this.listingId)
    if (this.$route.hash) {
      this.scrollTo(this.$route.hash)
    }
  },
  computed: {
    ...mapState(['status'])
  },

  methods: {
    scrollTo: function(hashtag) {
      location.href = hashtag
    }
  }
}
</script>

<style lang="sass" scoped>
.is-sidebar-menu
  padding: 2.5rem

.is-main-content
  padding: 2.5rem 0 0 0
  margin: 0 0 0 0

$navbar-height: 3.25rem

.columns
  &.is-fullheight
    min-height: calc(100vh - ( #{$navbar-height} - .75rem ) )
    max-height: calc(100vh - ( #{$navbar-height} - .75rem ) )
    max-width: calc(100vw + .75rem)
    height: calc(100vh - ( #{$navbar-height} - .75rem ) )
    display: flex
    flex-direction: row
    justify-content: stretch
    .column
      overflow-y: scroll

</style>
