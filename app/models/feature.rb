# == Schema Information
#
# Table name: features
#
#  id            :integer          not null, primary key
#  key           :string           not null
#  value         :string
#  friendly_name :string
#  icon          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Feature < ApplicationRecord
  has_many :spots_features
  has_many :spots, :through => :spots_features

  def friendly_name_or_key
    self[:friendly_name] || "#{self[:key]} #{self[:value]}"
  end

  def to_builder
    Jbuilder.new do |feature|
      feature.id id
      feature.key key
      feature.value value
      feature.friendly_name friendly_name
      feature.icon icon
    end
  end
end
