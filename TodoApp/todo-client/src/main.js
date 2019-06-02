import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Vue Bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// Vue resources
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.config.productionTip = false

//CSS
import './assets/css/style.css'

//Vue-awesome
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
