# == Schema Information
#
# Table name: swells
#
#  id         :integer          not null, primary key
#  size       :decimal(, )
#  period     :decimal(, )
#  direction  :integer
#  date_time  :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  spot_id    :integer
#

require 'rails_helper'

RSpec.describe Swell, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
