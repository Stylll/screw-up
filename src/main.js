// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { highscoreRef } from './helpers/Firebase';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});

// listener to update the store when highscore is updated on firebase
highscoreRef.on('value', (snapshot) => {
  const highscore = snapshot.val();
  store.commit('setHighscore', highscore);
});
