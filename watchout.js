// start slingin' some d3 here.
//
//
//
var Watchout = function() {

   this.init();
}

Watchout.prototype.init = function() {
  var width = 800;
  var height = 800;
  var imgWidth = 100;
  var imgHeight = 100;
  var enemyCount = 10;
  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
  var img = svg.selectAll("image")
            .data(this.randomXy(enemyCount,height, width))
            .enter()
            .append("image")
            .attr("width", imgWidth)
            .attr("height", imgHeight)
            .attr("x", function(d){ return d[0];})
            .attr("y", function(d){ return d[1];})
            .attr("xlink:href", "asteroid.png");
  console.log("random array --> " + this.randomXy(10, 10, 10));

}

Watchout.prototype.randomXy = function(enemyCount, height, width){
  var arrayOut = [];
  for(var i = 0; i < enemyCount; i++){
    var x = Math.random()*width;
    var y = Math.random()*height;
    arrayOut.push([x, y]);
  }
  return arrayOut;
}

var watchout = new Watchout();
