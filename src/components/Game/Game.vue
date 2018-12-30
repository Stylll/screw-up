<template>
  <div>
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
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
import SlipManager from '../../helpers/SlipManager';
import generateTimerSpeed from '../../helpers/generateTimerSpeed';

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
    };
  },
  methods: {
    getSlip() {
      const slip = SlipManager.getRandomSlip();
      this.slip = slip;
      this.desc = slip.desc;
      this.codes = [...slip.codes];
      this.isLoading = false;
      this.gameStarted = true;
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
    startNewGame() {
      this.getSlip();
      this.startTimer();
    },
    loadNextGame() {
      this.getSlip();
      this.startTimer();
    },
    endGame() {
      this.gameStarted = false;
    },
    keyListener(event) {
      const key = Game.self.codes.shift();
      if (event.keyCode !== key && Game.self.gameStarted) {
        // stop game
        Game.self.stopTimer();
        Game.self.endGame();
        return;
      }

      if (!Game.self.codes.length && Game.self.gameStarted) {
        // next level
        Game.self.stopTimer();
        Game.self.score += 1;
        Game.self.isLoading = true;
        Game.self.loadNextGame();
      }
    },
  },
  mounted() {
    this.startNewGame();
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
  @import './style.css';
</style>

