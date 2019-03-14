<template>

    <div>
        <canvas id="doughnutCanvas" ref="doughnutCanvas"></canvas>
    </div>

</template>

<style lang="scss">

</style>

<script>

    import Doughnut from '../classes/doughnut';

    export default {
        name: 'Chart',
        data() {
            return {
                doughnut: null
            }
        },
        methods: {},
        props: {
            city: {}
        },
        mounted() {

            this.doughnut = new Doughnut({
                canvas: this.$refs.doughnutCanvas,
                data: {
                    clean: (500 - this.city.aqi),
                    dirty: this.city.aqi
                },
                pmi: this.city.pmi
            });

            this.doughnut.draw();

        },
        watch: {
            city(value) {

                this.city = value;

                this.doughnut = new Doughnut({
                    canvas: this.$refs.doughnutCanvas,
                    data: {
                        clean: (500 - this.city.aqi),
                        dirty: this.city.aqi
                    },
                    pmi: this.city.pmi
                });

                this.doughnut.draw();

            }
        }
    }

</script>
