import "./style.css";
import "./responsive.css";
import { createGame } from "./createGame";

const Game = createGame();
Game.initializeGame();

const randomizeBtn = document.getElementById("randomize-btn");
randomizeBtn.addEventListener("click", async () => {
  Game.newGame.computerPlayer.gameboard.resetShips();
  Game.newGame.setComputerShips();
  Game.createComputerBoard();
});

const startGameBtn = document.getElementById("start-game-btn");
startGameBtn.addEventListener("click", () => {
  Game.initializeGame();
  startGameBtn.style.display = "none";
  randomizeBtn.style.display = "none";
  resetGameBtn.style.display = "block";
  resetGameBtn.disabled = false;
});

const resetGameBtn = document.getElementById("reset-game-btn");
resetGameBtn.disabled = true;
resetGameBtn.addEventListener("click", () => {
  Game.resetGame();
  startGameBtn.style.display = "block";
  randomizeBtn.style.display = "block";
  resetGameBtn.disabled = true;
  resetGameBtn.style.display = "none";
  Game.initializeGame();
});

const OKBtn = document.getElementById('ok-btn')
OKBtn.addEventListener('click', () => {
  document.getElementById('message-container').style.display = 'none';
  Game.resetGame();
  startGameBtn.style.display = "block";
  randomizeBtn.style.display = "block";
  resetGameBtn.disabled = true;
  resetGameBtn.style.display = "none";
  Game.initializeGame();
})

const cancelBtn = document.getElementById('cancel-btn')
cancelBtn.addEventListener('click', () => {
  document.getElementById('message-container').style.display = 'none';
  resetGameBtn.style.display = 'block';
  resetGameBtn.disabled = false;
})