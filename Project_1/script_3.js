//plot2
var canvas3 = d3.select("#plot3").append("canvas").node();

var widthCanvas3 = d3.select("#plot3").node().clientWidth;
var heightCanvas3 = d3.select("#plot3").node().clientHeight;

// get dimensions of canvas
// retina and new screens have very good resolutions. Canvases drawings might look a bit blurry in them.
// to avoid this problem we can scale the size of the canvas twice, and re-scale by using the real sizes
// this is not necessary
canvas3.width = 2 * widthCanvas3;
canvas3.height = 2 * heightCanvas3;

var ctx3 = canvas3.getContext('2d');
ctx3.fillStyle  = "#fffac4";


ctx3.fillRect(0, 0, canvas3.width, canvas3.height);


// code to request the reload of the window --> we will use this to create animations
var requestAnimationFrame3 = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

window.cancelRequestAnimFrame3 = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

setInterval(drawCanvas3,1000);

function drawCanvas3(){
	ctx3.beginPath();
	ctx3.strokeStyle =  "#fffac4";
    ctx3.strokeWidth = 2;
    ctx3.fillStyle  =  "#fffac4";;
    ctx3.fillRect(-canvas3.width, -canvas3.height, 2*canvas3.width, 2*canvas3.height);
	// get current date and timing
    var date3 = new Date();
    var hour3 = date3.getHours();
    var minutes3 = date3.getMinutes();
    var seconds3= date3.getSeconds();
    var topcornerx = .1*canvas3.width;
    var rectwidth = .8*canvas3.width;




    //draw hours main rectangle:
    var houry = .1*canvas3.height;
    var hourheight = .3*canvas3.height;
    ctx3.beginPath();
    ctx3.strokeWidth = 2;
    ctx3.strokeStyle = "#f44141";
    ctx3.fillStyle = "#f44141";
    ctx3.rect(topcornerx,houry,rectwidth,hourheight);
    ctx3.stroke();

    //fill hours

    var hper = hour3/24;
    ctx3.beginPath();
    ctx3.strokeWidth = 2;
    ctx3.strokeStyle = "#f44141";
    ctx3.fillStyle = "#f44141";
    ctx3.rect(topcornerx,houry,rectwidth*hper,hourheight);
    ctx3.fill();


    //draw minutes main rectangle:
    var miny = .5*canvas3.height;
    var minheight = .2*canvas3.height;
    ctx3.beginPath();
    ctx3.strokeWidth = 2;
    ctx3.strokeStyle = "#41d6f4";
    ctx3.fillStyle = "#41d6f4";
    ctx3.rect(topcornerx,miny,rectwidth,minheight);
    ctx3.stroke();

    //fill min:

    var mper = minutes3/60;
    ctx3.beginPath();
    ctx3.strokeWidth = 2;
    ctx3.strokeStyle = "#41d6f4";
    ctx3.fillStyle = "#41d6f4";
    ctx3.rect(topcornerx,miny,rectwidth*mper,minheight);
    ctx3.fill();




    //draw seconds main rectangle:
    var secy = .8*canvas3.height;
    var secheight = .1*canvas3.height;
    ctx3.beginPath();
    ctx3.strokeWidth = 2;
    ctx3.strokeStyle = "#43f441";
    ctx3.fillStyle = "#43f441";
    ctx3.rect(topcornerx,secy,rectwidth,secheight);
    ctx3.stroke();

    //fill sec:
    var sper = seconds3/60;
    ctx3.beginPath();
    ctx3.strokeWidth = 2;
    ctx3.strokeStyle = "#43f441";
    ctx3.fillStyle = "#43f441";
    ctx3.rect(topcornerx,secy,rectwidth*sper,secheight);
    ctx3.fill();




}

