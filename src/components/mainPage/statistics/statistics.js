import React, { Component } from 'react'
import './statistics.css'
import * as d3 from 'd3';
import {FormattedMessage} from "react-intl";

class Statistics extends Component {

    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this)
    }
    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }
    createLineChart() {

        const node2 = this.node2
        let margin = {top: 50, right: 50, bottom: 50, left: 50}
            , width = window.innerWidth/4 - margin.left - margin.right // Use the window's width
            , height = window.innerHeight/2 - margin.top - margin.bottom; // Use the window's height

        let xScale = d3.scaleBand()
            .domain(this.props.data.map(d => d.date) )
            .range([0, width])
            .padding(1);; // output

        let yScale = d3.scaleLinear()
            .domain([0, 100]) // input
            .range([height, 0]); // output

        let line = d3.line()
            .x(function(d, i) { return xScale(d.date); })
            .y(function(d) { return yScale(d.value); })
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        let dataset = this.props.data


        let svg = d3.select(node2).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


        svg.append("path")
            .datum(dataset) // 10. Binds data to the line
            .attr("class", "line") // Assign a class for styling
            .attr("d", line); // 11. Calls the line generator


        svg.selectAll(".dot")
            .data(dataset)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d) { return xScale(d.date) })
            .attr("cy", function(d) { return yScale(d.value) })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) {
                console.log(a)
            })
            .on("mouseout", function() {  })

    }

       render() {

        if (this.props.show) {
            return (
                <div className="statistics">
                    <div className="statisticsTitle">
                        Statistics
                    </div>
                    <div className="graph">
                        <div className="graphTitle">
                            <FormattedMessage id="YourActivity"/>
                        </div>
                        <svg ref={node2 => this.node2 = node2}
                             width={500} height={500}>
                        </svg>
                    </div>
                </div>

            );
        } else {

            return (
                <div />
            );
        }
    }
}

export default Statistics