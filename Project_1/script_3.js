//plot2
var canvas3 = d3.select("#plot3").append("canvas").node();

canvas3.width = document.getElementById("plot3").clientWidth;
canvas3.height = document.getElementById("plot3").clientHeight;

var ctx3 = canvas3.getContext('2d');
ctx3.fillStyle  = "#fffac4";


ctx3.fillRect(0, 0, canvas2.width, canvas2.height);


function myCircle3(){

	var centerX3 = canvas3.width/2;
	var centerY3 = canvas3.height/2;
	var radius = 0.35 * (canvas3.width/2)
	ctx3.strokeStyle =  "#4286f4";
	ctx3.strokeWidth = 2;
	ctx3.beginPath();
	ctx3.arc(centerX3,centerY3,radius , 0, 2*Math.PI);
	ctx3.closePath;
	ctx3.stroke();
}
myCircle3();