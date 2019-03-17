export default class Doughnut {

    constructor(options) {
        this.options = options;
        this.canvas = options.canvas;
        this.context = this.canvas.getContext("2d");
        this.colors = ["#aaeeff", "#00aaff"];
        this.holeSize = 0.7;
        this.pmi = options.pmi;
    }

    draw() {

        let totalValue = 0;
        let colorIndex = 0;

        Object.values(this.options.data).forEach(value => totalValue += value);

        let startAngle = 90;

        Object.values(this.options.data).forEach(value => {

            let sliceAngle = 2 * Math.PI * value / totalValue;

            this.drawSlice(
                this.context,
                this.canvas.width / 2,
                this.canvas.height / 2,
                Math.min(this.canvas.width / 2, this.canvas.height / 2),
                startAngle,
                startAngle + sliceAngle,
                this.colors[colorIndex % this.colors.length]
            );

            startAngle += sliceAngle;
            colorIndex++;

        });

        //Add a hole to form the donut
        this.drawSlice(
            this.context,
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.holeSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
            0,
            2 * Math.PI,
            "#fff"
        );

        //Add text to the center
        this.writeText(
            this.context,
            this.canvas.width / 2,
            this.canvas.height / 2,
            "#606060",
            this.pmi
        );

    }

    drawSlice(context, centerX, centerY, radius, startAngle, endAngle, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle, false);
        context.closePath();
        context.fill();
    }

    writeText(context, centerX, centerY, color, text) {
        context.moveTo(centerX, centerY);
        context.fillStyle = color;
        context.font = "bold 11pt sans-serif";
        context.fillText(text + "/500", 103, 80);
    }

}

