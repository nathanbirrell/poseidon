# == Schema Information
#
# Table name: uv_indices
#
#  id         :integer          not null, primary key
#  date_time  :datetime         not null
#  uv_index   :float
#  scale      :string
#  spot_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe UvIndex, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
