class Tide
  class TideSnapshot
    include Math
    require 'poseidon_math'

    attr_reader :date_time
    attr_reader :spot
    attr_reader :height
    attr_reader :state
    attr_reader :shift_rate
    attr_reader :tide_before
    attr_reader :tide_after
    attr_reader :low_tide
    attr_reader :high_tide
    attr_reader :rating

    def initialize(date_time, spot)
      @date_time = date_time
      @spot = spot
      @tide_before = Tide.tide_before(date_time, @spot.id)
      @tide_after = Tide.tide_after(date_time + 1.hour, @spot.id)
      @poseidon_math = PoseidonMath.new
      # begin
        set_tidal_range
        set_tide_period
        set_height
        set_state
        set_shift_rate
        calculate_rating
      # rescue
        # puts('Tide snapshot instansiation failed, likely missing tide_before or tide_after records')
      # end
    end

    # Try not to use for more than 6 hours, we will have new data by then anyway
    def height_in_x_hours(hours)
      tide_in_x = 0
      if @tide_before.tide_type == 'low'
        tide_in_x = (@tidal_range / 2) * sin((2 * PI / @tide_period) * tide_delta_time(hours) - PI / 2) + (@tidal_range / 2 + low_tide.height)
      elsif @tide_before.tide_type == 'high'
        tide_in_x = (@tidal_range / 2) * sin((2 * PI / @tide_period) * tide_delta_time(hours) + PI / 2) + (@tidal_range / 2 + low_tide.height)
      end
      tide_in_x.round(2)
    end

    # convenience methods to determine and return which tide is low/high
    def low_tide
      @tide_before.height < @tide_after.height ? @tide_before : @tide_after
    end
    def high_tide
      @tide_before.height > @tide_after.height ? @tide_before : @tide_after
    end

    def to_builder
      Jbuilder.new do |tide_snapshot|
        tide_snapshot.date_time date_time
        tide_snapshot.height height
        tide_snapshot.state state
        tide_snapshot.shift_rate shift_rate
        tide_snapshot.rating rating
      end
    end

    private

    def set_tidal_range
      @tidal_range ||= high_tide.height - low_tide.height
    end

    def set_tide_period
      period = @tide_after.date_time.localtime.to_i - @tide_before.date_time.localtime.to_i
      (period /= 60.0).to_f
      (period /= 60.0).to_f # TODO: ask Taylor if this needs to be done twice ??
      period *= 2
      @tide_period = period.round(2)
    end

    def set_height
      @height = height_in_x_hours(0)
    end

    def set_state
      @state = 'INCOMING' if @tide_before.tide_type == 'low'
      @state = 'OUTGOING' if @tide_before.tide_type == 'high'
    end

    def tide_delta_time(forecast_hours)
      # TODO: I think we should use Time.current below
      delta_time = (@date_time + forecast_hours.hours).to_i - @tide_before.date_time.localtime.to_i
      (delta_time /= 60.0).to_f
      (delta_time /= 60.0).to_f # TODO: ask Taylor if this needs to be done twice ??
      delta_time.round(3)
    end

    def set_shift_rate
      vals = %w[slow medium fast fast medium slow]
      sixth = ((tide_delta_time(0) / (@tide_period / 2)) / (1 / 6)).floor
      @shift_rate = vals[sixth]
    end

    def calculate_rating
      if @spot.works_on_all_tides?
        @rating = 100
      else
        @rating = @poseidon_math.rating_given_x(
          min_x: @spot.tide_optimal_max_metres,
          max_x: @spot.tide_optimal_min_metres,
          x_value: @height
        )
      end
    end

    # TODO: implement or delete this, depending on whether it gets used or not
    # def time_till_next_tide_hours
    #   time = ((next_tide.date_time.localtime.to_i - Time.zone.now.to_i) / 60 / 60)
    #   time.round(3)
    # end
  end
end