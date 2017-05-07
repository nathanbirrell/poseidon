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

require 'rails_helper'

RSpec.describe Tide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
