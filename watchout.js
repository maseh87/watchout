// make the game board settings

var gameSettings = {
  height: 600,
  width: 1000,
  nEnemies: 10,
  padding: 20
}

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameSettings.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameSettings.height])
};

var score = {
  currentScore: 0,
  bestScore: 0
 };

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
      x: Math.random() * 600,
      y: Math.random() * 600
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
  .attr('cy', function(i){ return Math.random() * 600; })
  .attr('cx', function(i){ return Math.random() * 600; });
}, 1000);



function collide(enemies) {
  enemies.each(function(){
    if(Math.abs(d3.select(this).attr("cx") - d3.select('.player').attr("cx")) < 5 && d3.select(this).attr("cy") - d3.select('.player').attr("cy") < 5) {
      score.currentScore = 0;
      d3.select('.activeScore').text(score.currentScore);
    }
  });
}

d3.timer(function(){
  collide(renderEnemies);
});



