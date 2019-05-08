<template>
  <div>Listing {{listingId}}</div>
</template>

<script>
export default {
  props: ['listingId'],
  mounted() {
      // Get the listing from the server
      this.$store.dispatch(
          'fetchListing',
          this.listingId
      )
  }
};
</script>

<style>
</style>
