class CreateFeatures < ActiveRecord::Migration[5.1]
  def change
    create_table :features do |t|
      t.string :key, null: false
      t.string :value
      t.string :friendly_name
      t.string :icon
      t.timestamps
    end

    create_table :spots_features do |t|
      t.belongs_to :feature, index: true, null: false
      t.belongs_to :spot, index: true, null: false
    end

    Feature.create!(
      [
        { key: 'WAVE_DIRECTION', value: 'LEFT', friendly_name: 'Left hander', icon: 'chevron-left' },
        { key: 'WAVE_DIRECTION', value: 'RIGHT', friendly_name: 'Right hander', icon: 'chevron-right' },
        { key: 'WAVE_DIRECTION', value: 'LEFT_AND_RIGHT', friendly_name: 'Lefts and rights', icon: 'chevrons-up' },
        { key: 'BREAK_TYPE', value: 'POINT', friendly_name: 'Point break', icon: nil },
        { key: 'BREAK_TYPE', value: 'BEACH', friendly_name: 'Beachie', icon: nil },
        { key: 'BREAK_FLOOR', value: 'SAND', friendly_name: 'Sand bottom', icon: nil },
        { key: 'BREAK_FLOOR', value: 'REEF', friendly_name: 'Reef bottom', icon: nil },
        { key: 'SWELL_EXPOSURE', value: 'HIGH', friendly_name: 'Swell magnet', icon: 'target' },
        { key: 'SWELL_EXPOSURE', value: 'LOW', friendly_name: nil, icon: nil },
        { key: 'WIND_EXPOSURE', value: 'HIGH', friendly_name: nil, icon: nil },
        { key: 'WIND_EXPOSURE', value: 'LOW', friendly_name: 'Protected from prevailing winds', icon: 'sheild' },
        { key: 'CROWDS', value: 'HIGH', friendly_name: 'Gets crowded', icon: 'users' },
        { key: 'CROWDS', value: 'LOW', friendly_name: 'Usually uncrowded', icon: nil },
        { key: 'IS_PARKING', value: nil, friendly_name: 'Carpark', icon: nil },
        { key: 'IS_TOILET', value: nil, friendly_name: 'Toilet', icon: nil },
        { key: 'IS_BEGINNER_FRIENDLY', value: nil, friendly_name: 'Beginner friendly', icon: 'heart' },
        { key: 'HANDLES_BIG_SWELL', value: nil, friendly_name: 'Handles big swells', icon: 'alert-triangle' },
        { key: 'IS_CAMPING', value: nil, friendly_name: 'Camping nearby', icon: 'compass' },
        { key: 'IS_LOCALISED', value: nil, friendly_name: 'Angry locals', icon: 'thumbs-down' }
      ]
    )
  end
end
