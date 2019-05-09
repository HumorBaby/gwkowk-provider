<template>
  <div>
    <template v-for="(module,ix) in modules">
      <listing-print-module :key="module._id" :module="module"/>
      <hr v-if="ix < modules.length" :key="'hr' + module._id" align="center">
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ListingPrintModule from './ListingPrintModule'

export default {
  components: {
    ListingPrintModule
  },
  computed: {
    ...mapGetters({
      modules: 'getModules'
    })
  }
}
</script>

<style lang="sass" scoped>
hr
  width: 90%
  margin: 1.5rem auto
</style>
