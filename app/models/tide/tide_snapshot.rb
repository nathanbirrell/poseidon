class Tide
  class TideSnapshot
    attr_reader :date_time, :height, :state, :spot_id

    def initialize(date_time, :spot_id)
      tide_before = tides.tide_before(date_time)
      tide_after = tides.tide_after(date_time)
      @date_time = date_time
      @spot_id = spot_id
      # TODO - Calculate height
      # TODO - bring current-tide-related methods into here
    end
  end
end