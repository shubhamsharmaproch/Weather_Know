const fetchDataBtn = document.querySelector("#fbtn");

const mapView = document.querySelector(".map");
const detailsData = document.querySelector(".data");
const locationData = document.querySelector(".locationData");
const api = "c498aad05e6a6363d0f2d7a03437d474";

async function getData(lat, long) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=current&appid=${api}`
  );
  return await promise.json();
}

async function gotLocation(position) {
  const result = await getData(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log(result);
  detailData(result);
}

function failedLocation() {
  console.log("There was Some issue");
}

fetchDataBtn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedLocation);
});

function removeDom() {
  document.querySelector(".first").remove();
}

function detailData(result) {
  removeDom();
  const url = `https://maps.google.com/maps/?q=${result.coord.lat},${result.coord.lon}&output=embed`;
  locationData.innerHTML = `
  <div class="top">
          <h1>Welcome To The Weather App</h1>
          <p>Here is your current location</p>
          <div class="latlong">
            <p>Lat:<span class="lat">${result.coord.lat}</span></p>
            <p>Long:<span class="long"> ${result.coord.lon}</span></p>
          </div>
          <div class="map" id="map">
          <iframe
          src=${url}
          width="360"
          height="270"
          frameborder="0"
          style="border:0;width: 90vw;
          height: 65vh;margin-top:3rem; border-radius:1rem"></iframe>
          </div>
        </div>
  <div class="down">
          <div>
            <h2>Your Weather Data</h2>
          </div>
          <div class="data">
          <p>Location:${result.name}</p>
            <p>Wind Speed:${result.wind.speed} kmph</span></p>
            <p>Humidity:${result.main.humidity}</p>
            <p>Time Zone:${result.timezone}</p>
            <p>Pressure:${result.main.pressure} bar</p>
            <p>Wind Direction:${result.wind.deg}</p>
            <p>Feels like:${result.main.feels_like}</p>
          </div>
        </div>
    `;
}