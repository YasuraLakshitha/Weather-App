const date = new Date();

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
let day = days[date.getDay()];
let current_Date_time = day+","+date.getHours()+"."+date.getMinutes();

let currentDay = document.querySelector('.date-time');
let locationInput = document.querySelector('.location-text');
let btnSearch = document.querySelector('.btn-search');
let locationDisplay = document.querySelector('.location-country');
let temprature = document.querySelector(".temp");
let cloudCondition = document.querySelector(".cloud-condition");
let rain = document.querySelector(".rain-percentage");
let windSpeed = document.querySelector(".wind-speed-text");
let uvValue = document.querySelector(".uv-value");
let uvStatus = document.querySelector(".uv-status");
let airQuality = document.querySelector(".air-quality-value");
let airStatus = document.querySelector(".air-status");
let visibility = document.querySelector(".visibility-value");
let humidity = document.querySelector(".humidity-value");
let humidityStatus = document.querySelector(".humidity-status");
let moonRiseMoonSet = document.querySelector(".moonrise-moonset-value");
let sunRiseSunSet = document.querySelector(".sunrise-sunset-value");
let currentCondition = document.querySelector(".current-condition");
let imageTop = document.querySelector(".image-condition");
let customeTime = document.querySelector(".time-selection");
let customDay = document.querySelector(".btn-day-selection");
let visibilityStatus = document.querySelector(".visibility-status");
let moonSetStauts = document.querySelector(".moonrise-moonsets-status");
let sunSetStatus = document.querySelector(".sunrise-sunset-status");
let btnCel = document.querySelector(".btnC");
let btnFar = document.querySelector(".btnF");


currentDay.innerHTML = current_Date_time;
locationInput.value = "London"
let celValue = true;
let farValue = false;

let setHourlyDetails= (element) =>{
    let i = 0;
    let j=0;
    document.querySelectorAll(".condition-today").forEach(data=>{
        data.innerHTML = element.forecast.forecastday[0].hour[i++].condition.text;
    })

    document.querySelectorAll(".condition-today-image").forEach(data=>{
        data.src = element.forecast.forecastday[0].hour[j++].condition.icon;
    })
}





let displayDetails = location => {
   fetch(`http://api.weatherapi.com/v1/forecast.json?key=6e28fc65e3544c07b9a25859242703&q=${location}&aqi=yes`)
    .then(res=>res.json())
    .then(element=>{
        currentCondition.innerHTML = element.current.condition.text;
        locationDisplay.innerHTML = element.location.name+" , "+element.location.country; 
        temprature.innerHTML =celValue? element.current.temp_c+"°C":element.current.temp_f+"°F";
        cloudCondition.innerHTML = "perc - "+element.current.cloud+"%";
        rain.innerHTML = "perc - "+element.current.precip_mm+" %";
        windSpeed.innerHTML = "speed - "+element.current.wind_kph+" kmh";
        uvValue.innerHTML = element.current.uv;
        uvStatus.innerHTML = uvValue>7 ? "Very High": uvValue>5?"High":uvValue>4 ?"Moderate":"Low";
        visibility.innerHTML = element.current.vis_km;
        visibilityStatus.innerHTML = element.current.vis_km>16?"Excellent": element.current.vis_km>8?"Good":element.current.vis_km>3?"Moderate":element.current.vis_km>1?"Poor":"Very Poor";
        humidity.innerHTML = element.current.humidity+"%";
        humidityStatus.innerHTML = element.current.humidity>70?"Very humid":element.current.humidity>60?"Humid":element.current.humidity>40?"Comfortable":element.current.humidity>50?"Dry":"Very dry"
        moonRiseMoonSet.innerHTML = element.forecast.forecastday[0].astro.moonrise;
        moonSetStauts.innerHTML = element.forecast.forecastday[0].astro.moonrise;
        sunRiseSunSet.innerHTML = element.forecast.forecastday[0].astro.sunrise;
        sunSetStatus.innerHTML = element.forecast.forecastday[0].astro.sunset;
        imageTop.src = element.current.condition.icon;
        airQuality.innerHTML = element.current.air_quality['us-epa-index'];
        switch(element.current.air_quality['us-epa-index']){
            case 1:
                airStatus.innerHTML = "Good";
                break;
            case 2:
                airStatus.innerHTML = "Moderate";
                break;
            case 3:
                airStatus.innerHTML = "Unhelthy";
                break;
            case 4:
                airStatus.innerHTML = "Unhelthy";
                break;
            case 5:
                airStatus.innerHTML = "Very Unhelthy";
                break;
            case 6:airStatus.innerHTML = "Hazardous";
                break;
        }

        setHourlyDetails(element);
    })
}

displayDetails("London"); 

btnSearch.addEventListener("click",evt => {
    displayDetails(locationInput.value);
});

btnCel.addEventListener("click",evt=>{
    celValue = true;
    farValue = false;
    displayDetails(locationInput.value);
})

btnFar.addEventListener("click",evt=>{
    celValue = false;
    farValue = true;
    displayDetails(locationInput.value);
})


