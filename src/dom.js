import app from "./app";
import searchImg from "./images/search.png";

const content = document.querySelector(".content");

const makeForm = () => {
    let formDiv = document.createElement("div");
    formDiv.classList.add("formDiv");
    let form = document.createElement("form");
    form.id = "searchForm";
    form.name = "searchForm";
    let inputCity = document.createElement("input");
    inputCity.type = "search";
    inputCity.name = "inputCity";
    inputCity.required = true;
    let placeholderSpan = document.createElement("span");
    placeholderSpan.textContent = "Enter a city (e.g. Rome or Rome, IT):";
    placeholderSpan.classList.add("floatingLabel");
    let image = document.createElement("img");
    image.src = searchImg;
    image.classList.add("searchImg");
    let submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.id = "submitBtn";

    submitBtn.appendChild(image);
    form.appendChild(inputCity);
    form.appendChild(placeholderSpan);
    form.appendChild(submitBtn);
    formDiv.appendChild(form);
    content.appendChild(formDiv);

    submitBtn.addEventListener("click", app.submitForm);
};

const makeMain = () => {
    let classArr = ["location", "desc", "temp", "feelsLike", "high",
     "min", "pressure", "humidity", "wind"];
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("mainDiv");
    let bottomContentDiv = document.createElement("div");
    bottomContentDiv.classList.add("bottomContentDiv");
    let cityAndTempDiv = document.createElement("div");
    cityAndTempDiv.classList.add("cityAndTempDiv");
    let mainContentDiv = document.createElement("div");
    mainContentDiv.classList.add("mainContentDiv");
    for (let i = 0; i < classArr.length; i++) {
        let div = document.createElement("div");
        div.classList.add(classArr[i]+"Div");

        // skip first 3 divs; do not add "Title"
        if (i > 2) {
            var p = document.createElement("p");
            p.classList.add(classArr[i]+"Title");
            div.appendChild(p);
        }

        let p1 = document.createElement("p");
        p1.classList.add(classArr[i]);

        // add "changeTemp" class for every p that has temperature in it
        // usefull for changing later from Celsius to Farenheit 
        if (i >= 2 && i <= 5) {p1.classList.add("changeTemp")}; 
        
        div.appendChild(p1);

        // add locationDiv and tempDiv to cityAndTempDiv
        if (i === 0 || i === 2) {cityAndTempDiv.appendChild(div)}
        // add descDiv to mainContentDiv
        else if (i === 1) {mainContentDiv.appendChild(div)}
        // add all remaining divs to bottomContentDiv
        else {
            p.classList.add("bottomTitle");
            p1.classList.add("bottomItem");
            bottomContentDiv.appendChild(div)}  
    }
    
    let icon = document.createElement("img");
    icon.classList.add("icon");
    
    mainContentDiv.appendChild(cityAndTempDiv);
    mainDiv.appendChild(mainContentDiv);
    mainDiv.appendChild(bottomContentDiv);
    content.appendChild(mainDiv);

    addTitles();
    let descDiv = document.querySelector(".descDiv");
    makeSwitch(descDiv);
    descDiv.appendChild(icon);
};

const addTitles = () => {
    document.querySelector(".feelsLikeTitle").textContent = "Feels Like";
    document.querySelector(".highTitle").textContent = "Max Temp";
    document.querySelector(".humidityTitle").textContent = "Humidity";
    document.querySelector(".windTitle").textContent = "Wind";
    document.querySelector(".minTitle").textContent = "Min Temp";
    document.querySelector(".pressureTitle").textContent = "Pressure";
};

const populateMain = (data) => {
    let switchBtn = document.querySelector(".sliderBtn");

    if (switchBtn.checked) {
        document.querySelector(".temp").textContent = `${app.KelvinToFarenheit(data.main.temp)}`;
        document.querySelector(".feelsLike").textContent = `${app.KelvinToFarenheit(data.main.feels_like)}`;
        document.querySelector(".high").textContent = `${app.KelvinToFarenheit(data.main.temp_max)}`;
        document.querySelector(".min").textContent = `${app.KelvinToFarenheit(data.main.temp_min)}`;
    } else {
        document.querySelector(".temp").textContent = `${app.KelvinToCelsius(data.main.temp)}`;
        document.querySelector(".feelsLike").textContent = `${app.KelvinToCelsius(data.main.feels_like)}`;
        document.querySelector(".high").textContent = `${app.KelvinToCelsius(data.main.temp_max)}`;
        document.querySelector(".min").textContent = `${app.KelvinToCelsius(data.main.temp_min)}`;
    }
    document.querySelector(".desc").textContent = `${app.capitalizeStr(data.weather[0].description)}`;
    document.querySelector(".location").textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${app.windMetersPerSecond(data.wind.speed)}`;
    document.querySelector(".pressure").textContent = `${data.main.pressure} hPa`;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 
};

const makeSwitch = (descDiv) => {
    let label = document.createElement("label");
    label.classList.add("switch");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("sliderBtn");
    let slider = document.createElement("span");
    slider.classList.add("slider");

    let div = document.createElement("div");
    div.classList.add("spanDiv");
    let spanC = document.createElement("span");
    spanC.textContent = "°C";
    spanC.classList.add("spanC");
    let spanF = document.createElement("span");
    spanF.textContent = "°F";
    spanF.classList.add("spanF");
    div.appendChild(spanC);
    div.appendChild(spanF);
    slider.appendChild(div);

    label.appendChild(input);
    label.appendChild(slider);
    
    descDiv.appendChild(label);

    input.addEventListener("change", app.changeTemp);
}

const makeAll = () => {
    makeForm();
    makeMain();
};

export default { 
    makeAll,
    populateMain,
};