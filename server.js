const express = require("express");
const app = express();
const  http = require("http");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    console.log("page loaded")
})

app.post("/",function(req,res){
    let city = req.body.city;
    let url = `http://api.weatherapi.com/v1/current.json?key=29e3bb3c142f40f7997144326232503&q=${city}&aqi=no`;
    http.get(url,function(response){
        response.on("data",function(data){
            try{       
                const weatherData = JSON.parse(data);
                const temp = weatherData.current.temp_c;
                res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Weather App</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
                </head>
                <body class="bg-secondary">
                    <section class="container mt-3 pt-3 border border-dark jumbotron">
                        <h1 class="text-center">Weather App</h1>
                        <form action="/" method="post">
                            <select name="city" id="selectionList" class="form-control">
                                <option value="">----Please Select a City -----</option>
                                <option value="surat">Surat</option>
                                <option value="new delhi">Delhi</option>
                                <option value="srinagar">Srinagar</option>
                                <option value="kohima">Kohima</option>
                                <option value="port blair">Port Blair</option>
                                <option value="chennai">Chennai</option>
                                <option value="gorakhpur">Gorakhpur</option>
                                <option value="bangalore">Bangalore</option>
                                <option value="pune">Pune</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="lucknow">Lucknow</option>
                                <option value="dibrugarh">Dibrugarh</option>
                                <option value="moscow">Moscow</option>
                            </select>
                            <button type="submit" class="btn btn-warning m-3 btn-block">Submit</button>
                    </form>
                    </section>
                    <section class="container border border-dark jumbotron pt-3 mt-1" id="display">
                        <h1>Temperature is ${temp} <sup>O</sup> Celcius.</h1>
                        <h2>It Seems to be ${weatherData.current.condition.text} . <img src="${weatherData.current.condition.icon}"/></h2>
                    </section>
                    <script>
                        document.getElementById("selectionList").value="${city}";
                    </script>
                </body>
                
                </html>
                `);
            }
            catch(err){
                res.write("<p class='display-2'>Data Not Found..!!</p>");
            }
            finally{
                res.send()
            }
        })
    })
})

app.listen(5000,function(req,res){
    console.log("Server started on port 5000.");
})