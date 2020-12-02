let root = document.getElementById('root');
root.className = 'container row mx-auto';
main();




async function getCountriesData(){
    let response = await fetch('https://restcountries.eu/rest/v2/all');
    let countriesData = await response.json();
    createDOM(countriesData);
}




function createDOM(countriesData){
    countriesData.forEach((country)=>{
        createcard(country.name, country.flag,country.capital, country.alpha2Code+","+country.alpha3Code, country.region, country.latlng.join(","))
    })
}


function createcard(country, flagUrl, capital, countryCodes, region, latLong){

    async function getWeather([lat, long]){
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d4de9a989817001b17091776b492bea1&units=metric`);
        weatherData = await weatherData.json()
        createModal(weatherData);
    }




    let card = document.createElement('div');
    card.className = "card border-dark p-0 col-md-4 col-sm-12"

    card.innerHTML=`<div class="card-header text-center">
                        ${country}
                    </div>
                    <img class="card-img-top" src="${flagUrl}" style="height: 50vh; object-fit:cover; "/>
                    <div class="card-body text-center text-dark">
                        <p class="card-text">Capital: <span class="badge badge-success">${capital}</span></p>
                        <p class="card-text">Country Codes: <span class="font-weight-bold">${countryCodes}</p>
                        <p class="card-text">Region: <span class="font-weight-bold">${region}</p>
                        <p class="card-text">Lat, Long: <span class="font-weight-bold">${latLong}</p>
                    </div>
                    <div class="card-footer border-0 text-center">
                        <button class="btn btn-primary" id="${country}">Click for Weather</button>
                    </div>`;
    root.appendChild(card);

    document.getElementById(`${country}`).addEventListener('click', ()=>{getWeather(latLong.split(','))});
}




function main(){
    getCountriesData();
}


function createModal(weatherData){

    console.log(weatherData);
    let popup = document.createElement('div');
    popup.className = 'popup-container';
    popup.style.display = 'flex';
    popup.setAttribute('id', 'popup-container');
    popup.innerHTML = `<div class="popup text-dark">
                            <h4 id="final-message">Weather in <span class="badge badge-success">${weatherData.name}</span></h4><hr>
                            <div class="main d-flex justify-content-around align-items-center mb-4">
                                <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">
                                <div><span class="font-weight-bold badge badge-info">${weatherData.weather[0].description}</span></div>
                            </div>
                            <div  class="d-flex justify-content-around align-items-center mb-3">
                                <span class="badge badge-secondary" style="width:65%">Temperature</span><span class="badge-primary badge" style="width:27%"> ${weatherData.main.temp} &#8451;</span>
                            </div>
                            <div  class="d-flex justify-content-around align-items-center mb-3">
                                <span class="badge badge-secondary" style="width:65%">Real Feel</span><span class="badge-primary badge" style="width:27%"> ${weatherData.main.feels_like} &#8451;</span>
                            </div>
                            <div  class="d-flex justify-content-around align-items-center mb-3">
                                <span class="badge badge-secondary" style="width:65%">Humidity</span><span class="badge-primary badge" style="width:27%"> ${weatherData.main.humidity} %</span>
                            </div>
                            <div  class="d-flex justify-content-around align-items-center mb-3">
                                <span class="badge badge-secondary" style="width:65%">Pressure</span><span class="badge-primary badge" style="width:27%"> ${weatherData.main.pressure} hPa</sup></span>
                            </div>
                            <div  class="d-flex justify-content-around align-items-center mb-3">
                                <span class="badge badge-secondary" style="width:65%">Wind</span><span class="badge-primary badge" style="width:27%"> ${weatherData.wind.speed} km/h</sup></span>
                            </div>
                            <hr>
                            <button id="close-button" class="btn btn-danger">close</button>
                        </div>`;
    document.querySelector('body').appendChild(popup);

    document.getElementById('close-button').addEventListener('click', ()=>{
        popup.remove();
    });

}