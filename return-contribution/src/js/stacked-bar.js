import * as d3 from "d3";
import {Axes as axes} from "./chart_utilities";
import {legend as legendFactory} from "./chart_utilities";
import {BAR_DIRECTION_HORIZONTAL, BAR_DIRECTION_VERTICAL} from "./constants";

function stackedBar() {

    let params = {
        height: 400,
        width: 700,
        animationDuration: 2000,
        margin: {left: 50, right: 100, top: 20, bottom: 50},
        legend: true,
        xAxisLabel: 'Contribution',
        yAxisLabel: 'Accounts',
        direction: BAR_DIRECTION_HORIZONTAL,
        stackClickHandler: (...args) => console.log(args)
    };

    function generator(selection) {
        let scaleContributions,
            scaleAccounts,
            scaleColor,
            g,
            axes_generator,
            chartWidth = params.width - params.margin.left - params.margin.right,
            chartHeight = params.height - params.margin.top - params.margin.bottom,
            legend = params.legend,
            legend_generator;

        // Remove any existing container
        selection
            .selectAll('svg')
            .remove();

        // Create the chart container
        g = selection.append('svg')
                     .attr('height', params.height)
                     .attr('width', params.width)
                     .attr('class', 'stacked_bar')
                     .append('g')
                     .attr('transform', `translate(${params.margin.left}, ${params.margin.top})`);

        // Create the scales
        scaleAccounts = d3.scaleBand().rangeRound(params.direction === BAR_DIRECTION_HORIZONTAL ? [chartHeight, 0]: [0, chartWidth]).paddingOuter(0.2).paddingInner(0.2);
        scaleContributions = d3.scaleLinear().range(params.direction === BAR_DIRECTION_HORIZONTAL ? [0, chartWidth]: [chartHeight, 0]);
        scaleColor = d3.scaleOrdinal().range(["firebrick", "turquoise", "bisque", "steelblue", "darkorange", "lightblue", "burlywood", "chocolate"]);

        // Create the axes generator
        axes_generator = axes()
            .chartHeight(chartHeight)
            .chartWidth(chartWidth)
            .scaleX(params.direction === BAR_DIRECTION_HORIZONTAL ? scaleContributions : scaleAccounts)
            .scaleY(params.direction === BAR_DIRECTION_HORIZONTAL ? scaleAccounts: scaleContributions)
            .xAxisLabel(params.direction === BAR_DIRECTION_HORIZONTAL ? params.xAxisLabel : params.yAxisLabel)
            .yAxisLabel(params.direction === BAR_DIRECTION_HORIZONTAL ? params.yAxisLabel : params.xAxisLabel);

        // Create the legend generator
        legend_generator = legendFactory()
            .chartWidth(chartWidth)
            .marginRight(params.margin.right)
            .scaleColor(scaleColor);


        selection.each(function (data) {
            // console.table(data);
            let nameColumn = data.columns[0];
            let numericColumns = data.columns.slice(1);

            legend_generator = legend_generator.labels(numericColumns);

            // convert the numeric column data to numeric values
            data
                .map(function (row) {
                    let total = 0;

                    numericColumns.map(function (col) {
                        row[col] = +row[col];
                        total += row[col];
                    });
                    // Attach the total as a field to the row
                    row.total = total;

                    return row;
                });

            // Set the domain values on the scales
            scaleAccounts.domain(
                data.map(
                    function (row) {
                        return row[nameColumn];
                    }
                )
            );
            scaleContributions.domain([0, d3.max(data, function (row) {
                return row.total;
            })]);
            scaleColor.domain(numericColumns);

            // the selectAll magic
            let stackedBar = g.selectAll('g')
                              .data(d3.stack().keys(numericColumns)(data))
                              .enter()
                              .append('g')        // The horizontal container of one level of stacks
                              .attr('class', 'sub-bar');

            let country = stackedBar
                              .selectAll('rect')    // Each stack within a bar
                              .data(function (row) {
                                  return row.map(function (columnData) {
                                      return {
                                          name: columnData.data[nameColumn],
                                          key: row.key,
                                          // For vertical rects, the start has to be set to the end of the range and
                                          // not the start. This is because when you position the y value of the rect
                                          // you do so relative to the top left corner. So you set the y value of
                                          // the rect to the range end which positions that rect's top left corner
                                          // and the height of the rect to the difference between the start and end
                                          // of the range which will position the base line of the vertical rect.
                                          start: params.direction === BAR_DIRECTION_HORIZONTAL ? columnData[0] : columnData[1],
                                          end: (columnData[1] - columnData[0])
                                      }
                                  })
                              })
                              .enter()
                              .append('rect')
                              .attr('x', function (point) {
                                  return params.direction === BAR_DIRECTION_HORIZONTAL ? 0 : scaleAccounts(point.name);
                              })
                              .attr('y', function (point) {
                                  return params.direction === BAR_DIRECTION_HORIZONTAL ? scaleAccounts(point.name) : scaleContributions(0);
                              })
                              .attr('width', function (point) {
                                  return params.direction === BAR_DIRECTION_HORIZONTAL ? 0 : scaleAccounts.bandwidth();
                              })
                              .attr('height', function (point) {
                                  return params.direction === BAR_DIRECTION_HORIZONTAL ? scaleAccounts.bandwidth() : 0;
                              })
                              .attr('fill', function (point) {
                                  return scaleColor(point.key);
                              })
                              .on('click', params.stackClickHandler)
            ;

            // Animate the bars to appear by gradually expanding to their height
            // by setting their y and height values
            country
                .transition()
                .attr(params.direction === BAR_DIRECTION_HORIZONTAL ? 'x': 'y', function (point) {
                    return scaleContributions(point.start);
                })
                .attr(params.direction === BAR_DIRECTION_HORIZONTAL ? 'width': 'height', function (point) {
                    return params.direction === BAR_DIRECTION_HORIZONTAL ? scaleContributions(point.end): chartHeight - scaleContributions(point.end);
                })
                .duration(params.animationDuration);

            // draw the axes
            axes_generator(g);

            // draw the legend
            legend_generator(g);
        });
    }

    generator.param = function (param, value) {
        if (arguments.length == 1) {
            return params[param];
        }

        if (params[param] !== undefined) {
            params[param] = value;
        }

        return generator;
    };

    return generator;
}

export {stackedBar as StackedBarChartGenerator}