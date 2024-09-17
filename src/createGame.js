import { game } from "./game";

//Creates a new game
export function createGame() {
  let newGame = game(); //New Game
  let gameStart = false; //Indicates that the game is not started yet

  newGame.setComputerShips(); //Place ships randomly on the board of Computer player
  newGame.setHumanShips(); //Place ships randomly on the board of Human player

  function initializeGame() {
    createComputerBoard(); //Creates UI of Computer player's board
    createHumanBoard(); //Creates UI of Human player's board
    gameStart = true; //Game started
  }

  //Creates UI of Computer player's board
  function createComputerBoard() {
    const div = document.querySelector(".computer-board"); //First-board div in the container div
    div.innerHTML = ""; //Clears the previously displayed board (if existed)
    const computerBoard = newGame.computerPlayer.gameboard.board; //Board of Computer player

    //Nested Loop that creates a board of buttons using array board of Computer player
    for (let i = 0; i < computerBoard.length; i++) {
      const row = document.createElement("div"); //Rows
      row.className = "computer-board-row";
      for (let j = 0; j < computerBoard[i].length; j++) {
        const boardCell = document.createElement("button"); //Cells (buttons) of rows
        boardCell.className = "computer-board-cell";
        boardCell.setAttribute("computer-cell-index", `${i},${j}`); //This is done so that these cells could be accessed easily
        if (computerBoard[i][j] !== null && computerBoard[i][j] !== "miss") {
          //If there is a ship
          boardCell.classList.add("ship");
          boardCell.style.backgroundColor = "royalblue";
        }

        row.append(boardCell);
      }
      div.append(row);
    }
  }

  //Creates UI of Human player's board
  function createHumanBoard() {
    const div = document.querySelector(".human-board"); //Second-board div in the container div
    div.innerHTML = ""; //Clears the previously displayed board (if existed)
    const humanBoard = newGame.humanPlayer.gameboard.board; //Board of Human player

    //Nested Loop that creates a board of buttons using array board of Human player
    for (let i = 0; i < humanBoard.length; i++) {
      const row = document.createElement("div"); //Rows
      row.className = "human-board-row";
      for (let j = 0; j < humanBoard[i].length; j++) {
        const boardCell = document.createElement("button"); //Cells (buttons) of rows
        boardCell.className = "human-board-cell";
        if (humanBoard[i][j] !== null && humanBoard[i][j] !== "miss") {
          boardCell.classList.add("ship");
        }
        row.append(boardCell);
        if (gameStart === true) {
          //If the game is initialized/started
          humanClick(boardCell, i, j);
        }
        /*Click event listeners on the cell, passes the value of 'i', 'j' and cell,
        so that the Human board could immediately update after cell is clicked
        Also prevents clicking before game is started*/
      }
      div.append(row);
    }
  }

  /*Adds click event listeners on the buttons (cells) of Human board; also makes sure that the buttons (cells)
  of Computer board are clicked randomly, immediately after the User clicks any button on Human board*/
  function humanClick(cell, x, y) {
    cell.addEventListener("click", () => {
      if (newGame.humanPlayer.gameboard.receiveAttack(x, y)) {
        //If there is a ship, then the cell turns green, indicating that we hit the ship
        cell.style.backgroundColor = "royalblue"; //REMINDER - CHANGE THE COLOR
        cell.innerText = "X"; //Indicates that ship is hit
      } else {
        cell.innerText = "•"; //Indicates that ship is missed
      }
      cell.disabled = true; //And the cell gets disabled, so it can't be clicked again

      computerClick(); //Following the user click, the automatic click on Computer board takes place

      if (checkWinner(newGame.humanPlayer)) {
        //If all the ships of Human board are sunk first (all ships are sunk by User first)
        document.querySelector('.message').innerText = 'Congratulations! You won! How about another win?'; //Human wins; Message pops up
        document.getElementById('message-container').style.display = 'grid';
        document.getElementById('reset-game-btn').style.display = 'none';
      } else if (checkWinner(newGame.computerPlayer)) {
        //If all the ships of Computer board are sunk first (all ships are sunk by Computer first)
        document.querySelector('.message').innerText = 'Oops! You lost! Get back at the Computer, will you?'; //Computer wins; Message pops up
        document.getElementById('message-container').style.display = 'grid';
        document.getElementById('reset-game-btn').style.display = 'none';
      }
    });
  }

  //Checks whether all the ships of player has sunk or not
  function checkWinner(player) {
    //Takes player (either Human Player or Computer Player)
    let ships = player.gameboard.ships; //Access ships array of the player
    let i = 0;
    //Loops through the ships array
    while (i < ships.length) {
      if (!ships[i].isSunk()) {
        return; //If all ships of the player are not sunk, the loop breaks
      } else i += 1; //If ship at ship[i] is sunk, then the loop goes on
    }

    /*If all ships of the player are sunk, then all the cells (buttons) of both Human board and Computer board are disabled,
      ensuring that no buttons could be pressed after the game is over*/
    document.querySelectorAll(".human-board-cell").forEach((cell) => {
      cell.disabled = true;
    });
    document.querySelectorAll(".computer-board-cell").forEach((cell) => {
      cell.disabled = true;
    });

    return true; //At last, returns true
    //This helps in the humanClick function above
  }

  //Ensures the automated click on Computer board (technically it ain't a click lol)
  function computerClick() {
    let placed = false;
    while (!placed) {
      //This loop makes sure that the click is not skipped due to overlapping
      //If overlapping happens, the loop is called again with different coordinates till the click happens
      let x = Math.floor(Math.random() * 10); //Random X Coordinate
      let y = Math.floor(Math.random() * 10); //Random Y Coordinate

      let cell = document.querySelector(
        //'computer-cell-index' attribute is added when the Computer board is created
        `.computer-board-cell[computer-cell-index="${x},${y}"]` //This attribute helps accessing the cell which needs to be changed
      );

      //If cell exists and is not disabled i.e. not previously clicked
      if (cell && !cell.disabled) {
        const attackCell = newGame.computerPlayer.gameboard.receiveAttack(x, y);

        if (attackCell) {
          //If the click happens on a ship
          cell.style.backgroundColor = "royalblue"; //The cell turns to green color, indicating that the ship is hit (REMINDER - CHANGE THE COLOR)
          cell.innerText = "X"; //Indicates that ship is hit
        }
        if (!attackCell) {
          //If the click does not happen on a ship i,e. it's miss
          cell.innerText = "•"; //Indicates that ship is missed
        }

        //After the cell is clicked, it is disabled and placed is changed to true, ending the loop
        cell.disabled = true;
        placed = true;
      }
    }
  }

  //Resets game
  function resetGame() {
    gameStart = false; //Indicates that the game is stopped

    newGame.humanPlayer.gameboard.resetShips(); //Resets the ships of Human board
    newGame.setHumanShips(); //Places ships on the new coordinates
    createHumanBoard(); //Displays Human board

    newGame.computerPlayer.gameboard.resetShips(); //Resets the ships of Computer board
    newGame.setComputerShips(); //Places ships on the new coordinates
    createComputerBoard(); //Displays Computer board
  }

  return {
    newGame,
    gameStart,
    initializeGame,
    createComputerBoard,
    createHumanBoard,
    checkWinner,
    humanClick,
    computerClick,
    resetGame,
  };
}
