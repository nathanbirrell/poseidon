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