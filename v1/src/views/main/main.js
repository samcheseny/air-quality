import english from '../../data/english';
import hindi from '../../data/hindi';
import Chart from '../../components/Chart';

export default {
    name: 'Main',
    components: {
        Chart
    },
    data() {
        return {
            story: english,
            selectedCity: {
                name: english["compare-tabs_1_city_3_name"],
                cigarettes: parseInt(english["compare-tabs_1_city_3_cigg"]),
                pmi: english["compare-tabs_1_city_3_aqi"],
                aqi: parseInt(english["compare-tabs_1_city_3_aqi"])
            }
        }
    },
    methods: {
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
    },
    props: {},
    computed: {
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
    }
}
