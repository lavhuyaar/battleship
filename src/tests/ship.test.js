import { ship } from "../ship";

const Ship = ship(3); //Ship object with the length of 3
Ship.hit(); //First hit
Ship.hit(); //Second hit

test("ship", () => expect(Ship.length).toBe(3)); //Testing Ship's length
test("ship hits", () => expect(Ship.hits).toBe(2)); //Testing how many times the Ship has been hit
test("ship is sunk", () => expect(Ship.isSunk()).toBe(false)); //Testing whether the Ship is sunk or not
