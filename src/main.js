import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$setJSON=function (key,json){
  localStorage.setItem(key,JSON.stringify(json))
}
Vue.prototype.$getJSON=function (key){
  return JSON.parse(localStorage.getItem(key))
}
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
