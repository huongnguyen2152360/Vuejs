import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueRouter from 'vue-router'
import Route from './routes/route'
import Icons from 'vue-awesome'
import App from './views/App.vue'
import * as store from './stores/store'

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)
Vue.component('v-icon', Icons)

const router = new VueRouter({
  routes: Route
})

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
