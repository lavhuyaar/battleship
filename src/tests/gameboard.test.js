import { gameboard } from "../gameboard";
import ship from "../ship";

const game = gameboard(); //Mock gameboard

const mockShip = ship(4); //Mock ship

test("Board size", () => expect(game.board.length).toBe(10)); //Test to check the board size (10x10)

game.placeShips(0, 0, mockShip, true); //Horizontal ship
game.placeShips(3, 5, ship(3), false); //Vertical ship
game.placeShips(0, 3, ship(3), false); //Overlapping vertical ship
game.receiveAttack(4, 5); //1st hit to vertical ship
game.receiveAttack(5, 5); //2nd hit to vertical ship
game.receiveAttack(3, 5); //3rd hit to vertical ship

test("Position of Mockship", () => expect(game.board[0][2]).toBe(mockShip)); //Tests whether the ship has been placed horizontally on the board
test("Position of vertical ship", () => expect(game.board[5][5].hits).toBe(3)); //Returns 3 since the ship has been hit 3 times
test("Vertical ship sunk or not", () =>
  expect(game.board[5][5].isSunk()).toBe(true)); //Returns true since the vertical ship has been hit 3 times
test("Position of overlapping ship", () => expect(game.board[1][3]).toBeNull()); //Returns null since overlapping ship is not placed
