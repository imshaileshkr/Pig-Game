var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
        // read random number
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);

        // display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // update the round score if the rolled number was not a 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            //Next Player turn
            nextPlayer();
        }
    }
});

// Button Hold Click event
document.querySelector('.btn--hold').addEventListener('click', function () {

    if (gamePlaying) {

        // Add current score to Global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

// Next player turn function
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // make the roundScore to zero
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    // document.querySelector('.player--0').classList.remove('active');
    // document.querySelector('.player--1').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}
// New game Button 
document.querySelector('.btn--new').addEventListener('click', init);

function init() {

    // Set to default everything 
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');
}
