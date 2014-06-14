// make the game board settings

var gameSettings = {
  height: 600,
  width: 1000,
  nEnemies: 100,
  padding: 20
}

//make the board
var board = d3.select('body')
.append('svg')
.attr({width: gameSettings.width, height: gameSettings.height, class: "gameBoard"});

//make the Enemies
//an array of 30 enemy objects with 3 properties. id, x and y inside an object
var makeEnemies = function () {
  return _.range(0, gameSettings.nEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random() * 1500,
      y: Math.random() * 1500
    }
  })
};

var enemy = makeEnemies();

//make the player
//an object with an x and y property
var makePlayer = function() {
  return [{
    id: 'player',
    cX: 100,
    cY: 200
    }]
};

var player = makePlayer();

var drag = d3.behavior.drag()
  .on('drag', function(d){
    d3.select(this)
    .attr("cx", d.x = Math.max(10, Math.min(1000, d3.event.x)))
    .attr("cy", d.y = Math.max(10, Math.min(600, d3.event.y)));
});

// //render player on the board
var renderPlayer = board.selectAll('player').data(player).enter();

renderPlayer
  .append('circle')
  .attr('fill', 'red')
  .attr('r', 10)
  .attr('cy', function(i){return i.cY})
  .attr('cx', function (i) {return i.cX})
  .attr('class', 'player').call(drag);



//renderEnemies on the board
//this is an object
var renderEnemies =
  board.selectAll('circle')
  .data(enemy)
  .enter()
  .append('circle')
  .attr('cx', function(i){ return i.x; })
  .attr('cy', function(i){ return i.y; })
  .attr('id', function(i){ return i.id; })
  .attr('r', 10).attr('fill', 'blue');


//make enemies move every second
setInterval(function() {
  renderEnemies.transition().duration(500)
  .attr('cy', function(i){ return Math.random() * 1500; })
  .attr('cx', function(i){ return Math.random() * 1500; });
}, 750);











