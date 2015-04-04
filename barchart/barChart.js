//window.rent = 0;

d3.json("rent.json",function(rent){
  window.rent = rent;
  var rentArray = _.map(rent, function(item){
    return item;
  });
  var total = [];
  for(var i = 1; i<=4; i++){
    total.push(d3.extent(rentArray, function(zip){
      return zip[i] === null ? 0 : zip[i];
    }));
  }
  total = d3.extent(_.flatten(total));
  var zipCodes = Object.keys(rent);
  d3.select("#zipCodeMenu").selectAll("li").data(zipCodes).enter()
    .append("li").append("a").attr("href", '#')
    .text(function(d){
      return d;
    });
    initChart();
});

var initChart = function(zipCode){
  //debugger
  zipCode = zipCode || '94040';
  window.Chart = d3.select(".chart")
      .selectAll("div")
      .data(window.rent[zipCode].slice(1,-1))
      .enter().append("div")
      .style("width", function(d) { return d/20 + "px"; })
      .text(function(d) { return d; });
};


var updateChart = function(zipCode, rent){
  //debugger
  console.dir(window.rent[zipCode]);
  zipCode = zipCode || '94040';
  d3.select(".chart")
      .selectAll("div")
      .data(window.rent[zipCode].slice(1,-1))
      .transition()
      .style("width", function(d) {
        return d/20 + "px"; })
      .text(function(d) { return d; })
      .style("opacity", function(d){
        return d > 0 ? 1 : 0;
      });
};



jQuery(document).ready(function(){
  $("#zipCodeMenu").on("click", function(event) {
    //var zip = event.target.innerHTML.to;
    console.dir(event.target.innerHTML);
    updateChart(event.target.innerHTML, window.rent);
    console.log("changed ************************ " );
   });
  });



//  <li><a href="#">Another action</a></li>
