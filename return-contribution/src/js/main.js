import * as d3 from "d3";

import {StackedBarChartGenerator} from "./stacked-bar";

let generator = StackedBarChartGenerator();

d3.csv('/flat/dummy-data.csv')
  .then(function (data) {
      d3.select('.container')
        .datum(data)
        .call(generator);
  });

