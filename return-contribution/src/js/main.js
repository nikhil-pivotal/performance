import * as d3 from "d3";

import {StackedBarChartGenerator} from "./stacked-bar";
import Service from "./service";

let service = new Service();
let portfolioDimension = "country";

let selection = document.getElementById('dimension');
selection.addEventListener('change', function (e) {
    portfolioDimension = e.currentTarget.value;
    renderChart(service.urls[portfolioDimension].root);
});

let stackClickHandler = function (data, index, group) {

    let dimension = data.key;
    let portfolio = data.name;

    let url = service.urls[portfolioDimension][dimension];

    if (url === undefined) {
        console.log(`Unsupported dimension ${dimension}`);
    } else {
        renderChart(url);
    }

};

let generator = StackedBarChartGenerator()
    .param('stackClickHandler', stackClickHandler)
    .param('level', 0);


function renderChart(url) {
    d3.csv(url)
      .then(function (data) {
          d3.select('.container')
            .datum(data)
            .call(generator);
      });
}

