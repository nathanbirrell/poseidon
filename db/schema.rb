# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170504094302) do

  create_table "observations", force: :cascade do |t|
    t.decimal  "swell_size_metres"
    t.decimal  "swell_period_seconds"
    t.integer  "swell_direction_degrees"
    t.decimal  "wind_strength_kmh"
    t.integer  "wind_direction_degrees"
    t.integer  "spot_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.decimal  "tide_height_metres"
    t.datetime "axes_reftime"
    t.datetime "axes_time"
    t.decimal  "axes_lat"
    t.decimal  "axes_lon"
    t.index ["spot_id"], name: "index_observations_on_spot_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "country"
    t.string   "state"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "spots", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "season"
    t.datetime "created_at",                                                   null: false
    t.datetime "updated_at",                                                   null: false
    t.decimal  "latitude",                            precision: 10, scale: 6
    t.decimal  "longitude",                           precision: 10, scale: 6
    t.string   "image"
    t.integer  "region_id"
    t.decimal  "tide_optimal_min_metres"
    t.decimal  "tide_optimal_max_metres"
    t.decimal  "swell_optimal_size_min_metres"
    t.decimal  "swell_optimal_size_max_metres"
    t.decimal  "swell_optimal_period_seconds"
    t.integer  "swell_optimal_direction_min_degrees"
    t.integer  "swell_optimal_direction_max_degrees"
    t.decimal  "wind_optimal_strength_min_kmh"
    t.decimal  "wind_optimal_strength_max_kmh"
    t.integer  "wind_optimal_direction_min_degrees"
    t.integer  "wind_optimal_direction_max_degrees"
    t.decimal  "wave_model_lat"
    t.decimal  "wave_model_lon"
    t.integer  "willyweather_location_id"
    t.index ["region_id"], name: "index_spots_on_region_id"
  end

  create_table "tides", force: :cascade do |t|
    t.string   "tide_type"
    t.decimal  "tide_height_above_sea_level_metres"
    t.string   "tide_date_time"
    t.integer  "spot_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.index ["spot_id"], name: "index_tides_on_spot_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "winds", force: :cascade do |t|
    t.decimal  "speed"
    t.integer  "direction"
    t.string   "direction_text"
    t.datetime "date_time"
    t.integer  "spot_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["spot_id"], name: "index_winds_on_spot_id"
  end

end
