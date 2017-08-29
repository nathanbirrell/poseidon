class WeatherForecast < ApplicationRecord
  self.abstract_class = true

  # Class methods used in a similar way to named scopes
  #   - Not using named scopes here so that when no results are found, we get
  #       nil or an empty array (depends on query)
  #   - this is preffered to the named scope approach of returning ALL records
  #       if no results (this is for chainability).

  def self.current
    where("date_time <= ?", Time.current).order(date_time: :desc).first
  end

  def self.in_three_hours
    where("date_time <= ?", Time.current + 3.hour).order(date_time: :desc).first
  end

  def self.five_day_forecast
    where("date_time >= ?", Date.current).where('date_time <= ?', 5.day.from_now).order(date_time: :asc)
  end

  def self.get_willyweather_forecast(spot, forecast_type)
    spot.set_willyweather_location_id_if_needed

    # ie: https://goo.gl/xfJKpn
    response = RestClient.get(
      "https://api.willyweather.com.au/v2/#{ENV['WILLYWEATHER_API_KEY']}/locations/#{spot.willyweather_location_id}/weather.json",
      {
        params: {
          'forecasts' => forecast_type,
          'days' => 5
        }
      }
    )

    response = JSON.parse(response)
    response
  end

  # Methods used by Swell, Wind, Tide models

  def calculate_angle_between(x, y)
    # Math.atan2(Math.sin(x-y), Math.cos(x-y))
    a = x - y
    a -= 360 if a > 180
    a += 360 if a < -180
    a
  end
end
