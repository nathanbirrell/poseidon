# == Schema Information
#
# Table name: sunrise_sunsets
#
#  id          :integer          not null, primary key
#  date_time   :datetime
#  spot_id     :integer
#  first_light :datetime
#  sunrise     :datetime
#  sunset      :datetime
#  last_light  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe SunriseSunset, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
