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
  var instructionsButton;
  var instructionsScreen;
  var backButton;

  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
      <canvas id="splash-screen" width="774px" height="400px">
      
          </canvas>  
          <h1>BUBBLE BABY</h1>
       <button class="start-btn">Start</button>
      <button class="instructions-btn">Instructions</button>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.start-btn');
    instructionsButton = document.querySelector('.instructions-btn');

    startButton.addEventListener('click', destroySplash);
    instructionsButton.addEventListener('click', destroySplash);
  }

  var flush = new Audio('Powerpuff.mp3');
  flush.loop = true;
  flush.play();

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    instructionsButton.removeEventListener('click', destroySplash);
    startButton.addEventListener("click", flush.play());

    if (event.target.className === "start-btn") {
      buildGameScreen();
    } else {
      buildInstructions();
    }
  }

  function destroyInstructions() {
    instructionsScreen.remove();
    backButton.removeEventListener('click', destroyInstructions);
    buildSplash();
  }

  function buildInstructions() {

    instructionsScreen = buildDOM(`
    <main> 
    <section>
    <h2>INSTRUCTIONS</h2>
    <p>Use the spacebar to guide Bubbles through Townsville and avoided crashing into pipes as you go.</p>
    <button class='back-btn'>Back</button>
    </section>
    </main>
    `);

    document.body.prepend(instructionsScreen);

    backButton = document.querySelector('.back-btn');
    backButton.addEventListener('click', destroyInstructions);
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
        <button class="game-over-btn">Restart</button>
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