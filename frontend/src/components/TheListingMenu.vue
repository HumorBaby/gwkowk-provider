<template>
  <div>
    <ul class="menu-list">
      <li class="menu-label">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search">
          <span class="icon is-small is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </li>
      <template v-for="module in modules">
        <li :key="module._id">
          <a :href="'#'+module.moduleName+'-module'" class="menu-label">{{module.moduleName}}</a>
          <ul>
            <li v-for="entry in module.entries" :key="entry._id">
              <a :href="'#'+entry.commands[0]">{{entry.commands.join(', ')}}</a>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      modules: 'getModules'
    })
  }
}
</script>

<style>
</style>
