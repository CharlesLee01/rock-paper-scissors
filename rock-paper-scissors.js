let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */
  
  let isAutoPlaying = false; 
  let intervalID;
  const autoPlayButton = document.querySelector('.auto-play-button');
  const resetScoreButton = document.querySelector('.reset-score-button');

  autoPlayButton.addEventListener('click', () => autoPlay());

  resetScoreButton.addEventListener('click', () => displayResetConfirmation());

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
      autoPlay();
    } else if (event.key === 'Backspace') {
      displayResetConfirmation();
    } else if (event.key === 'r') {
      playGame("rock");
    } else if (event.key === 's') {
      playGame("scissors");
    } else if (event.key === 'p') {
      playGame("paper");
    }
  });

  function displayResetConfirmation() {
    const confirmation = document.querySelector('.js-confirmation');
    confirmation.innerHTML = `<div class="confirmation">Are you sure you want to reset the score?</div>
                            <button class="yes-button">Yes</button>
                            <button class="no-button">No</button>
                            `;

    document.querySelector('.yes-button').addEventListener('click', () => {
      console.log('reset');
      reset();
      removeResetConfirmation();
    }); 
    document.querySelector('.no-button').addEventListener('click', () => removeResetConfirmation()); 
  }

  

  function removeResetConfirmation() {
    const confirmation = document.querySelector('.js-confirmation');
    confirmation.innerHTML = '';
  }

  function reset() {
    console.log('hi');
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  function autoPlay() {
    if (!isAutoPlaying) {
      //setInterval returns an ID. Use the ID to stop the interval.
      autoPlayButton.innerHTML = 'Stop Playing';

      intervalID = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;


    } else {
      //stop autoplay

      autoPlayButton.innerHTML = 'Auto Play';

      clearInterval(intervalID);
      isAutoPlaying = false;
    }
  }

  


  function playGame(playerMove) {
    const computerMove = pickComputerMove();
  
    let result = '';
  
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }
  
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }
  
    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
  
    updateScoreElement();
  
    document.querySelector('.js-result').innerHTML = result;
  
    document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }
  