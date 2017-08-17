import React from 'react';
import PropTypes from 'prop-types';

const myData = [100, 50, 15, 30, 60, 100, 70, 60, 40, 80, 60, 100];

class SpotTimeSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.initGraph = this.initGraph.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.initGraph();
  }

  initGraph() {
    var width = 271,
      height = 60;

    var svg = d3.select('#time-slider__input').append('svg')
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
      .attr('preserveAspectRatio','xMinYMin')
      .attr('class', 'time-slider__graph');

    var g = svg.append("g");

    var x = d3.scaleLinear()
      .rangeRound([width, 0]);
    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var area = d3.area()
      .curve(d3.curveBasis)
      .x(function(d, i) { return x(i); })
      .y1(function(d) { return y(d); });

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function(d, i) { return i; })
      .y(function(d) { return y(d); });


    x.domain(d3.extent(myData, function(d, i) { return i; }));
    y.domain([0, d3.max(myData, function(d) { return d; })]);
    area.y0(y(0));

    g.append("path")
        .datum(myData)
        .attr("fill", "#2278F1")
        .attr("d", area);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  showTime(number) {
    let hours = number > 12 ? number - 12 : number;
    let minutes = '30';

    return (
      <span className="time">
        <span>{hours}</span>:<span>{minutes}</span>
      </span>
    );
  }

  render() {
    return (
      <div className="time-slider">
        <div id="time-slider__input" className="time-slider__input">
          <input
            type="range"
            min="6"
            max="18"
            step="1"
            value={this.state.value}
            onChange={this.handleChange}>
          </input>
        </div>
        <div className="time-slider__value --icon-chevron-down--iron">
          {this.showTime(this.state.value)}
          <p className="date">Friday 7</p>
        </div>
      </div>
    );
  }
}

SpotTimeSlider.defaultProps = {
  value: 12,
}

SpotTimeSlider.propTypes = {
  value: PropTypes.number,
}

export default SpotTimeSlider;
