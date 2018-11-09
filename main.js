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
  var flush;

  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
      <canvas id="splash-screen" width="774px" height="400px">
      
          </canvas>  
          
          <h1>BUBBLE BABY</h1>
          <div class="buttons">
       <button class="start-btn">Start</button>
      <button class="instructions-btn">How To Play</button>
      </div>
      <footer>
      Poppy Tait 2018
      </footer>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.start-btn');
    instructionsButton = document.querySelector('.instructions-btn');

    startButton.addEventListener('click', destroySplash);
    instructionsButton.addEventListener('click', destroySplash);
  }

  flush = new Audio('Powerpuff.mp3');
  //flush.loop = true;
  //flush.play();

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    instructionsButton.removeEventListener('click', destroySplash);
   

    if (event.target.className === "start-btn") {
      buildGameScreen();
      flush.loop = true;
      flush.play();
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
    <h2>How To Play</h2>
    <p span class="instructions-text">Use the spacebar to guide Bubbles through Townsville. Avoid crashing into pipes as you go!</span></p>
    </section>
    <span class='back-btn'><button>Back</button></span>
    
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
      <p>Score: <span class="score">0</span></p>
      
      </div>
        <canvas id="game-screen" width="774px" height="400px">
    <img id="source" src="new-bubbles.png">
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
        <div class="gameoverdiv">
          <div class="score-display">
           <p>SCORE: <span id="highscore">${score}</span></p>
          </div>
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