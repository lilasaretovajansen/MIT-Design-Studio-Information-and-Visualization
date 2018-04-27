var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// setup x, in this case the values in X axis are the calories
// We need to define the range, scale and position
var xValue = function(d) { return d["Life Ladder"];}, // data -> value
    xScale = d3.scale.linear().range([0, width/2]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var inputHappiness=5;
var inputComaparison = 7;
var year = 2015;
var color ="#ACF0F2";
var comparisonColumn = "Log GDP per capita";
// setup y, in this case the values in X axis are the proteins
// We need to define the range, scale and position
var yValue = function(d) { return d[comparisonColumn];}, // data -> value
    yScale = d3.scale.linear().range([height/2, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color, manufaturer is just a column in our data
var cValue = function(d){ return d.country;}
 var color = d3.scale.category10();

// add the graph canvas to the body of the webpage
// svg is similar to the 'ctx' element from our in class tutorial
var svg = d3.select("#scatter-plot").append("svg") // here the canvas is just in the body
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("#scatter-plot").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);





// load data
d3.csv("WHR.csv", function(error, data) {
  // change string (from CSV) into number format
  data = data.filter(function(d){
      if (d.year==year){
          return true;
      }
      return false;
  });
  data.forEach(function(d) {
    d["Life Ladder"] = +d["Life Ladder"];
    d[comparisonColumn] = +d[comparisonColumn];
//    console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height/2) + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width/2)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Happiness Rating");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Log GDP per capita");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 7)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return "pink";})// color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["country"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
    
    //add users point
    svg.append("circle")
    .attr("class","dot input")
    .attr("r",7)
    .attr("cx",xScale(inputHappiness))
    .attr("cy",yScale(inputComaparison))
    .style("fill", "#FEFFA5")
    .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html("You" + "<br/> (" +inputHappiness.toString()+ ", " + inputComaparison + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
  // draw legend
  /*var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });*/


});
document.getElementById("year-slider").addEventListener("click",function(e){
    year = parseInt(document.getElementById("year-slider").value);
    updateData();
});
document.getElementById("generosity-button").addEventListener("click",function(e){
    console.log(document.getElementById("generosity-button").value);
    comparisonColumn = document.getElementById("generosity-button").value;
    inputComaparison = 1;
    color = "#1695A3";
    updateData();
    
    
    
});

document.getElementById("social-support-button").addEventListener("click",function(e){
    console.log(document.getElementById("social-support-button").value);
    comparisonColumn = document.getElementById("social-support-button").value;
    color = "#225378";
    inputComaparison = 1;
    updateData();
});

document.getElementById("life-expectancy-button").addEventListener("click",function(e){
    console.log(document.getElementById("life-expectancy-button").value);
    comparisonColumn = document.getElementById("life-expectancy-button").value;
    color = "#B4DC7F";
    inputComaparison = 60;
    updateData();
});
document.getElementById("gdp-button").addEventListener("click",function(e){
    console.log(document.getElementById("gdp-button").value);
    comparisonColumn = document.getElementById("gdp-button").value;
    inputComaparison = 4;
    color = "#ACF0F2";
    updateData();
});
function updateData(){
    // load data
    d3.csv("WHR.csv", function(error, data) {
  // change string (from CSV) into number format
    data = data.filter(function(d){
        if (d.year==year){
            return true;
        }
        return false;
    });
    data.forEach(function(d) {
        d["Life Ladder"] = +d["Life Ladder"];
        d[comparisonColumn] = +d[comparisonColumn];
        //    console.log(d);
    });
        
     svg.selectAll(".dot").remove();
     d3.selectAll('.axis').remove();
    //rescale domain and range    
    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
    yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
    
    
         
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height/2) + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width/2)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Happiness Rating");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(comparisonColumn);

    // draw dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 7)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .style("fill", function(d) { return color;})// color(cValue(d));}) 
        .on("mouseover", function(d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(d["country"] + "<br/> (" + xValue(d) 
                     + ", " + yValue(d) + ")")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
    
    //add users point
    svg.append("circle")
        .attr("class","dot input")
        .attr("r",7)
        .attr("cx",xScale(inputHappiness))
        .attr("cy",yScale(inputComaparison))
        .attr("cy",yScale(inputComaparison))
        .style("fill", "#EB7F00")
        .on("mouseover", function(d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html("You" + "<br/> (" +inputHappiness.toString()+ ", " + inputComaparison + ")")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
    
    
});

}