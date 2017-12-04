FactoryGirl.define do
  factory :weather_preci, class: 'WeatherPrecis' do
    date_time "2017-12-04 12:14:57"
    precis_code "MyString"
    precis "MyString"
    precis_overlay_code "MyString"
    night false
    spot_id 1
  end
end
