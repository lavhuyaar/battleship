import "./style.css";
import { createGame } from "./createGame";

const Game = createGame()
Game.initializeGame()

const randomizeBtn = document.getElementById("randomize-btn");
randomizeBtn.addEventListener("click", () => {
  Game.newGame.computerPlayer.gameboard.resetShips();
  Game.newGame.setComputerShips();
  Game.createComputerBoard();
});

const startGameBtn = document.getElementById("start-game-btn");
startGameBtn.addEventListener("click", () => {
  Game.initializeGame()
  startGameBtn.disabled = true;
  document.getElementById("randomize-btn").disabled = true;
});

// let x = Math.floor(Math.random * 10)
//     let y = Math.floor(Math.random * 10)
//     if(Game.newGame.computerPlayer.gameboard.receiveAttack(x, y)) {
//         const rows = document.querySelectorAll(".computer-board-row")
//         rows.forEach((row) => {
//           console.log(row[x][y])
//         })
//     }