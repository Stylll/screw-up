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
      if (highscore.username && highscore.score
        && (state.highscore.username !== highscore.username
        || state.highscore.score !== highscore.score)) {
        state.highscore = highscore;
      }
    },
  },
});
