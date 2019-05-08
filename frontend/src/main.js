import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.directive('title', {
  inserted: (el, binding) => document.title = `Helpel${binding.value ? ' | ' + binding.value : ''}`,
  update: (el, binding) => document.title = `Helpel${binding.value ? ' | ' + binding.value : ''}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
