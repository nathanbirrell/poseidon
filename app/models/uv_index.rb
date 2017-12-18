# == Schema Information
#
# Table name: uv_indices
#
#  id         :integer          not null, primary key
#  date_time  :datetime         not null
#  uv_index   :float
#  scale      :string
#  spot_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UvIndex < ForecastModel
  belongs_to :spot

  validates :uv_index, :inclusion => { :in => 0..20 }

  def self.update_forecasts(spot)
    spot.set_willyweather_location_id_if_needed # TODO - move into WW client too
    forecasts = WillyweatherClient::UvIndexForecasts.fetch(spot)
    forecasts.save_entries
  end
end
