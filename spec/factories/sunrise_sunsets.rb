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

FactoryGirl.define do
  factory :sunrise_sunset do
    date_time "2017-12-04 08:29:51"
    first_light "2017-12-04 08:29:51"
    sunrise "2017-12-04 08:29:51"
    sunset "2017-12-04 08:29:51"
    last_light "2017-12-04 08:29:51"
  end
end
