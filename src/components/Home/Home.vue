<template>
  <div class="content">
    <img class="app_image" src="../../assets/strategy.png" />
    <h1 class="title">Screw Up !</h1>
    <div v-if="!isLoading && !loadingError">
      <h5>Highscore</h5>
      <h6>{{getHighScoreUsername}} - {{getHighScore}} points</h6>
      <br>
      <h6>Think you can beat that ?</h6>
      <router-link to="Game" class="waves-effect waves-light btn-large play_button">
        <span class="play_text">PLAY</span>
      </router-link>
    </div>
    <div v-if="isLoading">
      <h6>Retrieving highscore from server...</h6>
      <p>please wait...</p>
    </div>
    <div v-if="loadingError">
      <h5 class="red-text">{{loadingError}}</h5>
    </div>
  </div>
</template>

<script>
import { highscoreRef } from '../../helpers/Firebase';

export default {
  name: 'Home',
  data() {
    return {
      isLoading: '',
      loadingError: '',
    };
  },
  computed: {
    getHighScoreUsername() {
      return this.$store.state.highscore.username;
    },
    getHighScore() {
      return this.$store.state.highscore.score;
    }
  },
  mounted() {
    this.isLoading = true;
    highscoreRef.once('value').then((snapshot) => {
      const highscore = snapshot.val();
      this.$store.commit('setHighscore', highscore);
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = false;
      this.loadingError = 'An error occurred when retrieving the highscore. Please reload the page.';
    });
  },
};
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Rammetto+One');
  @import './style.css';
</style>

