/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that,
- it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const goalScoreInput = document.getElementsByClassName('goal-score-input')[0];
let goalScore = 100;
const newGame = document.getElementsByClassName('btn-new')[0];
const roll = document.getElementsByClassName('btn-roll')[0];
const hold = document.getElementsByClassName('btn-hold')[0];

const player0 = document.getElementsByClassName('player-0-panel')[0];
const player1 = document.getElementsByClassName('player-1-panel')[0];

let currentScoreHTML = document.querySelector('.active .player-current-score');
let currentScoreValue = parseInt(currentScoreHTML.innerHTML);

let dice = document.getElementsByClassName('dice')[0];

goalScoreInput.addEventListener('input', setGoalScore);
newGame.addEventListener('click', resetGame);
roll.addEventListener('click', rollDice);
dice.addEventListener('click', rollDice);
hold.addEventListener('click', holdHand);

function setGoalScore() {
  const goalScoreStatement = document.querySelector('.goal-score-container > div > span');
  goalScoreStatement.innerHTML = goalScoreInput.value;
  goalScore = goalScoreInput.value;
}

function resetGame() {
  let scores = document.getElementsByClassName('player-score');
  let currentScores = document.getElementsByClassName('player-current-score');

  document.getElementsByClassName('player-name')[0].innerHTML = 'Player 1';
  document.getElementsByClassName('player-name')[1].innerHTML = 'Player 2';

  Array.prototype.forEach.call(scores, function(score) {
    score.innerHTML = 0;
  });
  Array.prototype.forEach.call(currentScores, function(current) {
    current.innerHTML = 0;
  });
  currentScoreValue = 0;
  dice.src = './images/dice-1.png';

  player0.classList.add('active');
  player1.classList.remove('active');

}

function rollDice() {
  currentScoreHTML = document.querySelector('.active .player-current-score');
  currentScoreValue = parseInt(currentScoreHTML.innerHTML);
  let value = Math.floor(Math.random() * 6) + 1;

  dice.style.display = 'block';

  if (value === 1) {
    dice.src = './images/dice-1.png';
    switchPlayer();
  } else {
    switch(value) {
      case 2:
        dice.src = './images/dice-2.png';
        break;
      case 3:
        dice.src = './images/dice-3.png';
        break;
      case 4:
        dice.src = './images/dice-4.png';
        break;
      case 5:
        dice.src = './images/dice-5.png';
        break;
      case 6:
        dice.src = './images/dice-6.png';
    }

    currentScoreValue += value;
    currentScoreHTML.innerHTML = currentScoreValue;
  }
}

function holdHand() {
  let currentPlayerScoreHTML = document.querySelector('.active .player-score');
  let currentPlayerScoreValue = parseInt(currentPlayerScoreHTML.innerHTML);

  currentPlayerScoreValue += currentScoreValue;
  currentPlayerScoreHTML.innerHTML = currentPlayerScoreValue;

  currentScoreHTML.innerHTML = 0;
  currentScoreValue = 0;

  if (currentPlayerScoreValue > goalScore - 1) {
    document.querySelector('.active .player-name').innerHTML = 'WINNER';
    document.querySelector('.active').classList.add('winner');
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentScoreHTML.innerHTML = 0;
  currentScoreValue = 0;

  player0.classList.toggle('active');
  player1.classList.toggle('active');
}
