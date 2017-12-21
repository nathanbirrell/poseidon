export const WeatherPrecisCodes = {
  FINE: 'fine',
  MOSTLY_FINE: 'mostly-fine',
  HIGH_CLOUD: 'high-cloud',
  PARTLY_CLOUDY: 'partly-cloudy',
  MOSTLY_CLOUDY: 'mostly-cloudy',
  CLOUDY: 'cloudy',
  OVERCAST: 'overcast',
  SHOWER_OR_TWO: 'shower-or-two',
  CHANCE_SHOWER_FINE: 'chance-shower-fine',
  CHANCE_SHOWER_CLOUD: 'chance-shower-cloud',
  DRIZZLE: 'drizzle',
  FEW_SHOWERS: 'few-showers',
  SHOWERS_RAIN: 'showers-rain',
  HEAVY_SHOWERS_RAIN: 'heavy-showers-rain',
  CHANCE_THUNDERSTORM_FINE: 'chance-thunderstorm-fine',
  CHANCE_THUNDERSTORM_CLOUD: 'chance-thunderstorm-cloud',
  CHANCE_THUNDERSTORM_SHOWERS: 'chance-thunderstorm-showers',
  THUNDERSTORM: 'thunderstorm',
  CHANCE_SNOW_FINE: 'chance-snow-fine',
  CHANCE_SNOW_CLOUD: 'chance-snow-cloud',
  SNOW_AND_RAIN: 'snow-and-rain',
  LIGHT_SNOW: 'light-snow',
  SNOW: 'snow',
  HEAVY_SNOW: 'heavy-snow',
  WIND: 'wind',
  FROST: 'frost',
  FOG: 'fog',
  HAIL: 'hail',
  DUST: 'dust'
};

export const mapCodeToIcon = (code) => {
  switch (code) {
    case WeatherPrecisCodes.HIGH_CLOUD:
    case WeatherPrecisCodes.PARTLY_CLOUDY:
    case WeatherPrecisCodes.MOSTLY_CLOUDY:
    case WeatherPrecisCodes.CLOUDY:
    case WeatherPrecisCodes.OVERCAST:
    case WeatherPrecisCodes.CHANCE_SHOWER_FINE:
    case WeatherPrecisCodes.CHANCE_SHOWER_CLOUD:
    case WeatherPrecisCodes.CHANCE_THUNDERSTORM_CLOUD:
    case WeatherPrecisCodes.FROST:
    case WeatherPrecisCodes.FOG:
      return 'cloud';
      break;
    case WeatherPrecisCodes.WIND:
      return 'wind';
      break;
    case WeatherPrecisCodes.SHOWER_OR_TWO:
    case WeatherPrecisCodes.DRIZZLE:
      return 'cloud-drizzle';
      break;
    case WeatherPrecisCodes.FEW_SHOWERS:
    case WeatherPrecisCodes.SHOWERS_RAIN:
    case WeatherPrecisCodes.CHANCE_THUNDERSTORM_SHOWERS:
    case WeatherPrecisCodes.HEAVY_SHOWERS_RAIN:
      return 'cloud-rain';
      break;
    case WeatherPrecisCodes.THUNDERSTORM:
      return 'cloud-lightning';
      break;
    case WeatherPrecisCodes.LIGHT_SNOW:
    case WeatherPrecisCodes.SNOW:
    case WeatherPrecisCodes.HEAVY_SNOW:
      return 'cloud-snow';
      break;
    case WeatherPrecisCodes.FINE:
    case WeatherPrecisCodes.MOSTLY_FINE:
    case WeatherPrecisCodes.CHANCE_THUNDERSTORM_FINE:
    default:
      return 'sun';
      break;
  }
};