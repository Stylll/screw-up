<template>
  <div>
    <h1 class="title">Screw Up !</h1>
    <div v-if="slip && !isLoading" class="content">
    <h5>Score</h5>
    <h1>{{score}}</h1>
    <br>
    <div class="slider-container">
      <div class="static-bar">
        <div class="moving-bar" :style="{width: progress + '%'}">
        </div>
      </div>
    </div>
    <br />
    <h6 v-if="desc">{{desc}}</h6>
    <br />
    <router-link to="/" class="waves-effect waves-light btn red darken-4">
      <span>QUIT</span>
    </router-link>
  </div>
  <div v-if="isLoading" class="content">
    <h5>Loading game...</h5>
    <span>Please wait</span>
  </div>
  <div v-if="loadingError" class="content">
    <h5 class="red-text">{{loadingError}}</h5>
    <br />
    <router-link to="/" class="waves-effect waves-light btn red darken-4">
      <span>Go to homepage</span>
    </router-link>
  </div>
  <div v-if="displayFailedModal || displayHighscoreModal" id="modal1" class="modal content">
    <div v-if="displayFailedModal" class="modal-content">
      <h4>Missed!</h4>
      <h5>Score</h5>
      <h1>{{score}}</h1>
      <h6>{{failedMessage}}</h6>
      <br>
      <button type="button" class="try_again_button" @click="startNewGame">
        <span class="try_again_text">Play Again</span>
      </button>
      <br/><br />
      <router-link to="/">Back to homepage</router-link>
    </div>
    <div v-if="displayHighscoreModal" class="modal-content">
      <h4>Highscore!</h4>
      <h5>Score</h5>
      <h1>{{score}}</h1>
      <h6>{{highscoreMessage}}</h6>
      <br>
      <div v-if="!highscoreSaved">
        <p>Enter your name below:</p>
        <input v-model="username" class="input_text" @change="handleChange" />
        <p v-if="saveError" class="red-text">{{saveError}}</p>
        <br />
        <button type="button" class="try_again_button" @click="saveHighscore">
          <span class="try_again_text">Save</span>
        </button>
      </div>
      <div v-if="highscoreSaved">
        <p>Highscore has been saved.</p>
        <button type="button" class="try_again_button" @click="startNewGame">
        <span class="try_again_text">Play Again</span>
      </button>
      </div>
      <br/><br />
      <router-link to="/">Back to homepage</router-link>
    </div>
  </div>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
import SlipManager from '../../helpers/SlipManager';
import generateTimerSpeed from '../../helpers/generateTimerSpeed';
import { saveHighscore, highscoreRef } from '../../helpers/Firebase';

const Game = {
  name: 'Game',
  self: null,
  data() {
    return {
      isLoading: true,
      slip: '',
      desc: '',
      codes: [],
      score: 0,
      progress: 0,
      timerFunc: null,
      gameStarted: false,
      failedMessage: '',
      highscoreMessage: '',
      displayModal: false,
      displayFailedModal: false,
      displayHighscoreModal: false,
      highscoreSaved: false,
      username: '',
      saveError: '',
      loadingError: '',
    };
  },
  methods: {
    handleChange(event) {
      this.username = event.target.value;
    },
    getSlip() {
      const slip = SlipManager.getRandomSlip();
      const failedMessage = SlipManager.getRandomFailedMessage();
      const highscoreMessage = SlipManager.getRandomHighscoreMessage();
      this.slip = slip;
      this.desc = slip.desc;
      this.codes = [...slip.codes];
      this.isLoading = false;
      this.gameStarted = true;
      this.failedMessage = failedMessage;
      this.highscoreMessage = highscoreMessage;
    },
    startTimer() {
      const speed = generateTimerSpeed(this.score);
      this.progress = 0;
      this.timerFunc = setInterval(this.updateProgressBar, 100, Game.self, speed);
    },
    stopTimer() {
      this.progress = 0;
      clearInterval(this.timerFunc);
    },
    validateResult() {
      if (!this.codes.length) {
        this.score += 1;
        this.isLoading = true;
        this.loadNextGame();
      } else {
        this.gameStarted = false;
        this.displayResult();
      }
    },
    updateProgressBar(self, speed) {
      this.progress += 100 / speed;
      if (this.progress >= 100) {
        this.progress = 100;
        this.stopTimer();
        this.validateResult();
      }
    },
    prepareGame() {
      this.isLoading = true;
      highscoreRef.once('value').then((snapshot) => {
        const highscore = snapshot.val();
        this.$store.commit('setHighscore', highscore);
        this.isLoading = false;
        this.loadingError = '';
        this.startNewGame();
      }).catch(() => {
        this.isLoading = false;
        this.loadingError = 'An error occurred when loading the game. Try again.';
      });
    },
    startNewGame() {
      this.displayFailedModal = false;
      this.displayHighscoreModal = false;
      this.isLoading = true;
      this.score = 0;
      this.highscoreSaved = false;
      this.username = '';
      this.getSlip();
      this.startTimer();
    },
    loadNextGame() {
      this.displayFailedModal = false;
      this.displayHighscoreModal = false;
      this.isLoading = true;
      this.getSlip();
      this.startTimer();
    },
    endGame() {
      this.gameStarted = false;
      this.displayResult();
    },
    displayResult() {
      if (this.score > this.$store.state.highscore.score) {
        this.displayHighscoreModal = true;
        return;
      }
      this.displayFailedModal = true;
    },
    saveHighscore() {
      if (!this.username) {
        this.saveError = 'Please enter your username';
        return;
      }
      this.saveError = '';
      const highscore = {
        username: this.username,
        score: this.score,
      };
      saveHighscore(highscore).then(() => {
        this.highscore = highscore;
        // this.$store.commit('setHighscore', highscore);
        this.highscoreSaved = true;
        this.saveError = '';
      }).catch((error) => {
        this.saveError = 'An error occurred while saving. Try again.';
      });
    },
    keyListener(event) {
      const key = Game.self.codes.shift();
      if (event.keyCode !== key && Game.self.gameStarted) {
        Game.self.stopTimer();
        Game.self.endGame();
        return;
      }

      if (!Game.self.codes.length && Game.self.gameStarted) {
        Game.self.stopTimer();
        Game.self.score += 1;
        Game.self.isLoading = true;
        Game.self.loadNextGame();
      }
    },
  },
  mounted() {
    this.prepareGame();
    Game.self = this;
  },
};
window.addEventListener('keydown', (event) => {
  if ([32, 38, 40].includes(event.keyCode)) {
    Game.methods.keyListener(event);
  }
});
export default Game;
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Rammetto+One');
  @import './style.css';
</style>

