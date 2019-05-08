<template>
  <div v-if="listing">
    <template v-for="(module,ix) in listing.modules">
      <listing-print-module :key="module.moduleName" :module="module"/>
      <hr v-if="ix < listing.modules.length" :key="module.moduleName+'hr'" align="center">
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ListingPrintModule from './ListingPrintModule'

export default {
  components: {
    ListingPrintModule
  },
  computed: {
    ...mapState(['listing'])
  }
}
</script>

<style lang="sass" scoped>
hr
  width: 90%
  margin: 1.5rem auto
</style>
