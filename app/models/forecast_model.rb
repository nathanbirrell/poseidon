class ForecastModel < ApplicationRecord
  self.abstract_class = true

  # Class methods used in a similar way to named scopes
  #   - Not using named scopes here so that when no results are found, we get
  #       nil or an empty array (depends on query)
  #   - this is preffered to the named scope approach of returning ALL records
  #       if no results (this is for chainability).

  def self.current
    # NOTE: Need to unscope due to default_scope above
    last_record = where('date_time <= ?', Time.current).order(date_time: :desc).first
    next_record = where('date_time >= ?', Time.current).order(date_time: :asc).first

    time_since_last = (last_record.date_time.to_i - Time.current.to_i).abs
    time_to_next = (next_record.date_time.to_i - Time.current.to_i).abs

    return last_record if time_to_next > time_since_last
    next_record
  end

  def self.in_three_hours
    # NOTE: Need to unscope due to default_scope above
    where('date_time <= ?', Time.current + 3.hour)
      .order(date_time: :desc)
      .first
  end

  def self.week_forecast(days = 5)
    forecast_length = days - 1 # Retreiving to the end of the 4th day ahead
    where('date_time >= ?', Date.current.beginning_of_day)
      .where('date_time <= ?', forecast_length.day.from_now.end_of_day) # 5 day forecast
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
