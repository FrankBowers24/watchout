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
  this.enemyCount = 10;
  this.svg = d3.select('body').append('svg')
    .attr('width', this.width)
    .attr('height', this.height);
  this.img = this.svg.selectAll('image')
            .data(this.randomXy(this.enemyCount,this.height, this.width))
            .enter()
            .append('image')
            .attr('width', this.imgWidth)
            .attr('height', this.imgHeight)
            .attr('x', function(d){ return d[0];})
            .attr('y', function(d){ return d[1];})
            .attr('xlink:href', 'asteroid.png');

};

Watchout.prototype.update = function(data){
  console.dir (this);
  var enemy = d3.select(this);
  var enemies = this.svg.selectAll('image').data(data);
  enemies.transition().duration(1000)
      .tween('custom', this.tweenFunc);
  return false;

};

Watchout.prototype.tweenFunc = function(endPosition){
  //console.dir (this);
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
    var enemyNextPos = {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t
      };
    return enemy.attr('x',enemyNextPos.x).attr('y',enemyNextPos.y);
  };

};



Watchout.prototype.randomXy = function(enemyCount, height, width){
  console.log("in set tiome out  ----> " + enemyCount );
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
console.log("*************************");
}, 1000);




