import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

const EventBus = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default EventBus
