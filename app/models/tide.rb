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

class Tide < WeatherModel
  # default_scope { order(date_time: :desc) }
  belongs_to :spot
end
