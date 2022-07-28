//jshint esversion:6
const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extented:true}));

function Report(city,icon,temp,description){
    this.city=city;
    this.icon=icon;
    this.temp=temp;
    this.description=description;
}


app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(request,answer){
    var cityName= request.body.place;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units=metric&appid=7ef75997f38f1f31696cf90476d4ab77"
    https.get(url,function(response){
        response.on("data",function(data){
            var w = JSON.parse(data);
            var weatherData  = new Report(w.name,w.weather[0].icon,w.main.temp,w.weather[0].description);
            var imageUrl=  "http://openweathermap.org/img/wn/"+ weatherData.icon +"@2x.png"
            //$("h1").text("Weather report of today in "+weatherData.name+" having temperature of "+weatherData.temp+"in degree celcius.")
            answer.write("<h1> The  Temperature in "+weatherData.city + " is "+weatherData.temp+" degree celcius.</h1>");
            answer.write("<p>"+weatherData.description+"</p>");
            answer.write("<img src="+imageUrl+"> ");
        });
    });
});

//converting object to string using JSON.stringify();
// function Objects(fruit,color){
//     this.fruit=fruit;
//     this.color=color;
// }

// var object1= new Objects("apple","red");
// var o2= new Objects("grapes","green");


//JSON.stringify(o2);

app.listen(3000,function(){
    console.log("runnig for application programming interface");
    // console.log(JSON.stringify(object1));
    // console.log(o2);
});