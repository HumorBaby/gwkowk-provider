<template>
  <div>
    <div :id="module.moduleName+'-module'" class="notification has-background-white">
      <icon-link-hoverable :href="module.moduleName+'-module'"/>
      <h4 class="subtitle is-4 is-inline">
        <code>{{module.moduleName}}</code>commands
      </h4>
    </div>
    <listing-print-module-entry
      v-for="entry in module.entries"
      :key="entry.commands.join()"
      :entry="entry"
    />
  </div>
</template>

<script>
import IconLinkHoverable from './IconLinkHoverable'
import ListingPrintModuleEntry from './ListingPrintModuleEntry'

export default {
  components: {
    IconLinkHoverable,
    ListingPrintModuleEntry
  },
  props: ['module']
}
</script>

<style lang="sass" scoped>
.notification
  margin-bottom: 0

code
    background: none

</style>
