import dom from "./dom";

const API_KEY = '81aff566a807d2c4b92390f655f0c117';

// TODO: make form span for fetch error

async function getDataJSON(city) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    let dataJSON = await data.json();
    return dataJSON;
};

/* if city1 isn't provided, check for a form input;
   city1 is provided only on first load ("Belgrade") in index.js */
const submitForm = async(ev, city1 = undefined) => {
    let city = city1;
    let data;
    if (!city) {city = document.forms["searchForm"]["inputCity"].value;}
    try {data = await getDataJSON(city)}
    catch(err) {console.error(err)};
    
    dom.populateMain(data);
};

const convertToFarenheit = (value) => {
    let temp = (parseInt(value)*1.8)+32;
    return `${parseInt(temp)}°F`;
};

const convertToCelsius = (value) => {
    let temp = (parseInt(value)-32)/1.8;
    return `${parseInt(temp)}°C`;
};

const KelvinToCelsius = (value) => {
    let temp = parseInt(value)-273.15;
    return `${parseInt(temp)}°C`;
};

const KelvinToFarenheit = (value) => {
    let temp = (parseInt(value)-273.15)*9/5+32;
    return `${parseInt(temp)}°F`;
}

const changeTemp = (ev) => {
    let elements = document.querySelectorAll(".changeTemp");
    elements.forEach(el => {
        let value = el.textContent;
        let val = value.slice(0, value.length-2);
        val = parseInt(val);
        if (ev.target.checked) {
            let temp = convertToFarenheit(val);
            el.textContent = temp;
        }
        else {
            let temp = convertToCelsius(val);
            el.textContent = temp;
        }
    })
}

const capitalizeStr = (str) => {
    let ogStr = str.toLowerCase().split(" ");
    for (let i = 0; i < ogStr.length; i++) {
        ogStr[i] = ogStr[i].charAt(0).toUpperCase() + ogStr[i].substring(1);
    }
    return ogStr.join(" ");
};

const windMetersPerSecond = (value) => {
    return `${value}m/s`;
};

const windMilesPerHour = (value) => {
    return `${(2.237 * parseFloat(value)).toFixed(2)}mph`;
}

export default { 
    getDataJSON,
    submitForm,
    KelvinToCelsius,
    KelvinToFarenheit,
    convertToFarenheit,
    convertToCelsius,
    capitalizeStr,
    windMetersPerSecond,
    windMilesPerHour,
    changeTemp,
};