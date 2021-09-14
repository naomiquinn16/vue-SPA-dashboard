import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import * as firebase from 'firebase/app'
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

const app = new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
if (window.Cypress) {
  window.app = app;
}

