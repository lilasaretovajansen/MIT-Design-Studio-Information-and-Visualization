//plot1

var canvas1 = document.getElementById("plot1");

canvas1.width = 2*document.getElementById("plot1").clientWidth;
canvas1.height = 2*document.getElementById("plot1").clientHeight;
var canvas1RealWidth = document.getElementById("plot1").clientWidth;
var canvas1RealHeight = document.getElementById("plot1").clientHeight;

var ctx1 = canvas1.getContext("2d");

ctx1.fillStyle  = "#4286f4";

ctx1.fillRect(0, 0, canvas1.RealWidth, canvas1.RealHeight);

// code to request the reload of the window --> we will use this to create animations
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

// SKETCH 1
// center of the plot will be the center of our clock
var centerX = canvas1.width / 2;
var centerY = canvas1.height / 2;

//translate the center of the clock to the center of the plot
ctx1.translate(centerX, centerY);

//draw canvas 1

// in order to animate the clock we need to call the function in intervals
// in this case we will call it every second (1000 milliseconds)
ctx1.scale(2,2);
setInterval(drawCanvas1, 1000);


function drawCanvas1() {

    // outer radius of the clock
    var radius = 0.75 * (canvas1RealWidth / 2);
    

    // start drawing
    ctx1.beginPath();

    // determine style of the form
    ctx1.strokeStyle = "#d4d4d4";
    ctx1.strokeWidth = 2;
    ctx1.fillStyle  = "#4286f4";
    ctx1.fillRect(-canvas1.width, -canvas1.height, 2*canvas1.width, 2*canvas1.height);

    //ctx1.fillStyle = "white"; // to paint over the previous drawing

    // arc() draws arcs
    // it needs 5 inputs arc(x,y,radius,startAngle,endAngle)
    // to create circles the starting angle must be 0 and the end angle must be 2*Math.PI
    // because we have translated our canvas to the center; the center of the clock is 0,0
    ctx1.beginPath();
    ctx1.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx1.stroke();
    ctx1.fill();
    ctx1.beginPath();
    ctx1.arc(0, 0, radius*.75, 0, 2 * Math.PI);
    ctx1.stroke();
    ctx1.fill();
    ctx1.beginPath();
    ctx1.arc(0, 0, radius*.5, 0, 2 * Math.PI);
    // stroke your drawing
    ctx1.stroke();
    ctx1.fill();

    //end drawing
    ctx1.closePath();


    // get current date and timing
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minutes * Math.PI / (6 * 60)) + (seconds * Math.PI / (360 * 60));
    //drawHand(hour, radius * 0.5, 6, "#000000");
    drawPoint(hour,1,20,"#f45342")
    //minute
    minutes = (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60));
    //drawHand(minutes, radius * 0.8, 4, "#000000");
    drawPoint(minutes,.75,10,"#62ccef")
    // second
    seconds = (seconds * Math.PI /30);
    //drawHand(seconds, radius * 0.9, 1.5, "#42f462");
    drawPoint(seconds, 0.5, 6,"#42f462" );

    //
    function drawPoint(angle, distance, size, color){

		ctx1.beginPath();
    	var x  = radius*Math.cos(angle)*distance
    	var y = radius*Math.sin(angle)*distance
    	
    	ctx1.lineWidth = 1;
    	ctx1.strokeStyle = color;
    	ctx1.fillStyle = color;
    	ctx1.arc(x,y, size, 0, 2*Math.PI);
    	ctx1.stroke();
    	ctx1.fill();
    	ctx1.closePath();


    }

    //center circle
    ctx1.beginPath();
    ctx1.fillStyle = "#d4d4d4";
    ctx1.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.closePath();





    

    


}




