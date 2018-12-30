import Slips from './store';

export default class SlipManager {
  static getRandomSlip = () => {
    let randomNumber = Math.random();
    // check what happens when there's no slip in the slips list
    randomNumber *= Slips.length;
    randomNumber = Math.floor(randomNumber);
    return Slips[randomNumber];
  }
}
