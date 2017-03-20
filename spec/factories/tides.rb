FactoryGirl.define do
  factory :tide do
    tide_type "MyString"
    tide_height_above_sea_level_metres "9.99"
    tide_date_time "MyString"
    spot nil
  end
end
