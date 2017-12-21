# == Schema Information
#
# Table name: tides
#
#  id         :integer          not null, primary key
#  tide_type  :string
#  height     :decimal(, )
#  spot_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date_time  :datetime
#

class Tide < ForecastModel
  belongs_to :spot

  scope :last_tide, -> () {
    where("date_time <= ?", Time.current).order(date_time: :desc).first
  }
  scope :next_tide, -> () {
    where("date_time >= ?", Time.current).order(date_time: :asc).first
  }

  scope :tide_before, lambda { |date_time, spot_id|
    where(spot_id: spot_id)
      .where('date_time <= ?', date_time)
      .order(date_time: :desc)
      .first
  }
  scope :tide_after, lambda { |date_time, spot_id|
    where(spot_id: spot_id)
      .where('date_time >= ?', date_time)
      .order(date_time: :asc)
      .first
  }

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::TideForecasts.fetch(spot)
    forecasts.save_entries
  end

  # Consider a snapshot like an instance of Tide, but for a specific time
  # See tide/tide_snapshot.rb for more
  def self.get_snapshots(date_times, spot)
    # get a TideSnapshot for each date_times
    snapshots = []

    date_times.each do |date_time|
      snapshots << TideSnapshot.new(date_time, spot)
    end

    snapshots
  end

  def self.get_hourly_snapshots(spot, days)
    forecast_length = days - 1 # Retreiving to the end of the 4th day ahead
    snapshots = []
    date_time = Date.current.beginning_of_day + 2.hour # Our forecasts start at 2am

    loop do
      snapshots << TideSnapshot.new(date_time, spot)
      date_time += 1.hour
      break if date_time >= forecast_length.day.from_now.end_of_day
    end

    snapshots
  end

  def self.current_snapshot(spot)
    TideSnapshot.new(Time.current, spot)
  end

  def to_builder
    Jbuilder.new do |tide|
      tide.tide_type tide_type
      tide.height height
      tide.date_time date_time
    end
  end
end
