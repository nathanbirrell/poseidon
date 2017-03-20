FactoryGirl.define do
  factory :observation do
    swell_size_metres "9.99"
    swell_period_seconds "9.99"
    swell_direction_degrees 1
    wind_strength_kmh "9.99"
    wind_direction_degrees 1
    tide_height_metres "MyString"
    spot nil
  end
end
