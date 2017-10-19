import MathUtil from 'lib/MathUtil';

class SpotUtil {
  constructor() {
    this.windKphToDescription = this.windKphToDescription.bind(this);
    this.swellFeetToDescription = this.swellFeetToDescription.bind(this);
  }

  static getVerdict(rating) {
    let output = '';
    if (rating >= 75) {
      output = 'positive';
    } else if (rating >= 50) {
      output = 'mixed';
    } else if (rating < 50) {
      output = 'negative';
    }
    return output;
  }

  static getPotential(rating) {
    let output = '';
    if (rating >= 75) {
      output = 'high';
    } else if (rating >= 50) {
      output = 'avg';
    } else if (rating < 50) {
      output = 'low';
    }
    return output;
  }

  static getRatingColor(rating) {
    return `hsl(${(Math.pow(rating, 2) + (7 * rating)) * 0.8},${(-1.8 * (Math.pow(rating, 2)) + (17 * rating) + 110) * 0.60}%,50%)`;
  }

  static metresToFeet(number) {
    return (number * 3.28084);
  }

  static kphToKnots(number) {
    return (number * 0.539957);
  }

  static degreesToText(degrees) {
    let output;
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    output = (degrees / 22.5) + 0.5;
    output = MathUtil.round(output, 0);
    return directions[(output % 16)];
  }

  static matchValueToDescription(number, values, descriptions) {
    let output = '';
    if (number) {
      for(let i = 0; i < values.length; i++) {
        if (number <= values[i]) {
          output = descriptions[i-1];
          break;
        }
      }
    } else {
      output = descriptions[0];
    }
    return output;
  }

  static windKphToDescription(wind_kph) {
    const speeds = [0, 2, 12, 39, 49, 62, 87, 117, 135];
    const descriptions = ['Calm', 'Light','Moderate', 'Fresh', 'Strong', 'Gale', 'Storm', 'Hurricane'];
    return this.matchValueToDescription(wind_kph, speeds, descriptions);
  }

  static swellFeetToDescription(wave_feet) {
    const heights = [0, 1, 3, 4, 5, 6.5, 8, 10, 15];
    const descriptions = ['Flat', 'Knee-waist high','Chest-shoulder high', 'Head high', 'Overhead', 'Well overhead', 'Double overhead', 'Epic (double-to-triple overhead)'];
    return this.matchValueToDescription(wave_feet, heights, descriptions);
  }

  static tideDescription(last_tide_type) {
    return last_tide_type === 'low' ? 'Incoming' : 'Outgoing';
  }

  static getRocDirection(value) {
    return value > 0 ? 'right' : 'left';
  }
}

export default SpotUtil;
