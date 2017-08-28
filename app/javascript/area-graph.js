import React from 'react';
import PropTypes from 'prop-types';

class AreaGraph extends React.Component {
  constructor (props) {
    super(props);

    this.renderGraph = this.renderGraph.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.renderGraph();
  }

  updateDimensions() {
    const el = d3.select(`#${this.props.targetId}`);
    return {
      width: parseInt(el.style('width'), 10),
      height: parseInt(el.style('height'), 10)
    };
  }

  renderGraph() {
    const graphs = this.props.graphs;
    const dimensions = this.updateDimensions();

    const x = d3.scaleLinear()
      .rangeRound([dimensions.width, 0]);
    const y = d3.scaleLinear()
      .rangeRound([dimensions.height, 0]);

    const area = d3.area()
      .curve(d3.curveBasis)
      .x(function(d, i) { return x(i); })
      .y1(function(d) { return y(d); });

    const line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d, i) { return x(i); })
      .y(function(d) { return y(d); });

    const svg = d3.select(`#${this.props.targetId}`).append('svg')
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox','0 0 '+Math.min(dimensions.width,dimensions.height)+' '+Math.min(dimensions.width,dimensions.height))
      .attr('preserveAspectRatio','xMinYMin')
      .attr('class', this.props.cssSelector);

    for (let i = 0, len = graphs.length; i < len; i++) {
      const g = svg.append("g");

      x.domain(d3.extent(graphs[i].yVals, function(d, i) { return i; }));
      // y.domain([0, d3.max(graphs[i].yVals, function(d) { return d; })]);
      y.domain([0, 100]);
      area.y0(y(0));

      if (graphs[i].area) {
        g.append('path')
          .datum(graphs[i].yVals)
          .attr('fill', graphs[i].color || this.props.colors[i])
          .attr('opacity', graphs[i].area.opacity || 0.18)
          .attr("d", area);
      }

      if (graphs[i].line) {
        g.append('path')
          .datum(graphs[i].yVals)
          .attr('stroke', graphs[i].color || this.props.colors[i])
          .attr('fill', 'none')
          .attr('opacity', graphs[i].line.opacity || 0.5)
          .attr("d", line);
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
}

AreaGraph.propTypes = {
  targetId: PropTypes.string.isRequired,
  cssSelector: PropTypes.string,
  graphs: PropTypes.array.isRequired,
  colors: PropTypes.array,
}

export default AreaGraph;
