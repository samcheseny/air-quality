import Doughnut from './utils/doughnut';
import english from '../../data/english';
import hindi from '../../data/hindi';
import img from '../../assets/images/cigarette_icon.png';

//Assign english and hindi to variables
let article = english;

//Assign a default value for the selected city
let selectedCity = {
    name: english["compare-tabs_1_city_3_name"],
    cigarettes: parseInt(english["compare-tabs_1_city_3_cigg"]),
    pmi: english["compare-tabs_1_city_3_aqi"],
    aqi: parseInt(english["compare-tabs_1_city_3_aqi"])
};

function loadData(article, selectedCity) {
    let countryLink = document.getElementById("country-link");
    let heroTitle = document.getElementById("hero-title");
    let byline = document.getElementById("byline");
    let articleDate = document.getElementById("article-date");
    let disabledCityOption = document.querySelector("#city-picker > option");
    let cityPicker = document.getElementById("city-picker");
    let selectedCityName = document.querySelector(".city-info > h3");
    let selectedCityCigarettesList = document.getElementById("cigarettes");
    let paragraphOne = document.getElementById("p-1");
    let paragraphTwo = document.getElementById("p-2");
    let paragraphThree = document.getElementById("p-3");
    let paragraphFour = document.getElementById("p-4");
    let paragraphFive = document.getElementById("p-5");
    let paragraphSix = document.getElementById("p-6");
    let paragraphSeven = document.getElementById("p-7");
    let paragraphEight = document.getElementById("p-8");
    let paragraphNine = document.getElementById("p-9");
    let paragraphTen = document.getElementById("p-10");
    let footer = document.querySelector(".footer");

    countryLink.setAttribute("href", article["article-info_1_category_url"]);
    countryLink.innerText = article["article-info_1_category"];

    heroTitle.innerText = article.hero_1_title;
    byline.innerText = article["article-info_1_byline"];
    articleDate.innerText = article["article-info_1_date"];


    disabledCityOption.innerText = article['compare-tabs_1_title'];

    getCities().forEach(city => {
        let option = document.createElement('option');
        option.appendChild(document.createTextNode(city.name));
        option.value = JSON.stringify(city);
        cityPicker.appendChild(option);
    });

    //Load initial selected city data
    selectedCityName.innerHTML = selectedCity.name;
    selectedCityCigarettesList.innerHTML = "";

    for (let index = 0; index < selectedCity.cigarettes; index++) {
        let listItem = document.createElement("li");
        let image = document.createElement("img");
        image.setAttribute("height", "55");
        image.setAttribute("width", "17");
        image.classList.add("cigarette-icon");
        image.src = `dist/${img}`;


        listItem.appendChild(image);
        selectedCityCigarettesList.appendChild(listItem);
    }

    canvas(selectedCity);

    paragraphOne.innerHTML = article.p_1_value;
    paragraphTwo.innerHTML = article.p_2_value;
    paragraphThree.innerHTML = article.p_3_value;
    paragraphFour.innerHTML = article.p_4_value;

    let paragraphFiveContent = document.getElementById("p-5-content");
    paragraphFiveContent.innerHTML = article.p_5_value;

    let paragraphFiveStrong = document.getElementById("p-5-strong");
    paragraphFiveStrong.innerHTML = `* ${article["compare-tabs_1_method"]}`;

    paragraphSix.innerHTML = article.p_6_value;
    paragraphSeven.innerHTML = article.p_7_value;
    paragraphEight.innerHTML = article.p_8_value;
    paragraphNine.innerHTML = article.p_9_value;
    paragraphTen.innerHTML = article.p_10_value;

    footer.innerHTML = `@Copyright ${new Date().getFullYear()}`;
}


//Function to change the language
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('language-dropdown').onchange = changeTheLanguage;
    document.getElementById('city-picker').onchange = changeTheCity;
}, false);

function changeTheLanguage(event) {

    let article, selectedCity;

    if (event.target.value === "eng") {

        article = english;

        selectedCity = {
            name: english["compare-tabs_1_city_3_name"],
            cigarettes: parseInt(english["compare-tabs_1_city_3_cigg"]),
            pmi: english["compare-tabs_1_city_3_aqi"],
            aqi: parseInt(english["compare-tabs_1_city_3_aqi"])
        };

    } else {

        article = hindi;

        selectedCity = {
            name: hindi["compare-tabs_1_city_3_name"],
            cigarettes: parseInt(hindi["compare-tabs_1_city_3_cigg"]),
            pmi: hindi["compare-tabs_1_city_3_aqi"],
            aqi: parseInt(english["compare-tabs_1_city_3_aqi"])
        };

    }

    loadData(article, selectedCity);
}

function changeTheCity(event) {

    let selectedCityName = document.querySelector(".city-info > h3");
    let selectedCityCigarettesList = document.getElementById("cigarettes");
    let city = JSON.parse(event.target.value);

    console.log(city);

    //Load initial selected city data
    selectedCityName.innerHTML = city.name;

    selectedCityCigarettesList.innerHTML = "";

    for (let index = 0; index < city.cigarettes; index++) {
        let listItem = document.createElement("li");
        let image = document.createElement("img");
        image.setAttribute("height", "55");
        image.setAttribute("width", "17");
        image.classList.add("cigarette-icon");
        image.src = `dist/${img}`;

        listItem.appendChild(image);
        selectedCityCigarettesList.appendChild(listItem);
    }

    canvas(city);

}

//Get cities for rendering on select
function getCities() {

    let cities = [];

    for (let i = 1; i <= parseInt(article.total_cities_1_value); i++) {

        let city = {
            name: article[`compare-tabs_1_city_${i}_name`],
            cigarettes: parseInt(article[`compare-tabs_1_city_${i}_cigg`]),
            pmi: article[`compare-tabs_1_city_${i}_aqi`],
            aqi: parseInt(article[`compare-tabs_1_city_${i}_aqi`])
        };

        cities.push(city);
    }

    return cities;

}

//Call to render the doughnut.
//Should be wrapped in a function to be called each time selectedCity changes
function canvas(selectedCity) {

    new Doughnut({
        canvas: document.getElementById("doughnutCanvas"),
        data: {
            clean: (500 - selectedCity.aqi),
            dirty: selectedCity.aqi
        },
        pmi: selectedCity.pmi
    }).draw();

}


loadData(article, selectedCity);