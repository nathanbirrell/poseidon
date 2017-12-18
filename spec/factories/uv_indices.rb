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

FactoryGirl.define do
  factory :uv_index do
    date_time "2017-12-04 12:24:02"
    index 1
    scale "MyString"
    spot_id 1
  end
end
