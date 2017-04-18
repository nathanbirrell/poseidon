# == Schema Information
#
# Table name: tides
#
#  id                                 :integer          not null, primary key
#  tide_type                          :string
#  tide_height_above_sea_level_metres :decimal(, )
#  tide_date_time                     :string
#  spot_id                            :integer
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#

class Tide < ApplicationRecord
  belongs_to :spot
end
