class SpotsController < ApplicationController
  before_action :set_spot, only: [:show, :edit, :update, :destroy]
  before_action :set_region, only: [:show]
  before_action :set_forecasts, only: [:show]

  # GET /spots
  # GET /spots.json
  def index
    @spots = Spot.all
  end

  # GET /spots/1
  # GET /spots/1.json
  def show
    if Rails.env.development? && ENV['SLACK_API_TOKEN']
      slack_client = Slack::Web::Client.new
      slack_message = "Spot ##{@spot.id}, #{@spot.name}, ran with *Aggregate*: #{@spot.current_potential}%, *Swell* :ocean:: #{@spot.current_swell.rating}%, *Wind* :dash:: #{@spot.current_wind.rating}%, *Tide* :crescent_moon:: #{@spot.current_tide_rating}%"
      slack_client.chat_postMessage(channel: "#devbot", text: slack_message, as_user: true)
    end
  end

  # GET /spots/new
  def new
    @spot = Spot.new
  end

  # GET /spots/1/edit
  def edit
  end

  # POST /spots
  # POST /spots.json
  def create
    @spot = Spot.new(spot_params)

    respond_to do |format|
      if @spot.save
        format.html { redirect_to @spot, notice: 'Spot was successfully created.' }
        format.json { render :show, status: :created, location: @spot }
      else
        format.html { render :new }
        format.json { render json: @spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /spots/1
  # PATCH/PUT /spots/1.json
  def update
    respond_to do |format|
      if @spot.update(spot_params)
        format.html { redirect_to @spot, notice: 'Spot was successfully updated.' }
        format.json { render :show, status: :ok, location: @spot }
      else
        format.html { render :edit }
        format.json { render json: @spot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /spots/1
  # DELETE /spots/1.json
  def destroy
    @spot.destroy
    respond_to do |format|
      format.html { redirect_to spots_url, notice: 'Spot was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_spot
      @spot = Spot.find(params[:id])
    end

    def set_region
      @region = Region.find(@spot.region_id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def spot_params
      params.require(:spot).permit(:name, :description, :season, :created_at, :updated_at, :latitude, :longitude, :image, :region_id, :tide_optimal_min_metres, :tide_optimal_max_metres, :swell_optimal_size_min_metres, :swell_optimal_size_max_metres, :swell_optimal_direction, :swell_optimal_direction_max_variance, :wind_optimal_strength_min_kmh, :wind_optimal_strength_max_kmh, :wind_optimal_direction, :wind_optimal_direction_max_variance, :wave_model_lat, :wave_model_lon, :willyweather_location_id, :weighting_swell, :weighting_wind, :weighting_tide, :wave_model_size_coefficient)
    end

    def set_forecasts
      @forecasts_swells = @spot.swells.five_day_forecast(@spot.id)
      @forecasts_winds = @spot.winds.five_day_forecast(@spot.id)
      @forecasts_tides = @spot.tides.five_day_forecast(@spot.id)
    end
end
