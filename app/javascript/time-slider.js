const myData = [10, 25, 15, 30, 60, 95, 70, 60, 40, 80, 60, 75];
const containerElement = document.querySelector('#time-slider__input');

class TimeSlider {
  constructor () {
    this.initGraph.bind(this);
    this.initGraph();
  }

  initGraph() {
    var width = 295,
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
}

export default TimeSlider;
