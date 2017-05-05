class Wind < ApplicationRecord
  # default_scope { order(date_time: :desc) }
  belongs_to :spot
end
