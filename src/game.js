import { player } from "./player";
import ship from "./ship";

//Game factory function that starts the game
export function game() {
  const players = player();
  const humanPlayer = players.humanPlayer(); //Human player
  const computerPlayer = players.computerPlayer(); //Computer player

  //Place ships randomly on the board of the player passed as the parameter, also ensures that all ships are placed
  function placeShipswithRetry(player, shipSize) {
    let placed = false;
    while (!placed) {
      let x = Math.floor(Math.random() * 10); //Returns X coordinate between 0-9
      let y = Math.floor(Math.random() * 10); //Returns Y coordinate between 0-9
      let isHorizontal = Math.random() < 0.5; //Returns either true or false (50%)
      placed = player.gameboard.placeShips(x, y, ship(shipSize), isHorizontal);
    }
  }
  
  //Places 6 total no. of ships on the board of Human player
  function setHumanShips() {
    for (let i = 2; i <= 6; i++) {
      placeShipswithRetry(humanPlayer, i);
    }
  }

  //Places 6 total no. of ships on the board of Computer player
  function setComputerShips() {
    for (let i = 2; i <= 6; i++) {
      placeShipswithRetry(computerPlayer, i);
    }
  }

  return {
    players,
    humanPlayer,
    computerPlayer,
    placeShipswithRetry,
    setHumanShips,
    setComputerShips,
  };
}
