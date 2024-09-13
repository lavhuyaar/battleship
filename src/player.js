import { gameboard } from "./gameboard";

//Player factory function
export function player() {
  function humanPlayer() {
    //Returns an object representing human player with it's own gameboard
    return {
      gameboard: gameboard(),
    };
  }

  function computerPlayer() {
    //Returns an object representing computer player with it's own gameboard
    return {
      gameboard: gameboard(),
    };
  }
  return {
    humanPlayer,
    computerPlayer,
  };
}
