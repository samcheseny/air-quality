import Doughnut from 'utils/doughnut';
import english from '../../data/english';
import hindi from '../../data/hindi';

//Assign english and hindi to variables

//Function to change the language
changeTheLanguage(event) {

    if (event.target.value === "eng") {

        this.story = english;

        this.selectedCity = {
            name: english["compare-tabs_1_city_3_name"],
            cigarettes: parseInt(english["compare-tabs_1_city_3_cigg"]),
            pmi: english["compare-tabs_1_city_3_aqi"],
            aqi: parseInt(english["compare-tabs_1_city_3_aqi"])
        };

    } else {

        this.story = hindi;

        this.selectedCity = {
            name: hindi["compare-tabs_1_city_3_name"],
            cigarettes: parseInt(hindi["compare-tabs_1_city_3_cigg"]),
            pmi: hindi["compare-tabs_1_city_3_aqi"],
            aqi: parseInt(english["compare-tabs_1_city_3_aqi"])
        };

    }

}

//Get cities for rendering on select
getCities() {

    let cities = [];

    for (let i = 1; i <= parseInt(this.story.total_cities_1_value); i++) {

        let city = {
            name: this.story[`compare-tabs_1_city_${i}_name`],
            cigarettes: parseInt(this.story[`compare-tabs_1_city_${i}_cigg`]),
            pmi: this.story[`compare-tabs_1_city_${i}_aqi`],
            aqi: parseInt(this.story[`compare-tabs_1_city_${i}_aqi`])
        };

        cities.push(city);
    }

    return cities;

}

//Call to render the doughnut.
//Should be wrapped in a function to be called each time selectedCity changes
let doughnut = new Doughnut({
    canvas: doughnutCanvas,
    data: {
        clean: (500 - this.city.aqi),
        dirty: this.city.aqi
    },
    pmi: this.city.pmi
});

doughnut.draw();