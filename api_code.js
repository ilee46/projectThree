// // what is an api?
//     // webpage -> access database -> display the results

// // anatomy of an api call

//     // api request
//         // request type: GET, POST
//         // api url
//         // params
//         // key

//     // api response
//         // JSON
//         // https://www.google.com/search?q=json&client=firefox-b-1-d&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjSm7-X98H7AhWpLUQIHaqaADQQ_AUoAXoECAIQAw&biw=1536&bih=711&dpr=1.25#imgrc=MQ70IxKRTe-bUM


// // example api calls
// // 1.) https://openweathermap.org/api
// // 2.) https://api.nasa.gov/
// // 3.) https://developers.google.com/maps/documentation/javascript/streetview#maps_streetview_simple-javascript
// // 5.) https://newsapi.org/


// // open weather api demo

// // Step 1.) GET API KEY 
//         // go to https://openweathermap.org/api and follow sign up instructions 
//         // Make a new key and head over to the api documentation @ https://openweathermap.org/current
//         // add jquery cdn to html file url @ https://cdnjs.com/libraries/jquery 
//         // load this script into html as well

// // Step 2.) Build your paramaters based on the api documentation
//         url = "https://api.openweathermap.org/data/2.5/weather"
//         key = "77cc58b950a86912372c32289920f6c2"
//         // Get lat and long from google https://www.google.com/search?client=firefox-b-1-d&q=lat+lon+of+chicago
//         lat = "41.8781"
//         lon = "-87.6298" //use negative for west

//         params = {"lat": lat,
//                     "lon": lon,
//                     "appid": key
//                     }


// // Step 3.) Build your paramaters based on the api documentation    
//     function makeApiCall(){
//         $.ajax({
//             url: url,
//             type: "GET",
//             data: params,
//             success: function(resp){
//                 console.log(resp);
//             },
//             error: function(error){
//                 console.log(error)
//             }
//         });
//     }

//     // https://api.openweathermap.org/data/2.5/weather?lat=41.8781&lon=-87.6298&appid=6895f508d6b179d3b88d1cda4bcf0898





// // Step 4.) Build a function to parse the response for the data you want     
  

//     url = "https://api.openweathermap.org/data/2.5/weather?"
//     weatherKey = "77cc58b950a86912372c32289920f6c2"
//     lat = "41.8781"
//     lon = "-87.6298" //use negative for west
//     weatherParams = {"lat": lat,
//                         "lon": lon,
//                         "units": "metric", //units taken from api documentation
//                         "appid": weatherKey
//                         }
    
    
//     function parseWeather(resp){
//     // index into the JSON resp as dictionary to get the individual pieces of data 
//         temp = resp["main"]["temp"]
//         windSpeed = resp["wind"]["speed"]
//         description = resp["weather"][0]["description"]
//         // make sure the data is a number(type float) not a string
//         // console.log(typeof temp)
//         // console.log(typeof windSpeed)
//         console.log(`description = ${description}\n temp in farinheight = ${temp}\n wind speed in mph = ${windSpeed}`)
//     }
    
    
//     function makeApiCall(){
//         $.ajax({
//             url: url,
//             type: "GET",
//             data: weatherParams,
//             success: function(respObj){
//                 console.log(respObj)
//                 parseWeather(respObj);
//             },
//             error: function(error){
//                 console.log(error)
//             }
//         });
//     }










// // Step 5.) Build a function to use the parsed response data in your website     
//     url = "https://api.openweathermap.org/data/2.5/weather?"
//     weatherKey = "77cc58b950a86912372c32289920f6c2"
//     lat = "41.8781"
//     lon = "-87.6298" 
//     weatherParams = {"lat": lat,
//                         "lon": lon,
//                         "units": "metric",
//                         "appid": weatherKey
//                         }


//     function parseWeather(resp){
//         temp = resp["main"]["temp"]
//         windSpeed = resp["wind"]["speed"]
//         console.log(`temp in farinheight = ${temp}\n wind speed in mph = ${windSpeed}`)
//         return [temp, windSpeed];
//     }

//     // This function takes an input number and an input range and returns the corresponding number mapped to a new range
//     function scaleProperly(number, inMin, inMax, outMin, outMax) {
//         return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
//     }

//     function changeDisplay(resp){
//         let [temp, windSpeed] = parseWeather(resp);

//         // windSpeed will be related to the height of a rectangle
//         // temp will be the color of that rectangle
//         // to do this we will make a grid element and set the size
//         let newOBJ = document.createElement("div");
        
//         // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
//         properTemp = scaleProperly(temp, 0, 100, 0, 255); 
//         properWindspeed = scaleProperly(windSpeed,0,8,0,100)
        
//         newOBJ.style.backgroundColor = `rgb(${properTemp},50,50)`;
//         newOBJ.style.height = `${properWindspeed}px`
//         newOBJ.style.width = '100px'
      
//         const drawingArea = document.getElementById('drawingArea');
//         drawingArea.appendChild(newOBJ);

//     }

//     function makeApiCall(){
//         $.ajax({
//             url: url,
//             type: "GET",
//             data: weatherParams,
//             success: function(respObj){
//                 console.log(respObj)
//                 changeDisplay(respObj);
//             },
//             error: function(error){
//                 console.log(error)
//             }
//         });
//     }

