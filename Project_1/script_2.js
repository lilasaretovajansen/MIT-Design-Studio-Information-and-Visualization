//plot2
var canvas2 = d3.select("#plot2").append("canvas").node();

canvas2.width = document.getElementById("plot2").clientWidth;
canvas2.height = document.getElementById("plot2").clientHeight;

var ctx2 = canvas2.getContext('2d');
ctx2.fillStyle  = "#fffac4";


ctx2.fillRect(0, 0, canvas2.width, canvas2.height);


function myCircle(){

	var centerX = canvas2.width/2;
	var centerY = canvas2.height/2;
	var radius = 0.35 * (canvas2.width/2)
	ctx2.strokeStyle =  "#4286f4";
	ctx2.strokeWidth = 2;
	ctx2.beginPath();
	ctx2.arc(centerX,centerY,radius , 0, 2*Math.PI);
	ctx2.closePath;
	ctx2.stroke();
}
myCircle();