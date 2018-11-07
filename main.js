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
  var scoreElement;

  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
      <canvas id="splash-screen" width="774px" height="400px">
      
          </canvas>  
          <h1>BUBBLE BABY</h1>
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
        <canvas id="game-screen" width="774px" height="400px">
    <img id="source" src="bubbles.png">
    <img id="pipe-bottom" src="pipe-bottom-transparent.png">
    <img id="pipe-top" src="pipe-top.png">
        </canvas>   
      </main>
    `);
    document.body.prepend(gameScreen);
    
    scoreElement = document.querySelector('.score');
    var canvasElement = document.querySelector('canvas');
    var game = new Game(canvasElement);
    
    game.onPoints(updateScore);

    game.start();

    game.saveGameOverCallback(destroyGameScreen);
  }

  function updateScore(score) {
    
    scoreElement.innerText = score;
  }

  function destroyGameScreen(score) {
    console.log(score);
    gameScreen.remove();
    buildGameOverScreen(score);
  }

  function buildGameOverScreen(score) {
    gameOverScreen = buildDOM(`
      <main>
      <div id ="game-over-container">
        <canvas id="game-over-screen" width="774px" height = 400px">
        
        </canvas>
        <p>SCORE: <span id="highscore">${score}</span></p>
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