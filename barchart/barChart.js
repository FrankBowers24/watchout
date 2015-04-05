//window.rent = 0;

window.barWidth = 420;
window.barHeight = 20;


d3.json("rent.json",function(rent){
  window.rent = rent;
  var rentArray = _.map(rent, function(item){
    return item;
  });
  var domain = [];
  for(var i = 1; i<=4; i++){
    domain.push(d3.extent(rentArray, function(zip){
      return zip[i] === null ? 0 : zip[i];
    }));
  }
  domain = d3.extent(_.flatten(domain));
  window.scale = d3.scale.linear()
    .domain(domain)
    .range([0, 500]);

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
  var labels = ['studio', 'one bedroom','two bedrooms','three bedrooms'];




  d3.select('#chartLabels').selectAll('div')
    .data(labels)
    .enter().append('div')
    .text(function(d) { return d;});

  zipCode = zipCode || '94040';
  var zipCodedata = window.rent[zipCode].slice(1,-1);
  window.Chart = d3.select(".chartBars")
      .attr("width","500")
      .attr("height", window.barHeight * zipCodedata.length)

  var bar = window.Chart.selectAll("g")
      .data(zipCodedata)
      .enter()
      .append('g')
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("height", window.barHeight -1)
      .attr("width", function(d) { return window.scale(d); });

  bar.append("text")
      .attr("x", function(d) { return window.scale(d) - 3 })
      .attr("y", window.barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d){
        return d === null ? "No data" : d;
      });
};


var updateChart = function(zipCode, rent){
  //debugger
  console.dir(window.rent[zipCode]);
  zipCode = zipCode || '94040';

  var zipCodedata = window.rent[zipCode].slice(1,-1);



  var bars = window.Chart.selectAll("g")
      .data(zipCodedata)
      .transition()
      .append("g");

  bars.append("rect")
      .attr("width", function(d) { return window.scale(d); });

  bars.append("text")
      .attr("x", function(d) { return window.scale(d) - 3 })
      .attr("y", window.barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d){
        return d === null ? "No data" : d;
      });









  /*
  d3.select(".chartBars")
      .selectAll("rect")
      .data(window.rent[zipCode].slice(1,-1))
      .transition()
      .attr("height", window.barHeight -1)
      .attr("width", function(d) { return window.scale(d); })
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
      .text(function(d){
        return d > 0 ? d : "No data";
      })
      .attr("class", function(d){
        if (d === null){
          return 'noData';
        }else{
          return 'chartBars';
        }
        });
  */
 // d3.select("#zipCodeLabel").text(zipCode);
};



jQuery(document).ready(function(){
  $("#zipCodeMenu").on("click", function(event) {
    //var zip = event.target.innerHTML.to;
    //console.dir(event.target.innerHTML);
    updateChart(event.target.innerHTML, window.rent);
    //console.log("changed ************************ " );
   });
  });





//  <li><a href="#">Another action</a></li>
