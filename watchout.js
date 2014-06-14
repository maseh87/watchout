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



// //check if any collisions happen
// var checkCollision = function(enemy, callBack) {
//   _.each(player, function(dude) {
//     var radiusSum = parseFloat(enemy.attr('r')) + dude.r;
//     var xDiff = parseFloat(enemy.attr('cx')) - dude.x;
//     var yDiff = parseFloat(enemy.attr('cy')) - dude.y;
//     var separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
//     if(separation < radiusSum){
//       callBack(player, enemy);
//     }
//   })
// };
// var onCollision = function() {
//   console.log('this shit got real');
// };

// var collisionDectect = function(endData) {
//   var checkEnemy = d3.select(this);
//   var startPosition = {
//     x: parseFloat(checkEnemy.attr('cx')),
//     y: parseFloat(checkEnemy.attr('cy'))
//   }

//   var endPosition = {
//     x: axes.x(endData.x),
//     y: axes.y(endData.y)
//   }
//   return function(t) {
//     checkCollision(checkEnemy, onCollision);
//     var enemyNextPos = {
//       x: startPosition.x + (endPosition.x - startPosition.x) * t,
//       y: startPosition.y + (endPosition.y - startPosition.y) * t
//     };
//     checkEnemy.attr('cx', enemyNextPos.x)
//     .attr('cy', enemyNextPos.y);
//   }
// };

  // console.log(collisionDectect);







//make enemies move every second
setInterval(function() {
  renderEnemies.transition().duration(500)
  .attr('cy', function(i){ return Math.random() * 600; })
  .attr('cx', function(i){ return Math.random() * 600; });
  collide(renderEnemies)
}, 1500);



function collide(enemies) {
  enemies.each(function(){
    if(d3.select(this).attr("cx") - d3.select('.player').attr("cx") < 20) {
      console.log('hit');
    }
  });
}





