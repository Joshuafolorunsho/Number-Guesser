/*
GAME FUNCTION:
   - Player must guess a number between a min and max
   - Player gets a certain amount of guesses
   - Notify player of guesses remaining
   - Notify the player of the correct answer if loose
   - Let player choose to play again
*/

// Game values
let min = 1,
	max = 10,
	winningNum = 2,
	guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

//Asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Set message
const setMessage = (msg, color) => {
	message.textContent = msg;
	message.style.color = color;
};

// Game over 
const gameOver = (won, msg) => {
   let color;
   won === true ? color = 'green' : color = 'red';
   // Disable input
   guessInput.disabled = true;
   // Change border color
   guessInput.style.borderColor = color;
   // Set message
   setMessage(msg, color);
}

// Listen for guess
guessBtn.addEventListener('click', function() {
	let guess = parseInt(guessInput.value);

	//Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
   }
   
   // Check if won 
   if ( guess === winningNum){
      // Game over - won
      gameOver(true, `${winningNum} is correct, you WIN!!!!`)

   } else {
      // Wrong number
      guessesLeft--;
      if (guessesLeft === 0){
         //Game over - lost
         gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
         
      } else {
         // Game continues - answer wrong
         
         // Change border color
         guessInput.style.borderColor = 'red';

         // Clear input
         guessInput.value = '';

         // Tell user its the wrong number
         setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red' )
      }
   }
});



