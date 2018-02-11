//Select #date and write the current date
// write it in an standard format
var date = new Date();

document.getElementById("date").innerHTML = date.toDateString();






// select #time and write the current time
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

var time = hour + ":" + minute + ":"+ second ;

document.getElementById("time").innerHTML = time;







//select #year and write your birth year

var myBirthday = new Date("20 June 1997");



document.getElementById("year").innerHTML = myBirthday.toDateString();





// select #difference and write how many days are left until your next birthday


// round the number to remove the decimals
