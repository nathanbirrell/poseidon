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
      this.svg.selectAll('.axis-left').remove();

      const num = (x.domain()[1] / this.props.forecastDays);
      let tickValues = [];
      for (let i = 0; i < this.props.forecastDays; i++) {
        tickValues.push(i * 8);
      }
      const bottomAxis = this.svg.append("g")
        .attr('class', 'axis-bottom')
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(x)
          .tickValues(tickValues)
          .tickFormat(function(d) {
            return moment().add((d / num), 'days').format('ddd');
          })
        );
      bottomAxis.selectAll(".tick text").attr("dx", x(3.4));

      const leftAxis = this.svg.append("g")
        .attr('class', 'axis-left')
        .call(
          d3.axisLeft(y)
          .ticks(4)
          .tickSize(-dimensions.width)
          .tickFormat(function(d) {
            return (d*graphs[1].yMax).toFixed(0) + graphs[1].axesSuffix;
          })
        );
      leftAxis.selectAll(".tick text")
        .attr("class", "label-1")
        .attr("x", x(x.domain()[0]))
        .attr("fill", graphs[1].color);
      leftAxis.selectAll(".tick")
        .append('text')
        .attr("class", 'label-2')
        .text(function(d) {
          return (d*graphs[2].yMax).toFixed(0) + graphs[2].axesSuffix;
        })
        .attr("x", x(x.domain()[0]))
        .attr("fill", graphs[2].color);
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
            .attr('fill', function() {
             return !graph.area.flat ? `url(#${targetId}_ratingGradient_${i})` : graph.color;
            })
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
              .attr('class', 'point arrow')
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
            .attr('class', 'point dot')
            .attr('stroke', graph.points.color || graph.color)
            .attr('fill', graph.points.color || graph.color)
            .attr("cx", function(d, i) { return x(i) })
            .attr("cy", function(d, i) { return y(d) })
            .attr("r", graph.points.radius || 1);
        }
      });

      this.svg.selectAll('.day-segment').remove();

      if (parentConfig.vertSegments) {
        const vertSegHeight = y(y.domain()[0]);
        const vertSegData = graphs[0].yVals.map((value, i) => {
          const output = {};
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
              if (modulus <= 1 || modulus >= 6) {
                return '#0D659D';
              }
              return '#ffffff';
            })
            .attr('opacity', function(d, i) {
              const modulus = i%8;
              if (modulus <= 1 || modulus >= 6) {
                return 0.1;
              }
              return 0.01;
            })
            .on('click', this.handleClick)
            .on('mouseover', this.handleMouseOver)
            .on("mouseout", this.handleMouseOut);

        vertSegments.exit().remove();
      }

      this.svg.selectAll('.selected-date-time').remove();
      const selectedDateTimePosition = this.props.selectedDateTimePosition;
      if (selectedDateTimePosition) {
        const selectedDateTimeIndicatorHeight = y(y.domain()[0]);
        const selectedDateTimeIndicator = this.svg
          .append('rect')
          .attr('class', 'selected-date-time')
          .attr('x', function() { return x(selectedDateTimePosition) })
          .attr('y', 0)
          .attr('width', '1px')
          .attr('height', selectedDateTimeIndicatorHeight)
          .attr('fill', function() {
            return '#EB5757';
          })
          .attr('opacity', 1);
      }

      topLevel.exit().remove();
  }

  handleClick(d, i) {
    if (this.props.updateParent) {
      this.props.updateParent(i);
    }
  }

  handleMouseOver(d, i) {
    if (this.props.updateParent) {
      this.props.updateParent(i);
    }
  }

  handleMouseOut(d, i){
    // Mouse out func here
  }

  handleLegendClick(configOption, graph) {
    if (graph) {
      const graphConfigs = this.state.graphConfigs;
      graphConfigs[graph][configOption] = !graphConfigs[graph][configOption];
      this.setState({graphConfigs});
    } else {
      const parentConfig = this.state.parentConfig;
      parentConfig[configOption] = !parentConfig[configOption];
      this.setState({parentConfig});
    }
  }

  renderLegend() {
    return (
      <Row>
        <Column>
        <button className={"btn --slim --secondary " + (this.state.parentConfig['vertSegments'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick('vertSegments')}}>Day/Night</button>
          {this.props.graphs.map((graph, i) => {
            const keyStyle = {
              backgroundColor: graph.color
            };
            return (
              <div key={`${graph.label}_controls`}>
                <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['area'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick('area', i)}}><span style={keyStyle}></span>{graph.label} Area</button>
                <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['line'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick('line', i)}}><span style={keyStyle}></span>{graph.label} Line</button>
                <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['points'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick('points', i)}}><span style={keyStyle}></span>{graph.label} Points</button>
                {graph.directions ?
                  <button className={"legend-key btn --slim --secondary " + (this.state.graphConfigs[i]['directions'] ? '--on' : '--off')} onClick={() => {this.handleLegendClick('directions', i)}}><span style={keyStyle}></span>{graph.label} Directions</button>
                : null}
              </div>
            );
          })}
        </Column>
      </Row>
    );
  }

  render() {
    if (!this.props.targetId) {
      return false;
    }
    let heightRatio = null;
    if (this.props.heightRatio) {
      heightRatio = {
       height: (960 * this.props.heightRatio),
      };
    }
    return (
      <div>
        <div id={this.props.targetId} className="forecast-graph-container" style={heightRatio}></div>
        {this.props.legend ? this.renderLegend() : null}
      </div>
    );
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
  forecastDays: 7,
  showAxes: true,
  updateParent: null,
  selectedDateTimePosition: null,
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
  updateParent: PropTypes.func,
  selectedDateTimePosition: PropTypes.number,
}

export default AreaGraph;
