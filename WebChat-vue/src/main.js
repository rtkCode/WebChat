import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../public/css/bootstrap.min.css'
import '../public/css/bootstrap-font.css'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
