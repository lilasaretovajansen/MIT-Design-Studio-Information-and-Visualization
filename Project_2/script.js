//plots
var weatherData;
$.ajax({
  url: 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083',
  dataType: 'JSONP',
  type: 'GET',
  crossDomain: true,
  complete: function (data) {
    if (data.readyState == '4' && data.status == '200') {
      console.log(data.responseJSON)
      //weatherData = data.responseJSON;
      draw(data.responseJSON);
      //console.log(data.responseJSON);
      //weatherData=data.responseJSON;
    } else {
      console.log("DATA FETCH FAILED")
      d3.json("data/boston_weather.json",draw);
    }
  }
})


var margin1 = {t:5, r: 40, b: 0, l: 30}; //this is an object
var width1 = d3.select('#mobile1').node().clientWidth - margin1.r - margin1.l,
    height1 = (d3.select('#mobile1').node().clientHeight *.7) - margin1.t - margin1.b;

var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width1 + margin1.l +margin1.r)
    .attr('height', height1 + margin1.t + margin1.b);





var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083';


//d3.json("data/boston_weather.json",draw);
//d3.json("data/boston_weather.json",draw);

//function draw(error,data){
function draw(data){
    
    var todayWeather = data.hourly.data;
    var currentTemp = data.currently.apparentTemperature;
    var todayNow = new Date ().getTime()/1000;
    var tomorrow = new Date ().getTime()/1000 + 24 * 3600;
     var data24h = todayWeather.filter(function(d){
        return d.time >= todayNow && d.time <= tomorrow
    });
    
    var increasing = (todayWeather[0].temperature >=todayWeather[1].temperature);
    
    if (increasing){

        d3.select("#tempDirection").attr("src","upload.png");
        
        
    }
    else{
        d3.select("#tempDirection").attr("src","download.png");
        
    }
     if (increasing){

        d3.select("#arrow2").attr("src","upload.png");
        
        
    }
    else{
        d3.select("#arrow2").attr("src","download.png");
        
    }
    
    d3.select("#temp").html( Math.round(currentTemp ) + "˚");
    
    d3.select("#headerTemp").html( Math.round(currentTemp ) + "˚");
    d3.select("#summary").html(todayWeather[0].summary);
    
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
//icons:
    var iconDict = {"clear-day": "016-sun.png"
        ,"clear-night":"004-moon.png"
        , "rain": "010-raining.png"
        , "snow": "002-temperature-1.png"
        , "sleet":"007-umbrella-1.png"
        , "wind":"013-wind.png"
        , "fog":"015-cloud.png"
        , "cloudy":"015-cloud.png"
        , "partly-cloudy-day":"011-cloudy-1.png"
        , "partly-cloudy-night":"011-cloudy-1.png"
        
    }
    
   
    var icon = todayWeather[0].icon;
    var src = "icons/png/" +iconDict[icon];
    d3.select("#weatherIcon").attr("src",src);
    
    var formatTime = d3.timeFormat("%I:%M");
    var time = formatTime(todayNow);
    d3.select("#time").html(time);
    
    var windDirection = todayWeather[0].windBearing
    if (windDirection){
        console.log("windy");
        d3.select("#weatherIcon").attr("transform", "rotateY(360deg)");
    }
    var weeklyIcons = document.getElementById("weeklyIcons");
    for (i = 0;i < 7; i++){
        var icon = todayWeather[i].icon;
        var src = "icons/png/" +iconDict[icon];
        var img = document.createElement("img");
        img.src = src;
        
        weeklyIcons.appendChild(img);
    }
    
     var iconDict2 = {"clear-day": "021-sun.png"
        ,"clear-night":"021-sun.png"
        , "rain": "021-rain-2.png"
        , "snow": "021-snowflake.png"
        , "sleet":"021-snowing-1.png"
        , "wind":"021-tornado.png"
        , "fog":"021-cloud.png"
        , "cloudy":"021-cloud.png"
        , "partly-cloudy-day":"021-cloudy-1.png"
        , "partly-cloudy-night":"021-night-1.png"
        
    }
    var weeklyIcons1 = document.getElementById("weeklyIcons1");
    for (i = 0;i < 8; i++){
        var icon = todayWeather[i].icon;
        var src = "icons2/png/" +iconDict2[icon];
        var img = document.createElement("img");
        img.src = src;
        weeklyIcons1.appendChild(img);
    }
     
}
//Translate time data to a date object
function getDate(time){
    return new Date (time * 1000);
}