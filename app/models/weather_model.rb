class WeatherModel < ApplicationRecord
  self.abstract_class = true

  scope :current, -> (spot_id) {
    where(spot_id: spot_id).where("date_time <= ?", Time.current).order(date_time: :desc).first
  }

  scope :five_day_forecast, -> (spot_id) {
    where(spot_id: spot_id).where("date_time >= ?", Date.current).where('date_time <= ?', 5.day.from_now).order(date_time: :asc)
  }
end
