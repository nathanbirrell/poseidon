import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { scroller } from 'react-scroll';

const isNight = (i) => {
  const modulus = i % 8;
  return modulus <= 1 || modulus >= 7;
};

class AreaGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: null,
      hoveredIndex: null,
      parentConfig: {
        axes: this.props.showAxes || false,
        vertSegments: this.props.showVertSegments || true,
      },
      isFirstClick: true,
    };

    this.resizeSensor = null;
    this.graphContainerRef = null;

    this.updateDimensions = this.updateDimensions.bind(this);
    this.initGraph = this.initGraph.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearNodeContents = this.clearNodeContents.bind(this);
    this.handleArrowPress = this.handleArrowPress.bind(this);
  }

  componentDidMount() {
    this.initGraph();

    this.resizeSensor = new ResizeSensor(this.graphContainerRef, this.renderGraph);

    // Needs to be window/global scope so that *every* instance of AreaGraph on the
    //     page check the same value (otherwise we'd get duplicates)
    window.IS_ARROW_KEYS_BOUND = window.IS_ARROW_KEYS_BOUND === undefined ? false : window.IS_ARROW_KEYS_BOUND;

    // Only bind to first instance, make sure false not `undefined`
    if (window.IS_ARROW_KEYS_BOUND === false) {
      document.addEventListener('keydown', this.handleArrowPress);
      window.IS_ARROW_KEYS_BOUND = true;
    }
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  componentWillUnmount() {
    if (this.resizeSensor && this.resizeSensor.detach) {
      this.resizeSensor.detach(this.graphContainerRef, this.renderGraph);
    }

    if (this.graphContainerRef && this.graphContainerRef.resizeSensor) {
      delete this.graphContainerRef.resizeSensor;
    }

    if (window.IS_ARROW_KEYS_BOUND) {
      document.removeEventListener('keydown', this.handleArrowPress);
      window.IS_ARROW_KEYS_BOUND = false;
    }
  }

  updateDimensions() {
    const el = d3.select(`#${this.props.targetId}`);
    return {
      width: parseInt(el.style('width'), 10),
      height: parseInt(el.style('height'), 10)
    };
  }

  initGraph() {
    this.clearNodeContents();
    this.svg = d3.select(`#${this.props.targetId}`).append('svg')
      .attr('preserveAspectRatio','xMinYMin meet')
      .attr('class', this.props.cssSelector);

    const ratingGradient = "<linearGradient id=\"ratingGradient\" gradientTransform=\"rotate(90)\"><stop offset=\"30%\"  stop-color=\"#00de00\"/><stop offset=\"65%\"  stop-color=\"#e0f500\"/><stop offset=\"95%\" stop-color=\"#dd0017\"/></linearGradient>";

    this.renderGraph();
  }

  clearNodeContents() {
    // while (this.graphContainerRef && this.graphContainerRef.hasChildNodes()) {
    //   console.log('clearing fam');
    //   this.graphContainerRef.removeChild(this.graphContainerRef.firstChild);
    // }

    if (this.graphContainerRef && this.graphContainerRef.hasChildNodes()) {
      this.graphContainerRef.innerHTML = '';
    }
  }

  handleArrowPress(event) {
    if (this.state.isArrowPressBound) {
      return;
    }

    const LeftKeyCode = 37;
    const RightKeyCode = 39;
    switch (event.keyCode) {
      case LeftKeyCode:
        this.props.updateParent(this.props.selectedDateTimePosition - 1);
        break;
      case RightKeyCode:
        this.props.updateParent(this.props.selectedDateTimePosition + 1);
        break;
      default:
        break;
    }

    this.setState({ isArrowPressBound: true });
  }

  handleClick(d, i) {
    if (this.props.updateParent) {
      this.props.updateParent(i);
    }

    if (this.state.isFirstClick) {
      scroller.scrollTo('forecast-graph-card', {
        smooth: true,
        offset: -53, // fixed menu height // TODO: retrieve this value from an export
      });

      this.setState({ isFirstClick: false });
    }
  }

  renderGraph() {
    const { graphs, targetId } = this.props;
    const dimensions = this.updateDimensions();
    const { state } = this;
    const { parentConfig } = state;

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
      .attr('viewBox', `0 0 ${dimensions.width} ${height}`);


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


    if (parentConfig.axes) {
      this.svg.selectAll('.axis-bottom').remove();
      this.svg.selectAll('.axis-left').remove();

      const num = (x.domain()[1] / this.props.forecastDays);
      const bottomAxis = this.svg.append('g')
        .attr('class', 'axis-bottom')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x)
          .ticks(graphs[0].yVals.length)
          .tickSize(4)
          .tickFormat((d, i) => {
            const mod = i % 8;
            return mod === 0 ? moment().add((d / num), 'days').format('dddd') : '';
          }));

      bottomAxis.selectAll('.tick')
        .append('text')
        .attr('class', 'tick-subtext')
        .text((d, i) => {
          const mod = i%8;
          return mod === 0 ? moment().add((i / num), 'days').format('D MMM') : '';
        });

      bottomAxis.selectAll('.tick text').attr('dx', x(4));
      bottomAxis.selectAll('.tick line')
        .attr('y2', (d, i) => {
          if (i % 8 === 0) {
            return 10;
          }
          return 5;
        });

      const leftAxis = this.svg.append('g')
        .attr('class', 'axis-left')
        .call(d3.axisLeft(y)
          .ticks(4)
          .tickSize(-dimensions.width) // Horizontal lines
          .tickFormat(function(d) {
            // return (d*graphs[1].yMax).toFixed(0) + graphs[1].axesSuffix;
            return '';
          }));

    //   leftAxis.selectAll('.tick text')
    //     .attr('class', 'label-1')
    //     .attr('x', x(x.domain()[0]))
    //     .attr('fill', graphs[1].color);
    //   leftAxis.selectAll('.tick')
    //     .append('text')
    //     .attr('class', 'label-2')
    //     .text(function(d) {
    //       return (d*graphs[2].yMax).toFixed(0) + graphs[2].axesSuffix;
    //     })
    //     .attr('x', x(x.domain()[0]))
    //     .attr('fill', graphs[2].color);
    }


    const { forecastConfig, selectedDateTimePosition } = this.props;
    const topLevel = this.svg.selectAll('g.graph')
      .data(graphs);

    topLevel.enter()
      .append('g')
      .attr('class', 'graph')
      .merge(topLevel)
      .each(function (graph, i) {
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
        const arrowDimension = 15; // square
        const arrow = `<marker id=\"${targetId}_arrow_${i}\" class=\"arrow\" markerWidth=\"${arrowDimension}\" markerHeight=\"${arrowDimension}\" refX=\"${arrowDimension/3}\" refY=\"${arrowDimension/3}\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M12 2 19 21 12 17 5 21 12 2z\" transform=\"scale(0.45)\" fill=\"#fff\" stroke=\"${graph.color}\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/></marker>`
        const arrowHighlighted = `<marker id=\"${targetId}_arrow_highlighted_${i}\" class=\"arrow\" markerWidth=\"${arrowDimension}\" markerHeight=\"${arrowDimension}\" refX=\"6\" refY=\"6\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M12 2 19 21 12 17 5 21 12 2z\" transform=\"scale(0.5)\" fill=\"#EB5757\" stroke=\"#EB5757\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/></marker>`
        const defs = thisGraph
          .append('defs');
        defs.html(`${colouredGradient} ${arrow} ${arrowHighlighted}`);

        // DRAW NEW GRAPH ELEMENTS
        if (graphs[i].area.show) {
          const areaInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', 'area')
            .attr('fill', function() {
             return !graph.area.flat ? `url(#${targetId}_ratingGradient_${i})` : graph.color;
            })
            .attr('opacity', graph.area.opacity || 1)
            .attr('d', area);
        }

        // Graph line
        if (graphs[i].line.show) {
          const lineInstance = thisGraph
            .append('path')
            .datum(graph.yVals)
            .attr('class', `line ${graphs[i].name}`)
            .attr('stroke', graph.color)
            .attr('stroke-width', graph.line.stroke)
            .attr('stroke-dasharray', () => {
              return graph.line.dashed ? '4, 5' : null;
            })
            .attr('fill', 'none')
            .attr('opacity', graph.line.opacity || 1)
            .attr('d', line);
        }

        if (graphs[i].directions) {
          // DIRECTIONS ARROWS
          const pointsInstance = thisGraph
            .selectAll('.point')
            .data(graph.yVals)
            .enter().append('line')
            .attr('class', 'point arrow')
            .attr('stroke', graph.points.color || graph.color)
            .attr('fill', graph.points.color || graph.color)
            .attr('x1', function(d, i) { return x(i) })
            .attr('y1', function(d, i) { return (y(d)) })
            .attr('x2', function(d, i) { return x(i) })
            .attr('y2', function(d, i) { return (y(d)) })
            .attr('transform', function(d, i) {
              return `rotate(${(graph.directions[i] + 180)} ${x(i)} ${y(d)})`; // +180 converts it into magical weather speak, where the arrow shows the directional opposite to the degrees
            })
            .attr('stroke-width', 1)
            .attr('marker-end', (d, n) => {
              return n === selectedDateTimePosition ? `url(#${targetId}_arrow_highlighted_${i})` : `url(#${targetId}_arrow_${i})`;
            });
        } else if (graphs[i]['points'].show) {
          // REGULAR POINTS
          const pointsInstance = thisGraph
          .selectAll('.point')
            .data(graph.yVals)
            .enter().append('svg:circle')
            .attr('class', 'point dot')
            .attr('stroke', graph.points.color || graph.color)
            .attr('fill', graph.points.color || graph.color)
            .attr('cx', function(d, i) { return x(i) })
            .attr('cy', function(d, i) { return y(d) })
            .attr('r', graph.points.radius || 1);
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
        .data(vertSegData, function (d) {
          return d.modifier;
        });

      vertSegments
        .enter()
          .append('rect')
          .attr('class', 'day-segment')
          .attr('id', function (d, i) { return ('day-seg-' + i) })
          .attr('x', function (d, i) { return x(i - 0.5) })
          .attr('y', 0)
          .attr('width', function (d, i) { return x(1) })
          .attr('height', vertSegHeight)
          .attr('fill', function (d, i) {
            if (forecastConfig.showNightAndDay) {
              if (isNight(i)) {
                return '#0D659D';
              }
            }
            return '#ffffff';
          })
          .attr('opacity', function (d, i) {
            if (forecastConfig.showNightAndDay) {
              if (isNight(i)) {
                return 0.1;
              }
            }
            return 0.01;
          })
          .on('click', this.handleClick);

      vertSegments.exit().remove();
    }

    this.svg.selectAll('.selected-date-time').remove();
    if (selectedDateTimePosition) {
      const selectedDateTimeIndicatorHeight = y(y.domain()[0]);
      const selectedDateTimeIndicator = this.svg
        .append('rect')
        .attr('class', 'selected-date-time')
        .attr('x', function() { return x(selectedDateTimePosition) })
        .attr('y', 0)
        .attr('height', selectedDateTimeIndicatorHeight)
        .attr('fill', function() {
          return '#EB5757';
        })
        .attr('opacity', 1);

      this.svg.selectAll('.selected-date-time-dot').remove();
      for (let n = 0; n < graphs.length; n += 1) {
        const graph = graphs[n];
        if (!graph.directions && (graphs[n].line.show || graphs[n].points.show)) {
          y.domain([0, graph.yMax]);
          this.svg.append('svg:circle')
            .attr('class', 'selected-date-time-dot')
            .attr('stroke', '#EB5757')
            .attr('fill', '#EB5757')
            .attr('cx', function() { return x(selectedDateTimePosition) })
            .attr('cy', function() { return y(graph.yVals[selectedDateTimePosition]) })
            .attr('r', 2);
        }
      }
    }

    topLevel.exit().remove();
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
      <div
        id={this.props.targetId}
        className={`forecast-graph-container ${this.props.targetId}`}
        style={heightRatio}
        ref={(ref) => { this.graphContainerRef = ref; }}
      />
    );
  }
}

AreaGraph.defaultProps = {
  cssSelector: null,
  heightRatio: null,
  forecastDays: 5,
  showAxes: true,
  updateParent: null,
  selectedDateTimePosition: null,
  forecastConfig: null,
};

AreaGraph.propTypes = {
  targetId: PropTypes.string.isRequired,
  cssSelector: PropTypes.string,
  graphs: PropTypes.array.isRequired,
  heightRatio: PropTypes.number,
  forecastDays: PropTypes.number,
  showAxes: PropTypes.bool,
  updateParent: PropTypes.func,
  selectedDateTimePosition: PropTypes.number,
  forecastConfig: PropTypes.object,
};

export default AreaGraph;
