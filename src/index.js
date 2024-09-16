import "./style.css";
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
  startGameBtn.disabled = true;
  document.getElementById("randomize-btn").disabled = true;
  resetGameBtn.disabled = false;
});

const resetGameBtn = document.getElementById("reset-game-btn");
resetGameBtn.disabled = true;
resetGameBtn.addEventListener("click", () => {
  Game.resetGame();
  startGameBtn.disabled = false;
  randomizeBtn.disabled = false;
  resetGameBtn.disabled = true;
  Game.initializeGame();
});
