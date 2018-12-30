import Slips, { failedMessages, highscoreMessages } from './store';

export default class SlipManager {
  static getRandomSlip = () => {
    let randomNumber = Math.random();
    // check what happens when there's no slip in the slips list
    randomNumber *= Slips.length;
    randomNumber = Math.floor(randomNumber);
    return Slips[randomNumber];
  }

  static getRandomFailedMessage = () => {
    let randomNumber = Math.random();
    randomNumber *= failedMessages.length;
    randomNumber = Math.floor(randomNumber);
    return failedMessages[randomNumber];
  }

  static getRandomHighscoreMessage = () => {
    let randomNumber = Math.random();
    randomNumber *= highscoreMessages.length;
    randomNumber = Math.floor(randomNumber);
    return highscoreMessages[randomNumber];
  }
}
