
import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBDFn2R0fJ8aXg2kz_RxO8OzcVX122mVGc',
      authDomain: 'vuefb-374cf.firebaseapp.com',
      databaseURL: 'https://vuefb-374cf.firebaseio.com',
      projectId: 'vuefb-374cf',
      storageBucket: 'gs://vuefb-374cf.appspot.com/',
      messagingSenderId: '283908338821'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
