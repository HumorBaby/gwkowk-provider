<template>
  <section>
    <div class="columns is-fullheight">
      <the-listing-menu class="column is-3 is-sidebar-menu"/>
      <the-listing-print class="column is-main-content"/>
    </div>
  </section>
</template>

<script>
import TheListingMenu from '../components/TheListingMenu'
import TheListingPrint from '../components/TheListingPrint'

const TIMEOUT = 1

export default {
  components: {
    TheListingMenu,
    TheListingPrint
  },
  props: ['listingId'],
  async mounted() {
    await this.$store.dispatch('fetchListing', this.listingId)
    if (this.$route.hash) {
      setTimeout(() => this.scrollTo(this.$route.hash), TIMEOUT)
    }
  },
  methods: {
    scrollTo: function(hashtag) {
      setTimeout(() => {
        location.href = hashtag
      }, TIMEOUT)
    }
  }
}
</script>

<style lang="sass" scoped>
.is-sidebar-menu
  padding: 2.5rem

.is-main-content
  padding: 2.5rem 0 0 0
  margin: 0 .75rem 0 0

$navbar-height: 3.25rem

.columns
  &.is-fullheight
    min-height: calc(100vh - ( #{$navbar-height} - .75rem ) )
    max-height: calc(100vh - ( #{$navbar-height} - .75rem ) )
    height: calc(100vh - ( #{$navbar-height} - .75rem ) )
    display: flex
    flex-direction: row
    justify-content: stretch
    .column
      overflow-y: auto

</style>
