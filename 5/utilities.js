const readline = require('readline-sync');
/* STANDARD IMPORTS

const readline = require('readline-sync');
const util = require('/Users/conormccaulley/Projects/Utilities/utilities.js');

*/

//OUTPUT METHODS-------------------------------------------------------------
function prompt(message) {
  console.log(`=> ${message}`);
}


function returnIntWithSuffix(int) {
  const stringInt = String(int);

  //catch 11,12, and 13 th exceptions
  if (stringInt.length >= 2) {
    let finalTwo = stringInt.slice(stringInt.length - 2);
    if (finalTwo === '11' || finalTwo === '12' || finalTwo === '13') {
      return stringInt + 'th';
    }
  }

  //find the last digit in the integer string
  let lastDigit = stringInt.slice(stringInt.length - 1);

  //compair the final digit to find the correct suffix
  let suffix = ''
  switch (lastDigit) {
    case '1':
      suffix = 'st';
      break;
    case '2':
      suffix = 'nd';
      break;
    case '3':
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
      break;
  }
  return (stringInt) + suffix;
}

function padToTarget(word, target = 8, display = true) {
  let padFront = Math.ceil((target - word.length) / 2);
  let padBack = Math.floor((target - word.length) / 2);

  if (display) {
    return `${' '.repeat(padFront)}${word}${' '.repeat(padBack)}`;
  }
  return `${' '.repeat(target)}`;
}
//ARRAY & OBJECT METHODS-----------------------------------------------------

function randomObjValue(obj) {
  //retreives a random value from a passed object
  if (typeof (obj) !== 'object' || Number.isNaN(obj)) return undefined;

  if (!Array.isArray(obj)) {
    obj = Object.values(obj);
  }

  const arrayIndex = Math.floor((Math.random() * obj.length));
  return obj[arrayIndex];
}

function sumArray(arr, initialValue = 0) {
  //Sums a passed array 
  const sumWithInitial = arr.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    initialValue,
  );
  return sumWithInitial;
}

function deepFreeze(obj) {
  /*
  Deep freezes a passed object to its deepest level
  */
  Object.freeze(obj);
  let keys = Object.keys(obj)
  for (const key of keys) {
    if (typeof (obj[key]) === 'object') {
      deepFreeze(obj[key]);
    }
  }
}

//USER INPUT METHODS-----------------------------------------------------

function getValidNumber(initialPrompt, errorPrompt, allowFloats) {
  /*
    Retreives a number from the user and ensures that is valid.
    @param {string} initialPrompt - the string output to the user to
    prompt them to give the desired input
    @param {string} errorPrompt - the string output to the user if their
    initial input attempt is invalid.
    @param {boolean} allowFloats - if this is true, the function will allow
    the user to input float values, if not, only integers will be accepted.
    @returns {number} the verified number given by the user
  */

  prompt(initialPrompt);
  let inputNumber = readline.question();

  //ensure the entered number is valid
  while (invalidNumber(inputNumber, allowFloats)) {
    prompt(errorPrompt);
    inputNumber = readline.question();
  }
  return inputNumber;
}




function getValidInput(initialPrompt, errorPrompt, VALID_RESPONSES) {
  /*
    Retreives an imput string from the user and ensures that is valid.
    @param {string} initialPrompt - the string output to the user to
    prompt them to give the desired input
    @param {string} errorPrompt - the string output to the user if their
    initial input attempt is invalid.
    @param {array} VALID_RESPONSES - an array containing strings of all
    valid responses.
    @returns {string} - the verified string given by the user.
  */

  prompt(initialPrompt);
  let input = readline.question().trim();

  //check validity of langauge input and repromt if nessisary
  while (!VALID_RESPONSES.includes(input)) {
    prompt(errorPrompt);
    input = readline.question().trim();
  }
  return input;
}

//PREDICATES--------------------------------------------------

function isAlphanumeric(str) {
  /*
  Tests if a passed string contains only alphanumeric characters. 
  Returns true or false. 
  */
  return /^[a-zA-Z0-9]+$/.test(str);
}

function isAlpha(str) {
  /*
  Tests if a passed string contains only alphabetic characters. 
  Returns true or false. 
  */
  return /^[a-zA-Z]+$/.test(str);
}

function invalidNumber(number, allowFloats = false, allowNegative = false) {
  if (!allowNegative && number < 0) return true;
  number = String(number);
  if (allowFloats) {
    return number.trimStart() === '' || Number.isNaN(Number(number));
  } else {
    return number.trimStart() === '' || !Number.isInteger(Number(number));
  }
}


//EXPORTS----------------------------------------------------
module.exports = {
  prompt,
  getValidInput,
  getValidNumber,
  randomObjValue,
  returnIntWithSuffix,
  isAlphanumeric,
  isAlpha,
  invalidNumber,
  deepFreeze,
  padToTarget,
}


