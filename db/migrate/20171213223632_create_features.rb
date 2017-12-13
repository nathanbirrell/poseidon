class CreateFeatures < ActiveRecord::Migration[5.1]
  def change
    create_table :features do |t|
      t.string :key, null: false
      t.string :value
      t.string :friendly_name
      t.string :icon
    end

    create_table :spots_features, id: false do |t|
      t.belongs_to :feature, index: true
      t.belongs_to :spots, index: true
    end
  end

  def up
    Feature.create!(
      [
        { key: 'WAVE_DIRECTION', value: 'LEFT', friendly_name: 'Left hander', icon: null },
        { key: 'WAVE_DIRECTION', value: 'RIGHT', friendly_name: 'Right hander', icon: null },
        { key: 'WAVE_DIRECTION', value: 'LEFT_AND_RIGHT', friendly_name: 'Lefts and rights', icon: null },
        { key: 'BREAK_TYPE', value: 'POINT', friendly_name: 'Point break', icon: null },
        { key: 'BREAK_TYPE', value: 'BEACH', friendly_name: 'Beachie', icon: null },
        { key: 'BREAK_FLOOR', value: 'SAND', friendly_name: 'Sand', icon: null },
        { key: 'BREAK_FLOOR', value: 'REEF', friendly_name: 'Reef', icon: null },
        { key: 'SWELL_EXPOSURE', value: 'HIGH', friendly_name: 'Swell magnet', icon: null },
        { key: 'SWELL_EXPOSURE', value: 'LOW', friendly_name: null, icon: null },
        { key: 'WIND_EXPOSURE', value: 'HIGH', friendly_name: null, icon: null },
        { key: 'WIND_EXPOSURE', value: 'LOW', friendly_name: 'Protected from prevailing winds', icon: null },
        { key: 'CROWDS', value: 'HIGH', friendly_name: 'Gets crowded', icon: null },
        { key: 'CROWDS', value: 'LOW', friendly_name: null, icon: null },
        { key: 'IS_PARKING', value: null, friendly_name: 'Carpark', icon: null },
        { key: 'IS_TOILET', value: null, friendly_name: 'Toilet', icon: null },
        { key: 'IS_BEGINNER_FRIENDLY', value: null, friendly_name: 'Beginner friendly', icon: null },
        { key: 'HANDLES_BIG_SWELL', value: null, friendly_name: 'Handles big swells', icon: null }
      ]
    )
  end
end
