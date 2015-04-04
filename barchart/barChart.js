
d3.json("rent.json",function(rent){
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

//<a id="myLink" href="#" onclick="MyFunction();return false;">link text</a>


  var zipCode = "94040";
  d3.select(".chart")
  .selectAll("div")
    .data(rent[zipCode].slice(1,-1))
  .enter().append("div")
    .style("width", function(d) { return d/20 + "px"; })
    .text(function(d) { return d; });

});

jQuery(document).ready(function(){
  $("#zipCodeMenu").on("click", function(event) {
    console.dir(event);
    console.log("changed ************************ " );
   });
  });



//  <li><a href="#">Another action</a></li>
