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
    # Get from 4AM onwards
    where('date_time >= ?', Date.current.beginning_of_day)
    .where('date_time <= ?', 4.day.from_now.end_of_day)
    .order(date_time: :asc)
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
