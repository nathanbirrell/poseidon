import React from 'react';
import PropTypes from 'prop-types';

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

    this.renderGraph();
  }

  renderGraph() {
    const graphs = this.props.graphs;
    const dimensions = this.updateDimensions();

    console.log('rendering with ', dimensions);

    const x = d3.scaleLinear()
      .rangeRound([dimensions.width, 0]);
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

    for (let i = 0, len = graphs.length; i < len; i++) {
      const g = this.svg.append("g");

      x.domain(d3.extent(graphs[i].yVals, function(d, i) { return i; }));
      // y.domain([0, d3.max(graphs[i].yVals, function(d) { return d; })]);
      y.domain([0, 100]);
      area.y0(y(0));

      if (graphs[i].area.show) {
        g.append('path')
          .datum(graphs[i].yVals)
          .attr('fill', graphs[i].color || this.props.colors[i])
          .attr('opacity', graphs[i].area.opacity || 0.18)
          .attr("d", area);
      }

      if (graphs[i].line.show) {
        g.append('path')
          .datum(graphs[i].yVals)
          .attr('stroke', graphs[i].color || this.props.colors[i])
          .attr('fill', 'none')
          .attr('opacity', graphs[i].line.opacity || 0.5)
          .attr("d", line);
      }

      if (graphs[i].points.show) {
        this.svg.selectAll(".point")
          .data(graphs[i].yVals)
          .enter().append("svg:circle")
          .attr('stroke', graphs[i].points.color || graphs[i].color || this.props.colors[i])
          .attr('fill', graphs[i].points.color || graphs[i].color || this.props.colors[i])
          .attr("cx", function(d, i) { return x(i) })
          .attr("cy", function(d, i) { return y(d) })
          .attr("r", graphs[i].points.radius);
        }
    }
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
