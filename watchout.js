// start slingin' some d3 here.
//
//
//
var Watchout = function() {
  this.init();
};

Watchout.prototype.init = function() {
  this.width = 800;
  this.height = 800;
  this.imgWidth = 100;
  this.imgHeight = 100;
  this.enemyCount = 5;
  this.collisionCount = 0;
  this.collisionCount = 0;
  this.collisionFlag = false;
  this.highScore = 0;

  this.svg = d3.select('body').append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .attr('fill', 'black');
  this.img = this.svg.selectAll('image')
            .data(this.randomXy(this.enemyCount,this.height, this.width))
            .enter()
            .append('image')
            .attr('width', this.imgWidth)
            .attr('height', this.imgHeight)
            .attr('x', function(d){ return d[0];})
            .attr('y', function(d){ return d[1];})
            .attr('xlink:href', 'shuriken2.png')
            .attr("class", "enemy");

  var drag = d3.behavior.drag()
    .on('drag', function(){
      this.setAttribute('cx', parseFloat(this.getAttribute('cx')) + d3.event.dx);
      this.setAttribute('cy', parseFloat(this.getAttribute('cy')) + d3.event.dy);
    });
  this.player = this.svg.append('circle')
    .attr('cy', this.height/2)
    .attr('cx', this.width/2)
    .attr('r', 25)
    .attr('fill', 'red')
    .call(drag);


};

Watchout.prototype.update = function(data){
  //console.dir (this);
  if (!this.collisionFlag){
      this.currentScore++;
      this.currentScore = this.currentScore || 0;
      console.log("current scoe ---> " + this.currentScore + " hig score =------> " + this.highScore );
      this.highScore = Math.max(this.currentScore, this.highScore);
      d3.select('.currentScore').text(this.currentScore.toString());
      d3.select('.highScore').text(this.highScore.toString());

  }
  var enemy = d3.select(this);
  var enemies = this.svg.selectAll('image').data(data);
  enemies.transition().duration(1000)
      .tween('custom', this.tweenFunc);
  this.collisionFlag = false;
  return false;

};

Watchout.prototype.isCollision = function(playerPos, astPos, r1, r2) {
  var astroidPosition = {
    x: astPos.x + 50,
    y: astPos.y + 50
  };
  var deltaX = Math.pow(playerPos.x - astroidPosition.x, 2);
  var deltaY = Math.pow(playerPos.y - astroidPosition.y, 2);
  var distance =  Math.sqrt( deltaX + deltaY);
  var deltaR = r1+r2;
  //console.log ("distance ---> " + distance + "delta r -----> " + deltaR );
  return ( distance < deltaR);

};

Watchout.prototype.tweenFunc = function(endPosition){
  //console.dir (this);
  var collisionEnemyFlag = true;
  var enemy = d3.select(this);
  var start = {
    x: +enemy.attr('x'),
    y: +enemy.attr('y')
  };
  var end = {
    x: endPosition[0],
    y: endPosition[1]
  };
  return function(t){
    var w = window.watchout;
    var enemyNextPos = {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t
      };
    var playerPos = {
      x: parseFloat(w.player.node().getAttribute('cx')),
      y: parseFloat(w.player.node().getAttribute('cy'))
    };
    if(collisionEnemyFlag && w.isCollision(playerPos, enemyNextPos,25, 50 )){
      //console.log("********************************************************************");
      w.collisionCount++;
      w.collisionFlag = true;
      collisionEnemyFlag = false;
      w.currentScore = 0;
      d3.select('.collisionsCount').text(w.collisionCount.toString());
      d3.select('.currentScore').text(w.currentScore.toString());


    }

    return enemy.attr('x',enemyNextPos.x).attr('y',enemyNextPos.y);
  };

};




Watchout.prototype.randomXy = function(enemyCount, height, width){
  var arrayOut = [];
  for(var i = 0; i < enemyCount; i++){
    var x = Math.random()*width;
    var y = Math.random()*height;
    arrayOut.push([x, y]);
  }
  return arrayOut;
};

var watchout = new Watchout();

//call update every secon
// this.update(this.randomXy)
//setInterval(watchout.update(watchout.randomXy(watchout.enemyCount,watchout.height, watchout.width)), 100);
//d3.timer( watchout.update(watchout.randomXy(watchout.enemyCount,watchout.height, watchout.width)), 100 );


setInterval(function(){
watchout.update(watchout.randomXy(watchout.enemyCount,watchout.height, watchout.width))
}, 1000);




