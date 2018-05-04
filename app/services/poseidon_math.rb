class PoseidonMath
  def normalise_degrees(data = {})
    # Return data unless normalisation is required
    return data unless data[:max_x] < data[:min_x]
    max_x = data[:max_x]
    min_x = data[:min_x]
    x_value = data[:x_value] || nil

    max_x += 360
    if x_value
      if (x_value >= 0 && x_value <= data[:max_x]) || x_value <= ((max_x - min_x) + 180)
        x_value += 360
      end
    end
    {
      min_x: min_x,
      max_x: max_x,
      x_value: x_value || nil,
      rating: data[:rating] || nil
    }
  end

  def get_h_k_a(data={})
    return nil unless data
    maximum_rating = 100.0
    opt_rating = 60.0
    # use vertex quad formula y = a(x-h)^2 + k
    # a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    k_var = maximum_rating
    h_var = ((data[:max_x] - data[:min_x]) / 2) + data[:min_x]
    # pass in known coord to determine var a value, (data[:min_x], opt_rating)
    a_var = (opt_rating - k_var) / ((data[:min_x] - h_var)**2)
    {
      k_var: k_var,
      h_var: h_var,
      a_var: a_var
    }
  end

  def rating_given_x(data = {})
    return 0 unless data
    vals = get_h_k_a(data)
    rating = vals[:a_var] * ((data[:x_value] - vals[:h_var])**2) + vals[:k_var]
    rating = 0 if rating.negative?
    rating
  end

  def value_given_rating(data = {})
    return 0 unless data
    vals = get_h_k_a(data)

    q_i = 2 * vals[:a_var] * vals[:h_var]
    q_ii = (-2 * vals[:a_var] * vals[:h_var])**2
    q_iii = 4 * vals[:a_var] * (vals[:a_var] * (vals[:h_var]**2) + vals[:k_var] - data[:rating])
    my_sqrt = q_ii - q_iii
    s_a_r_right = (q_i - Math.sqrt(my_sqrt.to_f)) / (2 * vals[:a_var])
    s_a_r_left = (q_i + Math.sqrt(my_sqrt.to_f)) / (2 * vals[:a_var])
    {
      left: s_a_r_left,
      right: s_a_r_right
    }
  end
end
