import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';

import Row from 'components/Row';
import Column from 'components/Column';

class AreaGraph extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedIndex: null,
      hoveredIndex: null,
      parentConfig: {
        axes: this.props.showAxes || false,
        vertSegments: this.props.showVertSegments || true
      },
      graphConfigs: this.props.graphs.map((g, i) => {
        return {
          area: g.area.show || false,
          line: g.line.show || false,
          points: g.points.show || false,
          directions: g.directions ? true : false,
        }
      })
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.initGraph = this.initGraph.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
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
    const state = this.state;
    const parentConfig = state.parentConfig;
    const graphConfigs = state.graphConfigs;

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


    if (parentConfig['axes']) {
      this.svg.selectAll('.axis-bottom').remove();
      this.svg.selectAll('.axis-right').remove();
  
      const num = (x.domain()[1] / this.props.forecastDays);
      const bottomAxis = this.svg.append("g")
        .attr('class', 'axis-bottom')
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(x)
          .tickValues([0, 8, 16, 24, 32, 40])
          .tickFormat(function(d) {
            return moment().add((d / num), 'days').format('ddd');
          })
        );
      bottomAxis.selectAll(".tick text").attr("dx", x(3.4));
  
      const rightAxis = this.svg.append("g")
        .attr('class', 'axis-right')
        .call(
          d3.axisRight(y)
          .tickSize(dimensions.width)
          .tickFormat(function(d) {
            return d*100;
          })
        );
      rightAxis.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke", "#DDDDDD").attr("stroke-dasharray", "2,2");
      rightAxis.selectAll(".tick text").attr("x", x(x.domain()[1]) - 20);
    }

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
        thisGraph.selectAll('.day-segment').remove();
        thisGraph.selectAll('.day-label').remove();

        // Set gradient
        const colouredGradient = `<linearGradient id=\"${targetId}_ratingGradient_${i}\" gradientTransform=\"rotate(90)\"><stop offset=\"20%\"  stop-color=\"${graph.color}\" stop-opacity=\"0.35\"/><stop offset=\"90%\"  stop-color=\"${graph.color}\" stop-opacity=\"0.1\"/></linearGradient>`;
        const arrow = `<marker id=\"${targetId}_arrow_${i}\" class=\"arrow\" markerWidth=\"7\" markerHeight=\"7\" refX=\"0\" refY=\"2\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,4 L6,2 z\" fill=\"${graph.color}\" /></marker>`
        const defs = thisGraph
          .append('defs');
        defs.html(colouredGradient + " " + arrow);

        // DRAW NEW GRAPH ELEMENTS
        if (graphConfigs[i]['area']) {
          const areaInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', 'area')
            .attr('fill', `url(#${targetId}_ratingGradient_${i})`)
            .attr('opacity', graph.area.opacity || 1)
            .attr("d", area);
        }
        
        if (graphConfigs[i]['line']) {
          const lineInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', 'line')
            .attr('stroke', graph.color)
            .attr('fill', 'none')
            .attr('opacity', graph.line.opacity || 0.5)
            .attr("d", line);
        }

        if (graphConfigs[i]['directions']) {
          // DIRECTIONS ARROWS
          const pointsInstance = thisGraph
            .selectAll('.point')
              .data(graph.yVals)
              .enter().append("line")
              .attr('class', 'point')
              .attr('stroke', graph.points.color || graph.color)
              .attr('fill', graph.points.color || graph.color)
              .attr("x1", function(d, i) { return x(i) })
              .attr("y1", function(d, i) { return (y(d) - 5) })
              .attr("x2", function(d, i) { return x(i) })
              .attr("y2", function(d, i) { return (y(d) + 0)  })
              .attr("transform", function(d, i) {
                return "rotate(" + graph.directions[i] + " " + x(i) + " " + y(d) + ")";
              })
              .attr("stroke-width", 1)
              .attr("marker-end", `url(#${targetId}_arrow_${i})`);
        } else if (graphConfigs[i]['points']) {
          // REGULAR POINTS
          const pointsInstance = thisGraph
          .selectAll('.point')
            .data(graph.yVals)
            .enter().append("svg:circle")
            .attr('class', 'point')
            .attr('stroke', graph.points.color || graph.color)
            .attr('fill', graph.points.color || graph.color)
            .attr("cx", function(d, i) { return x(i) })
            .attr("cy", function(d, i) { return y(d) })
            .attr("r", graph.points.radius || 1);
        }
      });
      
      const vertSegHeight = y(y.domain()[0]);
      const vertSegData = graphs[0].yVals.map((value, i) => {
        const output = {};
        // console.log(state, i, state.hoveredIndex == i);
        if (state.selectedIndex == i) {
          output.modifier = 'selected';
        } else if (state.hoveredIndex == i) {
          output.modifier = 'hovered';
        } else {
          output.modifier = '';
        }
        output.value = value;
        return output;
      });

      const vertSegments = this.svg
        .selectAll('.day-segment')
          .data(vertSegData, function(d){
            return d.modifier;
          });

      vertSegments
        .enter()
          .append('rect')
          .attr('class', 'day-segment')
          .attr('id', function(d, i) {return ('day-seg-' + i) })
          .attr('x', function(d, i) { return x(i - 0.5) })
          .attr('y', 0)
          .attr('width', function(d, i) { return x(1) })
          .attr('height', vertSegHeight)
          .attr('fill', function(d, i) {
            const modulus = i%8;
            if (d.modifier === 'selected') {
              return 'red';
            } else if (d.modifier === 'hovered') {
              return 'yellow';
            } else if (modulus <= 1 || modulus >= 6) {
              return '#0D659D';
            }
            return 'white';
          })
          .attr('opacity', 0.15)
          .on('click', this.handleClick)
          .on('mouseover', this.handleMouseOver)
          .on("mouseout", this.handleMouseOut);

      vertSegments.exit().remove();
      topLevel.exit().remove();
  }

  handleClick(d, i) {
    console.log('click: ', d, i);
    this.setState({
      selectedIndex: i
    });
  }

  handleMouseOver(d, i) {
    console.log('mouseover: ', d, i);
    this.setState({
      hoveredIndex: i
    });
  }

  handleMouseOut(d, i){
    console.log('mouseout: ', d, i);
  }

  handleLegendClick(graph, configOption) {
    const graphConfigs = this.state.graphConfigs;
    graphConfigs[graph][configOption] = !graphConfigs[graph][configOption];
    this.setState({graphConfigs});
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
              <div key={`${graph.label}_controls`}>
                <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['area'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick(i, 'area')}}><span style={keyStyle}></span>{graph.label} Area</button>
                <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['line'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick(i, 'line')}}><span style={keyStyle}></span>{graph.label} Line</button>
                <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['points'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick(i, 'points')}}><span style={keyStyle}></span>{graph.label} Points</button>
                {graph.directions ?
                  <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['directions'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick(i, 'directions')}}><span style={keyStyle}></span>{graph.label} Directions</button>
                : null}
              </div>
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
  showAxes: true,
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
  showAxes: PropTypes.bool,
}

export default AreaGraph;
