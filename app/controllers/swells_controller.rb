class SwellsController < ApplicationController
    # GET /swells/1.json
    def show
        @swell = Swell.find(params[:id])
    end
  end
