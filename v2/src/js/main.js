import Doughnut from './utils/doughnut';
import english from '../../data/english';
import hindi from '../../data/hindi';
import img from '../../assets/images/cigarette_icon.png';

class Article {

    constructor() {
        //Assign a default language file to the article
        this.article = english;

        //Assign a default value for the selected city
        this.selectedCity = this.getCities(this.article)[0];

        //Listen to events
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('language-dropdown').onchange = this.changeTheLanguage;
            document.getElementById('city-picker').onchange = this.changeTheCity;
        }, false);

        //Load initial data
        this.loadData(this.article, this.selectedCity);
    }

    /**
     * Load the initial page data
     *
     * @param article
     * @param selectedCity
     */
    loadData(article, selectedCity) {
        let countryLink = document.getElementById("country-link");
        let heroTitle = document.getElementById("hero-title");
        let byline = document.getElementById("byline");
        let articleDate = document.getElementById("article-date");
        let cityPicker = document.getElementById("city-picker");
        let selectedCityName = document.querySelector(".city-info > h3");
        let selectedCityCigarettesList = document.getElementById("cigarettes");
        let paragraphOne = document.getElementById("p-1");
        let paragraphTwo = document.getElementById("p-2");
        let paragraphThree = document.getElementById("p-3");
        let paragraphFour = document.getElementById("p-4");
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

        cityPicker.innerHTML = `<option value="" disabled selected id="disabled-option">${article['compare-tabs_1_title']}</option>`;

        while (cityPicker.lastChild.id !== 'disabled-option') {
            cityPicker.removeChild(cityPicker.lastChild);
        }

        this.getCities(article).forEach((city, index) => {

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
            image.src = `${img}`;

            listItem.appendChild(image);
            selectedCityCigarettesList.appendChild(listItem);
        }

        this.canvas(selectedCity);

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

    /**
     * Change the default language
     *
     * @param event
     */
    changeTheLanguage = (event) => {

        let article;

        if (event.target.value === "eng") {
            article = english;
        } else {
            article = hindi;
        }

        let selectedCity = this.getCities(article)
            .filter(city => city.id === this.selectedCity.id)[0];

        this.loadData(article, selectedCity);
    }

    /**
     * Change the city to see it's air-quality
     *
     * @param event
     */
    changeTheCity = (event) => {

        let selectedCityName = document.querySelector(".city-info > h3");
        let selectedCityCigarettesList = document.getElementById("cigarettes");
        let city = JSON.parse(event.target.value);

        this.selectedCity = city;

        //Load initial selected city data
        selectedCityName.innerHTML = city.name;

        selectedCityCigarettesList.innerHTML = "";

        for (let index = 0; index < city.cigarettes; index++) {
            let listItem = document.createElement("li");
            let image = document.createElement("img");
            image.setAttribute("height", "55");
            image.setAttribute("width", "17");
            image.classList.add("cigarette-icon");
            image.src = `${img}`;

            listItem.appendChild(image);
            selectedCityCigarettesList.appendChild(listItem);
        }

        this.canvas(city);

    }

    /**
     * Get cities for rendering on select
     *
     * @returns {Array}
     */
    getCities(article) {

        let cities = [];

        for (let i = 1; i <= parseInt(article.total_cities_1_value); i++) {

            let city = {
                id: i,
                name: article[`compare-tabs_1_city_${i}_name`],
                cigarettes: parseInt(article[`compare-tabs_1_city_${i}_cigg`]),
                pmi: article[`compare-tabs_1_city_${i}_aqi`],
                aqi: parseInt(article[`compare-tabs_1_city_${i}_aqi`])
            };

            cities.push(city);
        }

        return cities;

    }

    /**
     * Render the doughnut.
     *
     * @param selectedCity
     */
    canvas(selectedCity) {

        new Doughnut({
            canvas: document.getElementById("doughnutCanvas"),
            data: {
                clean: (500 - selectedCity.aqi),
                dirty: selectedCity.aqi
            },
            pmi: selectedCity.pmi
        }).draw();

    }

}

let article = new Article();