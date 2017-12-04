FactoryGirl.define do
  factory :weather_day_summary do
    date_time "2017-12-04 12:06:05"
    temp_min 1
    temp_max 1
    precis_code "MyString"
    precis "MyString"
    precis_overlay_code "MyString"
    spot_id 1
  end
end
