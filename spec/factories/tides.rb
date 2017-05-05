# == Schema Information
#
# Table name: tides
#
#  id                                 :integer          not null, primary key
#  type                          :string
#  height :decimal(, )
#  date_time                     :string
#  spot_id                            :integer
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#

FactoryGirl.define do
  factory :tide do
    type "MyString"
    height "9.99"
    date_time "MyString"
    spot nil
  end
end
