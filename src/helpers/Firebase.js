import firebase from 'firebase';

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  storageBucket: process.env.STORAGEBUCKET,
};
firebase.initializeApp(config);

export const highscoreRef = firebase.database().ref('highscore');

export const saveHighscore = highscore => highscoreRef.set(highscore);

export const database = firebase.database();

export default firebase;
