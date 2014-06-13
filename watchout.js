// start slingin' some d3 here.
//add the svg element representing our playing Field
var svg = d3.select('body').append('svg').attr('width', 700).attr('height', 450);




//Create the enemies
var makeEnemies = function() {



};

//Create the player
var makePlayer = function() {
  //return an object with the id, the x and y axis'
  return [{
    x: 300,
    y: 400,
    id: 'player'
  }];
};




//Puts the player and enemies on the board
d3.select('svg').append('g').attr('');
