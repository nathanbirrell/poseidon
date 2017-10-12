import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Row from 'components/Row';
import Column from 'components/Column';

class AreaGraph extends React.Component {
  constructor (props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
    this.initGraph = this.initGraph.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
  }

  componentDidMount() {
    this.initGraph();
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  updateDimensions() {
    const el = d3.select(`#${this.props.targetId}`);
    return {
      width: parseInt(el.style('width'), 10),
      height: parseInt(el.style('height'), 10)
    };
  }

  initGraph() {
    this.svg = d3.select(`#${this.props.targetId}`).append('svg')
      .attr('preserveAspectRatio','xMinYMin meet')
      .attr('class', this.props.cssSelector);

    const ratingGradient = "<linearGradient id=\"ratingGradient\" gradientTransform=\"rotate(90)\"><stop offset=\"30%\"  stop-color=\"#00de00\"/><stop offset=\"65%\"  stop-color=\"#e0f500\"/><stop offset=\"95%\" stop-color=\"#dd0017\"/></linearGradient>";

    this.renderGraph();
  }

  renderGraph() {
    const graphs = this.props.graphs;
    const targetId = this.props.targetId;
    const dimensions = this.updateDimensions();

    const x = d3.scaleLinear()
      .rangeRound([0, dimensions.width]);
    let height;

    if (this.props.heightRatio) {
      height = dimensions.width * this.props.heightRatio;
    } else {
       height = dimensions.height;
    }

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);
    this.svg
      .attr('viewBox','0 0 '+ dimensions.width +' '+ height);


    const area = d3.area()
      .curve(d3.curveCardinal)
      .x(function(d, i) { return x(i); })
      .y1(function(d) { return y(d); });

    const line = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d, i) { return x(i); })
      .y(function(d) { return y(d); });

    x.domain(d3.extent(graphs[0].yVals, function(d, i) { return i; }));
    // y.domain([0, d3.max(graphs[i].yVals, function(d) { return d; })]);
    area.y0(y(0));

    const topLevel = this.svg.selectAll('g.graph')
      .data(graphs);

    topLevel.enter()
      .append('g')
      .attr('class', 'graph')
      .merge(topLevel)
      .each(function(graph, i) {
        const thisGraph = d3.select(this);
        // Set custom y Domain for this graph
        y.domain([0, graph.yMax]);

        // REMOVE PREVIOUS GRAPH ELEMENTS
        thisGraph.selectAll('defs').remove();
        thisGraph.selectAll('.area').remove();
        thisGraph.selectAll('.line').remove();
        thisGraph.selectAll('.point').remove();
        // thisGraph.selectAll('.dawn-segments').remove();
        // thisGraph.selectAll('.dusk-segments').remove();
        thisGraph.selectAll('.day-segment').remove();

        // Set gradient
        const colouredGradient = `<linearGradient id=\"${targetId}_ratingGradient_${i}\" gradientTransform=\"rotate(90)\"><stop offset=\"20%\"  stop-color=\"${graph.color}\" stop-opacity=\"0.35\"/><stop offset=\"90%\"  stop-color=\"${graph.color}\" stop-opacity=\"0.1\"/></linearGradient>`;
        const defs = thisGraph
          .append('defs');
        
        defs.html(colouredGradient);

        // DRAW NEW GRAPH ELEMENTS
        if (graph.area.show) {
          const areaInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', 'area')
            .attr('fill', `url(#${targetId}_ratingGradient_${i})`)
            .attr('opacity', graph.area.opacity || 1)
            .attr("d", area);
        }
        
        if (graph.line.show) {
          const lineInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', 'line')
            .attr('stroke', graph.color)
            .attr('fill', 'none')
            .attr('opacity', graph.line.opacity || 0.5)
            .attr("d", line);
        }

        if (graph.points.show) {
          const pointsInstance = thisGraph
            .selectAll('.point')
              .data(graph.yVals)
              .enter().append("svg:circle")
              .attr('class', 'point')
              .attr('stroke', graph.points.color || graph.color)
              .attr('fill', graph.points.color || graph.color)
              .attr("cx", function(d, i) { return x(i) })
              .attr("cy", function(d, i) { return y(d) })
              .attr("r", graph.points.radius);
        }
      });

      // const forecastDays = this.props.forecastDays;
      // const noOfDatapoints = x.domain()[1];
      // const nightSegments = [];
      // const dawnPoint = 0;
      // const dawnDuration = 1; // Indexes in array of a day's data which we say are covered by dawn period
      // const duskPoint = 6; // Index in array of a day's data where we say dusk starts
      // const duskDuration = 2; // Indexes in array of a day's data which we say are covered by dusk period
      // for (let i = 0; i < forecastDays; i += 1) {
      //   nightSegments.push(`Day ${i}`);
      // }

      // if (forecastDays) {
      // const dawnSegments = this.svg
      //   .selectAll('.dawn-segments')
      //     .data(nightSegments)
      //     .enter().append('rect')
      //     .attr('class', 'dawn-segments')
      //     .attr('x', function(d, i) { return x(i * (noOfDatapoints / forecastDays) + dawnPoint) })
      //     .attr('y', 0)
      //     .attr('width', function(d, i) { return x(dawnDuration) })
      //     .attr('height', function(d, i) { return y(y.domain()[0] )})
      //     .attr('fill', '#0D659D')
      //     .attr('opacity', 0.2);

      // const duskSegments = this.svg
      //   .selectAll('.dusk-segments')
      //     .data(nightSegments)
      //     .enter().append('rect')
      //     .attr('class', 'dusk-segments')
      //     .attr('x', function(d, i) { return x(i * (noOfDatapoints / forecastDays) + duskPoint) })
      //     .attr('y', 0)
      //     .attr('width', function(d, i) { return x(duskDuration) })
      //     .attr('height', function(d, i) { return y(y.domain()[0] )})
      //     .attr('fill', '#0D659D')
      //     .attr('opacity', 0.2);
      // }

      const vertSegHeight = y(y.domain()[0]);
      const vertSegments = this.svg
        .selectAll('.day-segment')
          .data(graphs[0].yVals)
          .enter().append('rect')
          .attr('class', 'day-segment')
          .attr('x', function(d, i) { return x(i - 0.5) })
          .attr('y', 0)
          .attr('width', function(d, i) { return x(1) })
          .attr('height', vertSegHeight)
          .attr('fill', function(d, i) { 
            const mod = i%8;
            if (mod <= 1 || mod >= 6) {
              return '#0D659D';
            }
            return 'none';
          })
          .attr('opacity', 0.15);

      topLevel.exit().remove();
  }

  renderLegend() {
    return (
      <Row>
        <Column>
          {this.props.graphs.map((graph, i) => {
            const keyStyle = {
              backgroundColor: graph.color
            };
            return (
              <p key={i} className="legend-key"><span style={keyStyle}></span>{graph.label}</p>
            );
          })}
        </Column>
      </Row>
    );
  }

  render() {
    if (!this.props.targetId && !this.props.id) {
      return false;
    }
    if (!this.props.targetId) {
      return (
        <div>
          <div id={this.props.id} className={`area-graph area-graph-${this.props.id}`} />
          {this.props.legend ? this.renderLegend() : null}
        </div>
      );
    }
    if (this.props.targetId && this.props.legend) {
      return (
        <div>
          {this.props.legend ? this.renderLegend() : null}
        </div>
      );
    }
    return null;
  }
}

AreaGraph.defaultProps = {
  targetId: null,
  cssSelector: null,
  graphs: null,
  colors: ['#2278F1', '#27AE60', '#F2994A'],
  heightRatio: null,
  pointRadius: 3,
  legend: false,
  forecastDays: null,
}

AreaGraph.propTypes = {
  targetId: PropTypes.string.isRequired,
  cssSelector: PropTypes.string,
  graphs: PropTypes.array.isRequired,
  colors: PropTypes.array,
  heightRatio: PropTypes.number,
  pointRadius: PropTypes.number,
  legend: PropTypes.bool,
  forecastDays: PropTypes.number,
}

export default AreaGraph;
