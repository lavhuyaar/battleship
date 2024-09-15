import { game } from "./game";

//Creates a new game
export function createGame() {
  let newGame = game(); //New Game

  newGame.setComputerShips(); //Place ships randomly on the board of Computer player
  newGame.setHumanShips(); //Place ships randomly on the board of Human player

  function initializeGame() {
    createComputerBoard(); //Creates UI of Computer player's board
    createHumanBoard(); //Creates UI of Human player's board
  }

  //Creates UI of Computer player's board
  function createComputerBoard() {
    const div = document.querySelector(".first-board");
    div.innerHTML = "";
    const computerBoard = newGame.computerPlayer.gameboard.board;

    for (let i = 0; i < computerBoard.length; i++) {
      const row = document.createElement("div");
      row.className = "computer-board-row";
      for (let j = 0; j < computerBoard[i].length; j++) {
        const boardCell = document.createElement("button");
        boardCell.className = "computer-board-cell";
        if (computerBoard[i][j] !== null && computerBoard[i][j] !== "miss") {
          boardCell.classList.add("ship");
          boardCell.style.backgroundColor = "royalblue";
        }
        if (boardCell.classList.contains("miss")) {
          boardCell.style.backgroundColor = "green";
        }
        if (boardCell.classList.contains("hit")) {
          boardCell.style.backgroundColor = "red";
        }

        row.append(boardCell);
        checkShips(newGame.computerPlayer);
      }
      div.append(row);
    }
  }

  //Creates UI of Human player's board
  function createHumanBoard() {
    const div = document.querySelector(".second-board");
    div.innerHTML = "";
    const humanBoard = newGame.humanPlayer.gameboard.board;

    for (let i = 0; i < humanBoard.length; i++) {
      const row = document.createElement("div");
      row.className = "human-board-row";
      for (let j = 0; j < humanBoard[i].length; j++) {
        const boardCell = document.createElement("button");
        boardCell.className = "human-board-cell";
        if (humanBoard[i][j] !== null && humanBoard[i][j] !== "miss") {
          boardCell.classList.add("ship");
          // boardCell.style.backgroundColor = "royalblue";
        }
        if (humanBoard[i][j] === "miss") {
          boardCell.classList.add("miss");
        }

        row.append(boardCell);
        clickButton(boardCell, i, j);
      }
      div.append(row);
    }
  }

  function clickButton(cell, x, y) {
    cell.addEventListener("click", () => {
      if (newGame.humanPlayer.gameboard.receiveAttack(x, y)) {
        cell.style.backgroundColor = "green";
        console.log("hit");
      } else {
        cell.style.backgroundColor = "red";
        console.log("miss");
      }
      cell.disabled = true;
      checkShips(newGame.humanPlayer);
    });
  }

  // function autoClickButton() {

  //   let x = Math.floor(Math.random * 10)
  //   let y = Math.floor(Math.random * 10)
  //   if(newGame.computerPlayer.gameboard.receiveAttack(x, y)) {
  //       const rows = document.querySelectorAll(".computer-board-row")
  //       rows.forEach((row) => {
  //         console.log(row[x][y])
  //       })
  //   }
  //   else {cell.classList.add('miss')}
  //   createComputerBoard()
  // }

  //Checks whether all the ships of player has sunk or not
  function checkShips(player) {
    if ((player = newGame.humanPlayer)) {
      let ships = player.gameboard.ships;
      let i = 0;
      while (i < ships.length) {
        if (ships[i].isSunk() === false) {
          return; //If not, then returns
        }
        if (ships[i].isSunk() === true) {
          i += 1;
        }
      }
      console.log("human ship sunk");
      const cells = document.querySelectorAll(".human-board-cell")
      cells.forEach((cell) => {
        cell.disabled = true
      })
    } else if ((player = newGame.computerPlayer)) {
      let ships = player.gameboard.ships;
      let i = 0;
      while (i < ships.length) {
        if (ships[i].isSunk() === false) {
          return; //If not, then returns
        }
        if (ships[i].isSunk() === true) {
          i += 1;
        }
      }
      console.log("computer ship sunk"); //If yes, then log 'sunk'
    }
  }

  return {
    newGame,
    initializeGame,
    createComputerBoard,
    createHumanBoard,
    clickButton,
    checkShips,
  };
}
