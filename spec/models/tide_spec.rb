# == Schema Information
#
# Table name: tides
#
#  id         :integer          not null, primary key
#  tide_type  :string
#  height     :decimal(, )
#  spot_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  date_time  :datetime
#

require 'rails_helper'

RSpec.describe Tide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
