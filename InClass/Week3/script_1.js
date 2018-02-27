// array of data
var data = [{year: 2004, fruit: 309},{year:2005,fruit:295},{year:2006,fruit:294},{year:2007,fruit:303},{year:2008,fruit:310},{year:2009,fruit:315},
    {year:2010,fruit:311},{year:2011,fruit:309},{year:2012,fruit:308},{year:2013,fruit:303},{year:2014,fruit:296}];


//TODO plot 1 bar chart
//margins, width and height
var margin1 = {t: 5, r: 25, b: 20, l: 25};
var width1 = d3.select('#plot1').node().clientWidth - margin1.r - margin1.l,
    height1 = d3.select('#plot1').node().clientHeight - margin1.t - margin1.b;

//append svg
var plot1 = d3.select("#plot1").append("svg").attr("width",width1+margin1.l+margin1.r).attr('height', height1 + margin1.t + margin1.b);


// 2 get the minimum and maximum values
var maxFruit = d3.max(data,function(d){return d.fruit});
var minFruit = d3.min(data,function(d){return d.fruit});

// scales to position our bars
// and to give them height
// d3 scales are translation of values into other values
// more information at https://github.com/d3/d3-scale

// 1 map (get an array) all the years in the original array
var mapYears = data.map(function(d){return d.year})


// scaleX
var scaleXPlot1 = d3.scaleBand().domain(mapYears).range([0,width1]).padding(0.2);;

// scaleY
var scaleYPlot1 = d3.scaleLinear().domain([0,maxFruit]).rangeRound([height1, 0]);

//create groups to put the content inside them
plot1.append('g').attr('transform', 'translate(' + margin1.l + ',' + margin1.t + ')').attr('class', 'axis axis-y');
plot1.append('g').attr('transform', 'translate(' + margin1.l + ',' + (margin1.t+height1) + ')').attr('class', 'axis axis-x');
plot1.append('g').attr('transform', 'translate(' + margin1.l + ',' + margin1.t + ')').attr('class', 'bars');

//AXIS
var axisBarChartX = d3.axisBottom().scale(scaleXPlot1).ticks(),
    axisBarChartY = d3.axisLeft().scale(scaleYPlot1).tickSizeInner(-width1).tickPadding([5]).ticks(3);

plot1.select(".axis-x").call(axisBarChartX);
plot1.select(".axis-y").call(axisBarChartY);


//bars
plot1.select('.bars')
    .selectAll(".barsFruit") //select a Bar that we will create in a few steps
    .data(data) //select the data
    .enter() //input the data
    .append("rect")
    .attr("class", "barsFruit") // this is the same class that we have selected before
    .attr("x", function(d) { return scaleXPlot1(d.year); })
    .attr("y", function(d) { return scaleYPlot1(d.fruit); })
    .attr("width", scaleXPlot1.bandwidth())
    .attr("height", function(d) { return (height1 - scaleYPlot1(d.fruit)) })
    .style("fill","#a3dae3");




///TODO plot 2

//plot bar chart
//margins, width and height


//append svg




// parse data with d3.csv



//function draw

    // 1 map (get an array) all the years in the original array


    // scaleX


    // 2 get the minimum and maximum values


    //scaleY


    //functions to create the lines

    //create groups to put the content inside them


    //AXIS



    // fruits





    // veggies


