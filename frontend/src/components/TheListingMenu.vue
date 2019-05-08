<template>
  <div v-if="listing">
    <ul class="menu-list">
      <template v-for="module in listing.modules">
        <li :key="module.moduleName">
          <a :href="'#'+module.moduleName+'-module'" class="menu-label">{{module.moduleName}}</a>
          <ul>
            <li v-for="entry in module.entries" :key="entry.commands.join()">
              <a :href="'#'+entry.commands[0]">{{entry.commands.join(', ')}}</a>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['listing'])
  }
}
</script>

<style>
</style>
