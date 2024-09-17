//Gameboard factory function
export function gameboard() {
  let board = Array.from({ length: 10 }, () => Array(10).fill(null)); //10x10 board
  let ships = [];

  //Places ships horizontally or vertically on the given coordinates
  function placeShips(x, y, ship, isHorizontal) {
    if (isHorizontal) {
      //If ship is to be placed horizontally
      if (y + ship.length > 10) return false; //Returns false if the length of ship exceeds the length of board

      for (let i = 0; i < ship.length; i++) {
        //Loops through the row to check if there already exists a ship
        if (board[x][y + i] !== null) return false; //Returns false if there is already a ship
      }
      for (let i = 0; i < ship.length; i++) {
        //If not, then places the ship
        board[x][y + i] = ship;
      }
    } else {
      //If ship is to be placed vertically
      if (x + ship.length > 10) return false; //Returns false if the length of ship exceeds the length of board

      for (let i = 0; i < ship.length; i++) {
        //Loops through the column to check if there already exists a ship
        if (board[x + i][y] !== null) return false; //Returns false if there is already a ship
      }
      for (let i = 0; i < ship.length; i++) {
        //If not, then places the ship
        board[x + i][y] = ship;
      }
    }
    ships.push(ship);
    return true;
  }

  //Checks whether there exists a ship on the passed coordinates
  function receiveAttack(x, y) {
    if (board[x][y] !== null && board[x][y] !== "miss") {
      //If there is a ship on the passed coordinates
      board[x][y].hit(); //Hit function is called, incrementing the no. of hits of the ship by 1
      return true; //Returns true
    } else {
      board[x][y] = "miss"; //If there is no ship on the passed coordinates, then mark it as 'miss'
      return false; //Returns false
    }
  }

  //Resets the board and ships of gameboard
  function resetShips() {
    board = Array.from({ length: 10 }, () => Array(10).fill(null));
    ships = [];
  }

  return {
    get board() {
      return board;
    },
    get ships() {
      return ships;
    },
    placeShips,
    receiveAttack,
    resetShips,
  };
}
