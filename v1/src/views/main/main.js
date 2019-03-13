import json from '../../data/english';

export default {
    name: 'Main',
    data() {
        return {
            englishData: json,
            selectedCity: {}
        }
    },
    methods: {
        pickACity(city, event) {
            console.log(city.name);
            console.log(city.cigarettes);
        }
    },
    props: {},
    computed: {
        getCities() {

            let cities = [];

            for (let i = 1; i <= parseInt(this.englishData.total_cities_1_value); i++) {

                let city = {
                    name: this.englishData[`compare-tabs_1_city_${i}_name`],
                    cigarettes: parseInt(this.englishData[`compare-tabs_1_city_${i}_cigg`]),
                    pmi: this.englishData[`compare-tabs_1_city_${i}_aqi`]
                };

                cities.push(city);
            }

            return cities;

        }
    },
    mounted() {

    }
}
