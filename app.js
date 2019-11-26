/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Variable settings
var scores, roundScore, activePlayer, gamePlaying;

init();

//Event listener
document.querySelector('.btn-roll').addEventListener('click', btn);
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying){
    //Add current score to global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check if palyer win the game
    if (scores[activePlayer] >= 100){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }
    else{
      nextplayer();
    }
  }

});
document.querySelector('.btn-new').addEventListener('click', init);

//Functions
function btn(){
  if(gamePlaying){
    //Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //Display the result
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM1.style.display = 'inline-block';
    diceDOM1.src = 'dice-' + dice1 + '.png';

    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'inline-block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
    
    //Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1){
      //Add score
      var dice = dice1 + dice2;
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else if (dice1 == 1 && dice2 == 1){
      //Reset current player storage
      scores[activePlayer] = 0;
      //Next player
      nextplayer();
    }
    else {
      //Next player
      nextplayer();
    }
  }
}
function nextplayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  //DOM manipulating
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  gamePlaying = true;
}