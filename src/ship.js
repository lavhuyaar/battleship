//Ship factory function
function ship(length) {
  return {
    length, //Length of the ship
    hits: 0, //No. of hits
    hit: function () {
      this.hits += 1; //Increase hits by 1 when hit() is called
    },
    isSunk: function () {
      if (this.length === this.hits)
        return true; //Returns true if the length of ship and no. of hits is equal, indicating that the ship is sunk
      else return false; //Else returns false, indicating that the ship is not  sunk yet
    },
  };
}

module.exports = ship;
