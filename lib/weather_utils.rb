def calculate_angle_between(x, y)
  # Math.atan2(Math.sin(x-y), Math.cos(x-y))
  a = x - y
  a -= 360 if a > 180
  a += 360 if a < -180
  a
end

# Need to calculate whether the observed angle is between optimal range.
#   This is not as simple as the is_between() function, because of the 360°
#   threshold of measuring angles, for example, given observed wind at 3° and
#   an optimal range of 350° - 10°, 3 >= 350 = false, which is incorrect.
#   Read more: http://stackoverflow.com/questions/11406189/determine-if-angle-lies-between-2-other-angles
#
#   TODO: Explain the logic inside this function better via comments
def is_angle_inside_range(angle, range_min, range_max)
  # FIXME: Do NOT validate these values here, validate them on the ActiveRecord model attributes
  if (!is_between(angle, 1, 360) || !is_between(range_min, 1, 360) || !is_between(range_max, 1, 360))
    puts('Angles must be provided inside 1 - 360 degrees')
    return
  end

  # Make the angle from range_min to range_max to be <= 180 degrees
  real_angle = ((range_max - range_min) % 360 + 360) % 360
  # Swap the min/max range if it's > 180
  range_min, range_max = range_max, range_min if (real_angle >= 180)

  if range_min <= range_max
    return angle >= range_min && angle <= range_max
  else
    return angle >= range_min || angle <= range_max
  end
end

# Convenience function to check if `observation` is between the two params
def is_between(observation, param_min, param_max)
  (observation >= param_min) && (observation <= param_max)
end
