/***
 * Get a Random Number between given min and max Number
 * @param min min number
 * @param max max number
 *
 */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default randomInt;
