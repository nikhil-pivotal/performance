import Service from "./service";
import * as d3 from "d3";
import {StackedBarChartGenerator} from "./stacked-bar";

export default class App {
    constructor() {
        this.portfolioDimension = null;
        this.reportLevel = [];
        this.service = new Service();

        this.chartClickHandler = this.chartClickHandler.bind(this);

        this.generator = StackedBarChartGenerator()
            .param('stackClickHandler', this.chartClickHandler);
    }

    /**
     * Render a chart for a new portfolio dimension
     * @param dimension
     */
    showChartForDimension(dimension) {
        // Set the portfolio dimension
        this.portfolioDimension = dimension;

        // Set the initial report Path
        this.reportLevel = [dimension];

        this.showChart();
    }

    showChartUpOneLevel() {
        this.reportLevel.pop();

        this.showChart();
    }

    showChartForNode(node) {
        // get the data url for this portfolio dimension and reporting level
        let url = this.service.getUrl(this.portfolioDimension, node);

        if (url === undefined) {
            console.log(`Unsupported reported node ${node}`);
        } else {
            this.reportLevel.push(node);
            this.draw(url);
        }
    }

    showChart() {
        let node = this.reportLevel[this.reportLevel.length - 1];

        // get the data url for this portfolio dimension and reporting level
        let url = this.service.getUrl(this.portfolioDimension, node);

        if (url === undefined) {
            console.log(`Unsupported reported node ${node}`);
        } else {
            this.draw(url);
        }
    }

    draw(dataUrl) {
        let generator = this.generator;

        d3.csv(dataUrl)
          .then(function (data) {
              d3.select('.container')
                .datum(data)
                .call(generator);
          });
    }

    chartClickHandler(data, index, group) {
        let node = data.key;

        // Draw the chart
        this.showChartForNode(node);
    }
}