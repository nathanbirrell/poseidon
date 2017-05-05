# == Schema Information
#
# Table name: tides
#
#  id                                 :integer          not null, primary key
#  type                          :string
#  height :decimal(, )
#  date_time                     :string
#  spot_id                            :integer
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#

class Tide < ApplicationRecord
  belongs_to :spot
end
