# == Schema Information
#
# Table name: spots_features
#
#  id         :integer          not null, primary key
#  feature_id :integer          not null
#  spot_id    :integer          not null
#

# Join table (for many-to-many)
class SpotsFeature < ApplicationRecord
  belongs_to :spot
  belongs_to :feature
end
