/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var lastDice, secondSixs;

var winningScore;
var inputNumber;

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = false;
    
    winningScore = 25;    
    
    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.getElementById('one').checked = false;
    document.getElementById('two').checked = false;
    
}

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        
        if (document.getElementById('one').checked){
            secondSixs = false;
            // 1. Random Number
            var dice = (Math.floor(Math.random()*6))+1;        
        
            // 2. Display the result
            var diceDOM =  document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' +dice + '.png';
        
            // 3. Update the round score IF the rolled number was NOT a 1
            if (dice === 6 && lastDice === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                document.querySelector('#current-' + activePlayer).textContent = '0';
                secondSixs = true;
                nextPlayer();
            
            } else if (dice !== 1){
            
                //Add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
       
            } else {
                nextPlayer();

            }

            if (secondSixs){
                lastDice = 0;
            } else {
                lastDice = dice;
            }
        } else if(document.getElementById('two').checked){
            console.log('Dice 2 is checked!');
            secondSixs = false;
            // 1. Random Number
            var dice1 = (Math.floor(Math.random()*6))+1; 
            var dice2 = (Math.floor(Math.random()*6))+1; 
            var diceSum = dice1 + dice2;
            
            console.log(diceSum);
            // 2. Display the result
            
                // Dice 1 - Display
                var diceDOM1 =  document.getElementById('dice--1');
                diceDOM1.style.display = 'block';
                diceDOM1.style.left = '42.5%';
                diceDOM1.src = 'dice-' +dice1 + '.png';
            
                // Dice 2 - Display
                var diceDOM2 =  document.getElementById('dice--2');
                diceDOM2.style.display = 'block';
                diceDOM2.style.left = '57.5%';
                diceDOM2.src = 'dice-' +dice2 + '.png';
        
            // 3. Update the round score IF the rolled number was NOT a 1
            if ((dice1 === 6 || dice2 === 6) && lastDice === 6){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                document.querySelector('#current-' + activePlayer).textContent = '0';
                secondSixs = true;
                nextPlayer();
            
            } else if (dice1 !== 1 || dice2!==1){
            
                //Add score
                roundScore += diceSum;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
       
            } else {
                nextPlayer();

            }

            if (secondSixs){
                lastDice = 0;
            } else {
                
                if(dice1 === 6 || dice2 === 6){
                    lastDice = 6;
                }
                
            }
        }
        
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
        //1. Add CURRENT score to Global score
    
        scores[activePlayer] += roundScore;
    
    // 2. Update the UI
    
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // 3. Check if the player won the game
        if (scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.getElementById('dice--1').style.display = 'none';
            document.getElementById('dice--2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
            
});

function nextPlayer(){
    
    activePlayer ===0 ? activePlayer = 1 : activePlayer= 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';
    
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-icon').addEventListener('click', function(){
    
    if(gamePlaying === false){
        inputNumber = parseInt(document.getElementById('winning-score').value);
    
        if (Number.isInteger(inputNumber)){
            winningScore = inputNumber;
        }
    }
    
    
            
});

document.querySelector('.btn-start').addEventListener('click', function(){
    
    if (document.getElementById('one').checked || document.getElementById('two').checked){
        document.getElementById('one').disabled;
        document.getElementById('two').disabled;
        
        if (gamePlaying === false){
            gamePlaying = true;
        }
    } else{
        alert('You cannot start a game, until you didn\'t choose the dice number!');
    }
    
});

/*
document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em> + dice + '</em>';

var x = document.querySelector('#score-0').textContent;
console.log(x);*/

/*function btn() {
    
    //code here
}
btn();*/

// document.querySelector('.btn-roll').addEventListener('click', btn)