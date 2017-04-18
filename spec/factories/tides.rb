# == Schema Information
#
# Table name: tides
#
#  id                                 :integer          not null, primary key
#  tide_type                          :string
#  tide_height_above_sea_level_metres :decimal(, )
#  tide_date_time                     :string
#  spot_id                            :integer
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#

FactoryGirl.define do
  factory :tide do
    tide_type "MyString"
    tide_height_above_sea_level_metres "9.99"
    tide_date_time "MyString"
    spot nil
  end
end
