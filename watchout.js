// make the game board settings

var gameSettings = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
}

//make the Enemies
//an array of 30 enemy objects with 3 properties. id, x and y
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
var board = d3.select('body')
.append('svg')
.attr({width: gameSettings.width, height: gameSettings.height, class: "gameBoard"});


//renderEnemies on the board
//this is an object
var renderEnemies =
  board.selectAll('circle')
  .data(enemy)
  .enter()
  .append('circle')
  .attr('cx', function(i){ return i.x; }).attr('cy', function(i){ return i.y; }).attr('id', function(i){ return i.id; }).attr('r', 10).attr('fill', 'blue' );

//make enemies move every second
setInterval(function() {
  renderEnemies.transition().duration(500).attr('cy', function(i){ return Math.random() * 800; }).attr('cx', function(i){ return Math.random() * 600; });
}, 1000);











