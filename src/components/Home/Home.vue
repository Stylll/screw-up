<template>
  <div class="content">
    <img class="app_image" src="../../assets/strategy.png" />
    <h1 class="title">Screw Up !</h1>
    <h5>Highscore</h5>
    <h6>Stephen - 500 points</h6>
    <br>
    <h6>Think you can beat that ?</h6>
    <a class="waves-effect waves-light btn-large play_button">
      <span class="play_text">PLAY</span>
    </a>
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
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title {
    font-family: 'Rammetto One', cursive, 'Roboto';
  }
  .play_button {
    width: 150px;
    margin-top: 10px;
    background-color: #5EA853;
  }
  .play_text {
    font-size: 20px;
    font-weight: 900;
  }
  .app_image {
    height: 120px;
    width: 120px;
  }
</style>

