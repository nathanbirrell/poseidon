class PoseidonMath
  def rating_given_x(data = {})
    return 0 unless data
    # use vertex quad formula y = a(x-h)^2 + k
    # a = stretch coefficient, h = x coord of vertex, k = y coord of vertex
    k_var = 100.0
    h_var = ((data[:max_x] - data[:min_x]) / 2) + data[:min_x]

    # pass in known coord to determine var a value, (data[:min_x], meta_optimum_x)
    a_var = (75 - k_var) / ((data[:min_x] - h_var)**2)
    rating = a_var * ((data[:x_value] - h_var)**2) + k_var

    rating = 0 if rating.negative?

    rating
  end

  def value_given_rating(data = {})
    return 0 unless data
    k_var = 100.0
    h_var = ((data[:max_x] - data[:min_x]) / 2) + data[:min_x]

    # pass in known coord to determine var a value, (data[:min_x], meta_optimum_x)
    a_var = (75 - k_var) / ((data[:min_x] - h_var)**2)

    q_i = 2 * a_var * h_var
    q_ii = (-2 * a_var * h_var)**2
    q_iii = 4 * a_var * (a_var * (h_var**2) + k_var - data[:rating])
    my_sqrt = q_ii - q_iii
    s_a_r_right = (q_i - Math.sqrt(my_sqrt.to_f)) / (2 * a_var)
    s_a_r_left = (q_i + Math.sqrt(my_sqrt.to_f)) / (2 * a_var)
    {
      left: s_a_r_left,
      right: s_a_r_right
    }
  end
end
