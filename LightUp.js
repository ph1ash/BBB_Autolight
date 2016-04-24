var b = require('bonescript');
var net = require('net');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var relay1 = "P9_11";
var relay2 = "P9_12";

var onTime = 8;
var endTime = 19;

var cityId = "1263012"; // Mirialguda, India
var openWeatherApiId = "ee3f3b74571c87be2297e528f4074376";
var openWeatherApiVersion = "2.5";

b.pinMode(relay1,b.OUTPUT);
b.pinMode(relay2,b.OUTPUT);

var state = true;

function getSunriseSunset()
{
    var urlAddr = 'http://api.openweathermap.org/data/' + openWeatherApiVersion + '/weather?id=' + cityId + '&APPID=' + openWeatherApiId;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', urlAddr, false);
    xmlHttp.send( null );
    //console.log (xmlHttp.responseText);
    var obj = JSON.parse(xmlHttp.responseText);
    
    console.log(obj);
    
    console.log(obj.sys.sunrise);
    console.log(obj.sys.sunset);
    
    var d3 = new Date(0); // The 0 there is the key, which sets the date to the epoch
    var d4 = new Date(0); // The 0 there is the key, which sets the date to the epoch
    
    d3.setUTCSeconds(obj.sys.sunrise);
    d4.setUTCSeconds(obj.sys.sunset);
    
    console.log(d3);
    console.log(d4);
    
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(obj.sys.sunrise);
    var sunriseHr = d.getHours();
    if((sunriseHr+10) >= 24)
    {
        sunriseHr = (sunriseHr + 10) - 24;
    }
    //console.log('Sunrise : ' + sunriseHr);
    var d2 = new Date(0);
    d2.setUTCSeconds(obj.sys.sunset);
    var sunsetHr = d2.getHours();
    if((sunsetHr+10) >= 24)
    {
        sunsetHr = (sunsetHr + 10) - 24;
    }
    //console.log('Sunset : ' + sunsetHr);
    
}

setInterval(function()
{
    getSunriseSunset();
    
    var d = new Date();
    var hours = d.getHours();
    
    if (((hours >= onTime) && (hours < endTime)) && (state == false)) // Turn on lights
    {
        b.digitalWrite(relay1,b.LOW);
        console.log("Turning Lights On");
        state = true;
    }
    else if(((hours >= endTime) || (hours < onTime)) && (state == true)) // Turn off lights
    {
        b.digitalWrite(relay1,b.HIGH);
        console.log("Turning Lights Off");
        state = false;
    }
    
    console.log(d);
    console.log( state ? "Lights on" : "Lights off");
    
    
},30000);
