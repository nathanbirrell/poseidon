class WeatherModel < ApplicationRecord
  self.abstract_class = true

  def sup
    puts "this is coming from an abstract WeatherModel class, shared by Swell, Tide and Wind"
  end
end
