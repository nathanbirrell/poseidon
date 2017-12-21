# == Schema Information
#
# Table name: weather_day_summaries
#
#  id                  :integer          not null, primary key
#  date_time           :datetime         not null
#  temp_min            :integer
#  temp_max            :integer
#  precis_code         :string
#  precis              :string
#  precis_overlay_code :string
#  spot_id             :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'rails_helper'

RSpec.describe WeatherDaySummary, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
