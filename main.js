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

  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <h1>bubblebaby</h1>
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
        <canvas id="game-screen" width="774px" height="435px">
    <img id="source" src="bubbles.png">
        </canvas>   
      </main>
    `);
    document.body.prepend(gameScreen);
    var canvasElement = document.querySelector('canvas');
    var game = new Game(canvasElement);
    game.start();

    game.saveGameOverCallback(destroyGameScreen);
  }

  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
        <canvas id="game-over-screen" width="774px" height = 435px">
        </canvas>
        <button>Restart</button>
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