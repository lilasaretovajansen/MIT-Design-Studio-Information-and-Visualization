//plot2
var canvas2 = d3.select("#plot2").append("canvas").node();
/*
canvas2.width = document.getElementById("plot2").clientWidth;
canvas2.height = document.getElementById("plot2").clientHeight;
*/
var widthCanvas2 = d3.select("#plot2").node().clientWidth;
var heightCanvas2 = d3.select("#plot2").node().clientHeight;

// get dimensions of canvas
// retina and new screens have very good resolutions. Canvases drawings might look a bit blurry in them.
// to avoid this problem we can scale the size of the canvas twice, and re-scale by using the real sizes
// this is not necessary
canvas2.width = 2 * widthCanvas2;
canvas2.height = 2 * heightCanvas2;
var ctx2 = canvas2.getContext('2d');
ctx2.fillStyle  = "#f4b342";

//ctx2.fillRect(0, 0, canvas2.width, canvas2.height);


// code to request the reload of the window --> we will use this to create animations
var requestAnimationFrame2 = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

window.cancelRequestAnimFrame2 = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

setInterval(drawCanvas2,1000);

function drawCanvas2(){


	// get current date and timing
    var date2 = new Date();
    var hour2 = date2.getHours();
    var minutes2 = date2.getMinutes();
    var seconds2= date2.getSeconds();

    if (hour2>12){
        ctx2.beginPath();
        ctx2.strokeStyle =  "#3e3f59";
        ctx2.strokeWidth = 2;
        ctx2.fillStyle  =  "#3e3f59";;
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    }

    else{
        ctx2.beginPath();
        ctx2.strokeStyle =  "f4b342";
        ctx2.strokeWidth = 2;
        ctx2.fillStyle  =  "f4b342";
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    }

    //hour
    hour2 = hour2 % 12;
    
    //hour2 = (hour2 * Math.PI / 6) + (minutes2 * Math.PI / (6 * 60)) + (seconds2 * Math.PI / (360 * 60));
    //drawHand(hour, radius * 0.5, 6, "#000000");
    
    //minute
    minutes2 = (minutes2 * Math.PI / 30) + (seconds2 * Math.PI / (30 * 60));

	//draw 12 circles
	radius = .08*(canvas1.width);
	for (column = 1; column < 5; column++) { 
    	for (row = 1; row<4; row++){
    		var x  = .25*row*canvas2.width ;
    		var y = .2*column*canvas2.height;
    		ctx2.beginPath();
    		ctx2.strokeWidth = 2;
    		ctx2.strokeStyle = "#d4d4d4";
    		ctx2.fillStyle = "#d4d4d4";
    		ctx2.arc(x, y, radius, 0, 2 * Math.PI);
    		ctx2.stroke();

    		if (hour2+1 >(column-1)*3 + row){
    			//throw new Error(hour2+ ","+column*3 + row);
    			ctx2.beginPath();
    			ctx2.arc(x, y, radius, 0, 2*Math.PI);
    			ctx2.fill();


    		}
    		else if (hour2+1==(column-1)*3 + row){
    			
    			ctx2.beginPath();
    			ctx2.moveTo(x,y);
    			ctx2.arc(x, y, radius, 0, minutes2);
    			ctx2.closePath();
    			ctx2.fill();
    		}
    		else{
    			
    			continue;
    		}

    		
    	}
    	//draw 

	}



}

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
