
//plot
var margin = {t: 5, r: 25, b: 20, l: 25}; //this is an object
var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;

// Append svg to div
var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);

// function to draw the map
var path = d3.geoPath();
// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "data/data.csv", parseData)
    .defer(d3.json, "data/us_map.json") //downloaded from https://d3js.org/us-10m.v1.json
    .await(dataloaded);

function dataloaded (err,data,map){
    console.log(data);
    console.log(map);
    var extentData = d3.extent(data,function(d){return d.total});
    var colorScale = d3.scaleLinear().domain(extentData).range(["#ffc5c0","#ab0405"]);
    //console.log(colorScale);
    // get max and min values of data

    // scale Color for the map

    // Bind the data to the SVG and create one path per GeoJSON feature
    plot1.selectAll(".state").data(topojson.feature(map,map.objects.states).features)
        .enter()
        .append('path')
        .attr("d",path)
        .attr("class","state")
        .style("fill",function(d){
            var color = "rgb(255,255,255)";
            var mapID = +d.id;
            data.forEach(function(e){
                if(e.id.toString() ===mapID.toString()){
                    color = colorScale(e.total);
                    console.log(color);
                    console.log("match");
                }
            });
            return color;
    });
    
}



// total: +d["Total; Estimate; Population 3 years and over enrolled in school"],
//     percentage: +d["Percent; Estimate; Population 3 years and over enrolled in school"]


function parseData(d){
    var id =(d.Id).split("US")[1];
    return{
        id: id,
        state:d.state,
        total:+d["Total; Estimate; Population 3 years and over enrolled in school"]
        
    }
}

function parsePopulation(d){
    var id;
    if (d.id !=""){
        id = (d.id).split("US")[1];
    }
    else{
        id = d+["Geographic Area"];
    }
    //var id =(d.Id).split("US")[1];
    populationPerState.set(id,{
        state:d["Geographic Area"],
        april2010:+d["April 1,2010, Census"],
        estimate2017:+d["Estimate 2017"]
    })
}