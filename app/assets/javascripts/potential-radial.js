// Inspired by https://codepen.io/shellbryson/pen/KzaKLe

$(document).ready(function() {
  var ratingElements = $('.potential-radial__circle-element');

  var initRatingElement = function(index, wrapper) {
    var start = 0;
    var end = parseFloat(wrapper.dataset.percentage);

    var colours = {
      fill: wrapper.dataset.fillColour,
      track: wrapper.dataset.trackColour,
      stroke: wrapper.dataset.strokeColour,
    }

    var radius = wrapper.dataset.radius;
    var border = wrapper.dataset.trackWidth;
    var strokeSpacing = wrapper.dataset.strokeSpacing;
    var endAngle = Math.PI * 2;
    var formatText = d3.format('d');
    var boxSize = radius * 2;
    var count = end;
    var progress = start;
    var step = end < start ? -0.01 : 0.01;

    //Define the circle
    var circle = d3.arc()
      .startAngle(0)
      .innerRadius(radius)
      .outerRadius(radius - border);

    //setup SVG wrapper
    var svg = d3.select(wrapper)
      .append('svg')
      .attr('width', boxSize)
      .attr('height', boxSize);

    // ADD Group container
    var g = svg.append('g')
      .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

    //Setup track
    var track = g.append('g').attr('class', 'radial-progress');
    track.append('path')
      .attr('class', 'radial-progress__background')
      .attr('fill', colours.track)
      .attr('stroke', colours.stroke)
      .attr('stroke-width', strokeSpacing + 'px')
      .attr('d', circle.endAngle(endAngle));

    //Add colour fill
    var value = track.append('path')
      .attr('class', 'radial-progress__value')
      .attr('fill', colours.fill)
      .attr('stroke', colours.stroke)
      .attr('stroke-width', strokeSpacing + 'px');

    //Add text value
    var numberText = track.append('text')
      .attr('class', 'radial-progress__text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.85rem');

    function update(progress) {
      //update position of endAngle
      value.attr('d', circle.endAngle(endAngle * progress));
      //update text value
      numberText.text(formatText(progress * 100));
    }

    (function iterate() {
      //call update to begin animation
      update(progress);
      if (count > 0) {
        //reduce count till it reaches 0
        count--;
        //increase progress
        progress += step;
        //Control the speed of the fill
        setTimeout(iterate, 5);
      }
    })();
  }

  ratingElements.each(initRatingElement);
});
