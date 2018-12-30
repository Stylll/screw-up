import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    highscore: {
      username: '',
      score: 0,
    },
  },
  mutations: {
    setHighscore(state, highscore) {
      state.highscore = highscore;
    },
  },
});
