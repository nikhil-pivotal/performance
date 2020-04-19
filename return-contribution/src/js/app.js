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

        if(this.reportLevel.length == 0) {
            this.portfolioDimension = undefined;

            // Set the html select to be the default
            document.getElementById('dimension').options[0].selected = true;
        }

        this.showChart();
    }

    showChartForNode(node) {
        // get the data url for this portfolio dimension and reporting level
        let url = this.service.getUrl(this.portfolioDimension, node);

        if (url === undefined) {
            console.log(`Unsupported reported node ${node}`);
        } else {
            this.reportLevel.push(node);
            this.showChart();
            // this.draw(url);
        }
    }

    showChart() {
        let node = this.reportLevel[this.reportLevel.length - 1];

        // get the data url for this portfolio dimension and reporting level
        let url = (this.portfolioDimension == undefined ) ?
            this.service.getUrl('account', 'account') :
            this.service.getUrl(this.portfolioDimension, node);

        if (url === undefined) {
            console.log(`Unsupported reported node ${node}`);
        } else {
            // draw the chart
            this.draw(url);

            // set the breadcrumbs
            this.setReportPath();
        }
    }

    setReportPath() {
        const reportPathPrefix = "Portfolio -> Accounts";

        // form the report path string
        let reportPath = this.reportLevel.join(' -> ');

        // Set it on the page
        let reportPathElem = document.querySelector('.report-path');
        reportPathElem.innerHTML = reportPath.length == 0 ? ` ${reportPathPrefix}` : `${reportPathPrefix} -> ${reportPath}`;
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
        let node = data.key.trim();

        // Draw the chart
        this.showChartForNode(node);
    }

    changeBarDirection(barDirection) {
        console.log("Change bar direction and re-render the chart");

        this.generator.param("direction", barDirection);
        this.showChart();
    }
}