<<<<<<< HEAD
// make the game board settings

var gameSettings = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
}

//make the Enemies
var makeEnemies = function () {
  return _.range(0, gameSettings.nEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 600
    }
  })
};

var enemy = makeEnemies();


//make the board
var board = d3.select('body').append('svg').attr({width: gameSettings.width, height: gameSettings.height, class: "gameBoard"});


//renderEnemies on the board
var renderEnemies = board.selectAll('circle').data(enemy).enter().append('circle').attr('cx', function(i){ return i.x; }).attr('cy', function(i){ return i.y; }).attr('id', function(i){ return i.id; }).attr('r', 10).attr('fill', 'blue' );



// board;
=======
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
>>>>>>> ff4ace821a7dd6b6e42e3a4abdab5fb12a07e7b1
