/*
GAME FUNCTION:
   - Player must guess a number between a min and max
   - Player gets a certain amount of guesses
   - Notify player of guesses remaining
   - Notify the player of the correct answer if loose
   - Let player choose to play again
*/

// Generate random number
const getRandomNum = (min, max) =>
	Math.floor(Math.random() * (max - min) + min);

// Game values
let min = document.querySelector('#min'),
	max = document.querySelector('#max'),
	guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
	chooseNumberWrapper = document.querySelector('#choose-number-wrapper');
(minNum = document.querySelector('.min-num')),
	(maxNum = document.querySelector('.max-num')),
	(guessBtn = document.querySelector('#guess-btn')),
	(submitBtn = document.querySelector('#submit-btn')),
	(guessInput = document.querySelector('#guess-input')),
	(message = document.querySelector('.message'));

// Hide game
game.hidden = true;

const submitValue = event => {
	// show game
	game.hidden = false;
	chooseNumberWrapper.hidden = true;

	//Assign UI min and max
	minNum.textContent = min.value;
	maxNum.textContent = max.value;

	event.preventDefault();
};

// Add event listener
submitBtn.addEventListener('click', submitValue);

// Set message
const setMessage = (msg, color) => {
	message.textContent = msg;
	message.style.color = color;
};

// Game over
const gameOver = (won, msg) => {
	let color;
	won === true ? (color = 'green') : (color = 'red');
	// Disable input
	guessInput.disabled = true;
	// Change border color
	guessInput.style.borderColor = color;
	// Set message
	setMessage(msg, color);

	// Play Again?
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
};

// Play again event listener
game.addEventListener('mousedown', function(event) {
	if (event.target.className === 'play-again') {
		window.location.reload();
		// TO - DO : Called in here (Initialize function)
	}
});

// Listen for guess
guessBtn.addEventListener('click', function() {
	let guess = parseInt(guessInput.value),
		winningNum = getRandomNum(parseInt(min.value), parseInt(max.value));

	//Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if won
	if (guess === winningNum) {
		// Game over - won
		gameOver(true, `${winningNum} is correct, computer also chose ${winningNum}. you WIN!!!!`);
	} else {
		// Wrong number
		guessesLeft--;
		if (guessesLeft === 0) {
			//Game over - lost
			gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
		} else {
			// Game continues - answer wrong

				// Change border color
				guessInput.style.borderColor = 'red';

				// Clear input
				guessInput.value = '';

				// Tell user its the wrong number
				setMessage(`${guess} is not correct, computer chose ${winningNum}. ${guessesLeft} guesses left`, 'red');
		}
	}
});
