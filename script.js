let fetchbtn = document.getElementById("fetch-btn")
const Apikey = "1a30c9937583a6913d3119c0f4e7631f";
const weatherdata = document.getElementById("weather");

function fetchLocation() {
    weatherdata.innerHTML="";
  let lat;
  let long;
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    renderlocation(lat, long);
    weather(lat, long);
  }
  function error(err) {
    if (err.code === 1) throw new Error("geolocation-permission_denied");
    if (err.code === 2) throw new Error("geolocation-unavailable");
    if (err.code === 3) throw new Error("geolocation-timeout");
  }
}

function renderlocation(lat, long) {

  let topelement = document.createElement("div");
  topelement.className = "top";
  topelement.innerHTML = `
     <h1>Welcome To The Weather App</h1>
     <p>Here is your current location</p>
     <div>
       <span>Lat : ${lat}</span>
       <span>Long : ${long}</span>
   </div>
   <div class="map-container">
       <!-- <img src="asset/Screenshot 2022-12-14 at 7.18 1.svg" alt="map"> -->
       <iframe src="https://maps.google.com/maps?q=${lat},  ${long}&z=15&output=embed" style="width:90vw;  height:40vw;" frameborder="0" style="border:0"></iframe>
   </div>`;

  weatherdata.appendChild(topelement);
  console.log(2344);
}

function renderWeatherData(data) {
  const bottomelement = document.createElement("div");
  bottomelement.className = "bottom";
  bottomelement.innerHTML = `<h1>Your Weather Data</h1>
    <div>
        <span>Location : ${data.name}</span>
        <span>Wind Speed : ${Math.floor((data.wind.speed)*3.6)}kmph</span>
        <span>Humidity : ${(data.main.humidity)}</span>
        <span>Time one : GMT +${Number(data.timezone)/3600}</span>
        <span>Pressure : ${Math.ceil((data.main.pressure)*0.0009869233)}atm</span>
        <span>Wind direction : North West</span>
        <span>UV Index : 500</span>
        <span>Feels like : ${data.main.feels_like}°</span>

    </div>`;
  weatherdata.appendChild(bottomelement);
}


async function weather(lat, long) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${Apikey}&units=metric`);
        const data = await response.json();
         renderWeatherData(data);
      }
      catch(error){
        console.log(`An error occured : ${error}`)
      }
  
}
 
fetchbtn.addEventListener("click",()=>{
   
    
    fetchLocation();

   
    
});