const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts;
const maxNumberOfAttempts = 5;  

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
hideAllMessages();
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//MAIN LOGIC IS HERE
function checkGuess() {
   hideAllMessages();//cleans all previous messages.
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

//Stretch goal added 
  if(guess<1 || guess>99){
    submitButton.disabled = true;
    alert("Your number is out of range! Please reset and start the game again.");
  } 
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';

    if(attempts===1){
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guess`;//Stretch goal added 
    } else{
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;}

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';

    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    if(remainingAttempts===1){
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    } else{
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }

    numberOfGuessesMessage.style.display = '';
    
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    tooHighMessage.style.display = 'none'; //Added - clean final form
    tooLowMessage.style.display = 'none'; //Added - clean final form
    //submitButton.addEventListener('click', checkGuess);
    
  }

  guessInput.value = '';

  resetButton.style.display = '';

}


function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    console.log(`Messages list: ${messages}`);
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts 
  attempts=0; 

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
  resetButton.style.display = 'none';
  hideAllMessages(); 
  //resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
resetButton.style.display = 'none';

setup();