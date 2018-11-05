'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashScreen;
  var gameScreen;
  var gameOverScreen;
  var startButton;
  var restartButton;
  //add
  var scoreElement;

  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
      <canvas id="splash-screen" width="774px" height="435px">
      
          </canvas>  
        <button>Start</button>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('button');

    startButton.addEventListener('click', destroySplash);
  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);

    buildGameScreen();
  }

  function buildGameScreen() {
    gameScreen = buildDOM(`
      <main>   
      <div class = "score-div">
      <p>Score</p>
      <p class="score">0 </p>
      </div>
        <canvas id="game-screen" width="774px" height="435px">
    <img id="source" src="bubbles.png">
        </canvas>   
      </main>
    `);
    document.body.prepend(gameScreen);
    //add
    scoreElement = document.querySelector('.score');
    var canvasElement = document.querySelector('canvas');
    var game = new Game(canvasElement);
    //addition
    game.onPoints(updateScore);

    game.start();

    game.saveGameOverCallback(destroyGameScreen);
  }

  function updateScore(score) {
    
    scoreElement.innerText = score;
  }

  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
      <div id ="game-over-container">
        <canvas id="game-over-screen" width="774px" height = 435px">
        
        </canvas>
        <button id="game-over-btn">Restart</button>
        </div>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button');

    restartButton.addEventListener('click', destroyGameOverScreen)

  }

  function destroyGameOverScreen() {
    gameOverScreen.remove();
    buildGameScreen();
  }

  buildSplash();
}

window.addEventListener('load', main);