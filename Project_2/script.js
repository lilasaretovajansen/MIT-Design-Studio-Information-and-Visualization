//plots
var margin1 = {t:5, r: 40, b: 20, l: 30}; //this is an object
var width1 = d3.select('#mobile1').node().clientWidth - margin1.r - margin1.l,
    height1 = (d3.select('#mobile1').node().clientHeight / 2) - margin1.t - margin1.b;

var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width1 + margin1.l +margin1.r)
    .attr('height', height1 + margin1.t + margin1.b);





var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083';


d3.json("data/boston_weather.json",draw);

function draw(error,data){
    var todayWeather = data.hourly.data;
    var currentTemp = data.currently.apparentTemperature;
    var todayNow = new Date ().getTime()/1000;
    var tomorrow = new Date ().getTime()/1000 + 24 * 3600;
     var data24h = todayWeather.filter(function(d){
        return d.time >= todayNow && d.time <= tomorrow
    });
    
    d3.select("#temp").html( Math.round(currentTemp ) + "˚");

    
    var weekWeather = data.daily.data;
    var extentWeek = d3.extent(weekWeather,function(d){
        return new Date (d.time * 1000)
    });
    
    var maxHighTemp = d3.max(weekWeather,function(d){return d.temperatureHigh});
    var minLowTemp = d3.min(weekWeather,function(d){return d.temperatureMin});
    var meanWeekWeather = d3.mean(data24h,function(d){
        return d.temperature
    });
    // 2.3 create scales to put the data in the dom element
    var scaleX2 = d3.scaleTime().domain(extentWeek).range([0,width1]);
    var scaleY2 = d3.scaleLinear().domain([minLowTemp-5,maxHighTemp+5]).range([height1,0]);
    
    // 2.4 create groups to put the content inside them
    plot1.append('g').attr('transform', 'translate(' + margin1.l + ',' + margin1.t + ')').attr('class', 'axis axis-y');
    plot1.append('g').attr('transform', 'translate(' + margin1.l + ',' + (margin1.t+height1/2) + ')').attr('class', 'axis axis-x');
    plot1.append('g').attr('transform', 'translate(' + margin1.l   +',' +0+')').attr('class', 'weekWeather');
    
    var plotLines = plot1.select('.weekWeather')
        .append("g")
        .attr("class","lines");

        
    
     var formatWeek = d3.timeFormat("%a");//Weekday abreviation
    
    
    var axisWeekX = d3.axisBottom().scale(scaleX2).ticks(0).tickFormat([]);
    
    
    var axisWeekY = d3.axisLeft().scale(scaleY2).tickSizeInner(0).tickPadding([10]).ticks(3);
    
    plot1.select(".axis-x").call(axisWeekX);
    //plot1.select(".axis-y").call(axisWeekY);
    
   
    /*plot1.append('g').attr('class', 'axis').attr('transform', 'translate('+ margin1.l  +',' + ((height1) +margin1.t)  + ')').call(axisWeekX);*/
    
    
    plotLines
        .selectAll(".extent")
        .data(weekWeather) //select the data
        .enter()
        .append("line")
        .attr("class", "extent") // this is the same class that we have selected before
        .attr("x1",function(d) { return scaleX2(new Date (d.time*1000)); })
        .attr("x2",function(d) { return scaleX2(new Date (d.time*1000)); })
        .attr("y1",function(d) { return scaleY2(d.temperatureHigh); })
        .attr("y2",function(d) { return scaleY2(d.temperatureMin); });
    
    var plotCurrent = plot1.select('.weekWeather')
        .append("g")
        .attr("class","currentRect");

    
    plotCurrent
        .selectAll(".rects")
        .data([data.currently]) //select the data
        .enter()
        .append("rect")
        .attr("class", "rects") // this is the same class that we have selected before
        .attr("x",function(d) { return scaleX2(new Date (weekWeather[0].time*1000))-10})
        .attr("y",function(d) { return scaleY2(d.temperature); })
        .attr("width",20)
        .attr("height",4)
    
    /*plot1.append("circle")
        .attr("class","now")
        .attr("r", 100)
        .attr("cx", scaleX2(new Date(data.currently.time)))
        .attr("cy", scaleY2(currentTemp));*/


}
//Translate time data to a date object
function getDate(time){
    return new Date (time * 1000);
}