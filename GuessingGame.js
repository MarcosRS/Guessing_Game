function Game(hello) {
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
    this.playersGuess = null;
}


Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
        $('#hint, #submit').prop("disabled", true);
        $('#subtitle').text("Press the Reset button to play again!")
        $('#title').text('You Win!');
        return 'You Win!'
    } else {
        if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
            $('#subtitle').text("You have already guessed that number.")
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-ouput-' + this.pastGuesses.length).text(this.playersGuess);
            if (this.pastGuesses.length === 5) {
                $('#title').text('You Lose.');
                $('#hint, #submit').prop("disabled", true);
                return 'You Lose.';

            } else {
                var diff = this.difference();

                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }

                if (diff < 10){
                  $('#title').text("You\'re burning up!");  
                  return 'You\'re burning up!';  
                } 

                else if (diff < 25) {
                    $('#title').text("You\'re lukewarm.");
                    return 'You\'re lukewarm.';
                }

                    
                else if (diff < 50) {
                    $('#title').text("You\'re a bit chilly.");
                    return 'You\'re a bit chilly.';
                }
                else{ 
                    $('#title').text("You\'re ice cold!");
                    return 'You\'re ice cold!';
                }
            }
        }
    }
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
    return (this.winningNumber > this.playersGuess);
}

Game.prototype.playersGuessSubmission = function(guess) {
    if (typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();

    console.log(this.hello);
}

Game.prototype.provideHint = function() {
    var hint = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hint);
}

function newGame() {
    return new Game();
}

function shuffle(arr) {
    var m = arr.length,
        t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }

    return arr;
}

function generateWinningNumber() {
    var output = Math.floor((Math.random() * 100) + 1);
    return (output) ? output : 1;
}


$(document).ready(function() {
    var startGame = new Game();
    var output = '';

    $('#submit').on('click', function() {
        output = startGame.playersGuessSubmission(parseInt($('#player-input').val()));
        $('#player-input').val('');
    })

    $('#reset').click(function() {
        startGame = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess h1').text('-');
        $('#hint, #submit').prop("disabled", false);
    })

    $('#hint').click(function() {
        var hints = startGame.provideHint();
        $('#title').text('The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
    });

});