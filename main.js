import Vue from 'vue'
import App from './App'
import ego from './script/ego.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.ego = ego

const app = new Vue({
    ...App
})
app.$mount()