// Step 6.) Step 5 worked alright but I want more variation in my  output. 

// So I'm going to add a button that will add numbers to the longitude and latitude for the api call
    
//     I will start by initializing an item "lon" & "lat" at my starting point in the session memory
//     and make sure to run that funciton on start up in my index
    
function initializeLonLat(){
    startLongitude = -87.6298;
    startLattitude = 41.8781;
    sessionStorage.setItem("lon", startLongitude); 
    sessionStorage.setItem("lat", startLattitude); 
}

function addLongitude(number){
    previousLon = parseFloat(sessionStorage.getItem("lon"))
    newLon = previousLon + number;
    sessionStorage.setItem("lon", newLon);
    console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
}

function subLongitude(number){
    previousLon = parseFloat(sessionStorage.getItem("lon"))
    newLon = previousLon - number;
    sessionStorage.setItem("lon", newLon);
    console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
}

function addLat(number){
    previousLon = parseFloat(sessionStorage.getItem("lat"))
    newLat = previousLon + number;
    sessionStorage.setItem("lat", newLat);
    console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
}

function subLat(number){
    previousLon = parseFloat(sessionStorage.getItem("lat"))
    newLat = previousLon - number;
    sessionStorage.setItem("lat", newLat);
    console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
}


function parseWeather(resp){
    temp = resp["main"]["temp"]
    windSpeed = resp["wind"]["speed"]
    clouds = resp["clouds"]["all"]
    humidity = resp["main"]["humidity"]
    console.log(`temp in celsius = ${temp}\n wind speed in m/s = ${windSpeed}\n clouds = ${clouds}\n humidity = ${humidity}%`)
    return [temp, windSpeed, clouds, humidity];
}

function scaleProperly(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function changeDisplay(resp){
    let [temp, windSpeed] = parseWeather(resp);

    // windSpeed will be related to the height of a rectangle
    // temp will be the color of that rectangle
    // to do this we will make a grid element and set the size
    let newOBJ = document.createElement("div");
    
    // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
    properTemp = scaleProperly(temp, -50, 50, 0, 255); 
    properWindspeed = scaleProperly(windSpeed,0,8,0,100)

    newOBJ.style.backgroundColor = `rgb(${properTemp},50,50)`;
    newOBJ.style.height = `${properWindspeed}px`
    newOBJ.style.width = '100px'
  
    const drawingArea = document.getElementById('drawingArea');
    drawingArea.appendChild(newOBJ);

}


function makeApiCall(){

    url = "https://api.openweathermap.org/data/2.5/weather?"
    weatherKey = "77cc58b950a86912372c32289920f6c2"
    lat = sessionStorage.getItem("lat") 
    lon = sessionStorage.getItem("lon") 
    weatherParams = {"lat": lat,
                        "lon": lon,
                        "units": "metric",
                        "appid": weatherKey
                        }
    console.log(weatherParams)


    $.ajax({
        url: url,
        type: "GET",
        data: weatherParams,
        success: function(resp){
            console.log(resp)
            let [temp, windSpeed, clouds, humidity] = parseWeather(resp);
            if (temp < -25) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 53);
                }
            } else if (temp < -10) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 45);
                }
            } else if (temp < 0) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 41);
                }
            } else if (temp < 5) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 33);
                }
            } else if (temp < 10) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 123);
                }
            } else if (temp < 20) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 21);
                }
            } else if (temp < 25) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 13);
                }
            } else if (temp < 30) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 9);
                }
            } else if (temp < 40) {
                for (i = 52; i < 68; i++) {
                    colorM(i, 5);
                }
            } else {
                for (i = 52; i < 68; i++) {
                    colorM(i, 59);
                }
            }

            if (windSpeed < 2) {
                for (i = 84; i < 100; i++) {
                    colorM(i, 21);
                }
            } else if (windSpeed < 5) {
                for (i = 84; i < 100; i++) {
                    colorM(i, 25);
                }
            } else if (windSpeed < 8) {
                for (i = 84; i < 100; i++) {
                    colorM(i, 15);
                }
            } else if (windSpeed < 12) {
                for (i = 84; i < 100; i++) {
                    colorM(i, 13);
                }
            } else if (windSpeed < 18) {
                for (i = 84; i < 100; i++) {
                    colorM(i, 9);
                }
            } else {
                for (i = 84; i < 100; i++) {
                    colorM(i, 72);
                }
            }

            if (clouds < 33) {
                for (i = 36; i < 52; i++) {
                    colorM(i, 3);
                }
            } else if (clouds < 66) {
                for (i = 36; i < 52; i++) {
                    colorM(i, 2);
                }
            } else {
                for (i = 36; i < 52; i++) {
                    colorM(i, 1);
                }
            }

            if (humidity < 50) {
                for (i = 68; i < 84; i++) {
                    colorM(i, 83);
                }
            } else if (humidity < 60) {
                for (i = 68; i < 84; i++) {
                    colorM(i, 84);
                }
            } else if (humidity < 75) {
                for (i = 68; i < 84; i++) {
                    colorM(i, 74);
                }
            } else if (humidity < 100) {
                for (i = 68; i < 84; i++) {
                    colorM(i, 79);
                }
            }
        },
        error: function(error){
            console.log(error)
        }
    });
}