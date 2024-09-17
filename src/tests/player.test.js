import { player } from "../player";
import { ship } from "../ship";

const players = player(); //Players factory function
const human = players.humanPlayer(); //Human One
const humanTwo = players.humanPlayer(); //Human Two

//Placing ships on the gameboard of Human One
human.gameboard.placeShips(1, 1, ship(4), false); //Ship 1
human.gameboard.placeShips(6, 2, ship(6), true); //Ship 2

//Placing ships on the gameboard of Human Two
humanTwo.gameboard.placeShips(1, 1, ship(4), false); //Ship 1
humanTwo.gameboard.placeShips(6, 2, ship(6), true); //Ship 2

human.gameboard.receiveAttack(6, 4); //Human One receives the first attack on Ship 2
human.gameboard.receiveAttack(6, 7); //Human One receives the second attack on Ship 2

humanTwo.gameboard.receiveAttack(6, 2); //Human Two receives the first attack on Ship 1

test(`Hits of Human One's 1st ship`, () =>
  expect(human.gameboard.board[1][1].hits).toBe(0)); //Returns 0 since no hits on Ship 1 of Human One
test(`Hits of Human One's 2nd ship`, () =>
  expect(human.gameboard.board[6][2].hits).toBe(2)); //Returns 2 since two hits on Ship 2 of Human One
test(`Hits of Human Two's 1st ship`, () =>
  expect(humanTwo.gameboard.board[1][1].hits).toBe(0)); //Returns 0 since no hits on Ship 1 of Human Two
test(`Hits of Human Two's 2nd ship`, () =>
  expect(humanTwo.gameboard.board[6][2].hits).toBe(1)); //Returns 1 since one hit on Ship 2 of Human Two
