<template>
  <div class="content">
    <img class="app_image" src="../../assets/strategy.png" />
    <h1 class="title">Screw Up !</h1>
    <h5>Highscore</h5>
    <h6>Stephen - 500 points</h6>
    <br>
    <h6>Think you can beat that ?</h6>
    <router-link to="Game" class="waves-effect waves-light btn-large play_button">
      <span class="play_text">PLAY</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Rammetto+One');
  @import './style.css';
</style>

