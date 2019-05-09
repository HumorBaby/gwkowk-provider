<template>
  <div>
    <ul class="menu-list">
      <li class="menu-label">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search" v-model="searchString">
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
import { mapGetters, mapMutations } from 'vuex'

import { debounce } from 'lodash'

export default {
  data() {
    return {
      searchString: ''
    }
  },
  computed: {
    ...mapGetters({
      modules: 'getModules'
    })
  },
  watch: {
    searchString(newSearchString) {
      this.debouncedSearch(newSearchString)
    }
  },
  methods: {
    ...mapMutations({
      search: 'SET_SEARCH_STRING'
    })
  },
  created() {
    this.debouncedSearch = debounce(this.search, 100)
  }
}
</script>

<style>
</style>
