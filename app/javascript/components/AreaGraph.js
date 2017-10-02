import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

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
    y.domain([0, 100]);
    area.y0(y(0));

    const topLevel = this.svg.selectAll('g.graph')
      .data(graphs);

    topLevel.enter()
      .append('g')
      .attr('class', 'graph')
      .merge(topLevel)
      .each(function(graph, i) {
        const thisGraph = d3.select(this);

        // REMOVE PREVIOUS GRAPH ELEMENTS
        thisGraph.selectAll('defs').remove();
        thisGraph.selectAll('.area').remove();
        thisGraph.selectAll('.line').remove();
        thisGraph.selectAll('.point').remove();

        // Set gradient
        const colouredGradient = `<linearGradient id=\"${targetId}_ratingGradient_${i}\" gradientTransform=\"rotate(90)\"><stop offset=\"20%\"  stop-color=\"${graph.color}\" stop-opacity=\"0.9\"/><stop offset=\"90%\"  stop-color=\"${graph.color}\" stop-opacity=\"0.25\"/></linearGradient>`;
        const defs = thisGraph
          .append('defs');
        
        defs.html(colouredGradient);

        // DRAW NEW GRAPH ELEMENTS
        const areaInstance = thisGraph
          .append('path')
          .datum(graph.yVals)
          .attr('class', 'area')
          .attr('fill', `url(#${targetId}_ratingGradient_${i})`)
          .attr('opacity', graph.area.opacity || 0.25)
          .attr("d", area);

        const lineInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', 'line')
            .attr('stroke', graph.color)
            .attr('fill', 'none')
            .attr('opacity', graph.line.opacity || 0.5)
            .attr("d", line);

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
      });

      topLevel.exit().remove();
  }

  render() {
    if (!this.props.targetId || !this.props.id) {
      return false;
    }
    if (!this.props.targetId) {
      return (
        <div id={this.props.id} className={`area-graph area-graph-${this.props.id}`} />
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
}

AreaGraph.propTypes = {
  targetId: PropTypes.string.isRequired,
  cssSelector: PropTypes.string,
  graphs: PropTypes.array.isRequired,
  colors: PropTypes.array,
  heightRatio: PropTypes.number,
  pointRadius: PropTypes.number,
}

export default AreaGraph;
