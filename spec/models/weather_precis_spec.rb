# == Schema Information
#
# Table name: weather_precis
#
#  id                  :integer          not null, primary key
#  date_time           :datetime
#  precis_code         :string
#  precis              :string
#  precis_overlay_code :string
#  night               :boolean
#  spot_id             :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'rails_helper'

RSpec.describe WeatherPrecis, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
