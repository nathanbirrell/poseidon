module SpotsHelper
  def tide_incoming_or_outgoing(last_tide_type)
    if last_tide_type === 'low'
      'Incoming'
    else
      'Outgoing'
    end
  end

  def get_verdict(rating)
    return 'positive' if rating > 75
    return 'negative' if rating < 50
    return 'mixed' if rating > 50
  end

  def get_verdict_colour(rating)
    return '#27AE60' if get_verdict(rating) == 'positive'
    return '#f1c04b' if get_verdict(rating) == 'mixed'
    return '#EB5757' if get_verdict(rating) == 'negative'
  end

  def trim num
    i, f = num.to_i, num.to_f
    i == f ? i : f
  end

  def swell_models_table(rows)
    show_table(rows)
  end
  def wind_models_table(rows)
    show_table(rows)
  end
  def tide_models_table(rows)
    show_table(rows)
  end

  def kph_to_knots(speed)
    Unit.new("#{speed} kph").convert_to('knots').scalar
  end

  def m_to_ft(height)
    Unit.new("#{height} m").convert_to('ft').scalar
  end

  def degrees_to_text(direction)
    val = ((direction / 22.5) + 0.5).round(0)
    directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE',  'SE',  'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    directions[(val % 16)]
  end

  def kph_to_descriptive(wind_kph)
    case wind_kph
    when 0..2 then 'Calm'
    when 2..12 then 'Light'
    when 12..30 then 'Moderate'
    when 30..40 then 'Fresh'
    when 40..62 then 'Strong'
    when 62..87 then 'Gale'
    when 87..117 then 'Storm'
    when 117..135 then 'Hurricane'
    else ''
    end
  end

  def get_roc_direction(value)
    return 'right' if value.positive?
    return 'left' if value.negative?
  end

  def display_hours(data)
    return (data - data%1).round(0) # return a neat figure for hours, taking off any decimal
  end

  def display_mins(data)
    return ((data % 1)*60).round(0) # get leftover hours decimal value and return neat mins display figure
  end

  private

  def show_table(rows_to_show)
    columns_to_hide = ['id', 'created_at', 'updated_at', 'spot_id']
    date_attrs = ['created_at', 'updated_at', 'date_time']
    decimal_attrs = ['size', 'period', 'height']

    table = ''
    table += '<table>'
    table += '<thead><tr>'

    rows_to_show.columns.map do |column|
      next if columns_to_hide.include? column.name
      table += "<td>#{column.name}</td>"
    end

    table += '</tr></thead>'

    table += '<tbody>'

    rows_to_show.each do |observation|
      table += '<tr>'
      observation.attributes.each do |attr_name, attr_value|
        next if columns_to_hide.include? attr_name
        attr_value = attr_value.localtime.strftime("%a, %e %b %Y %H:%M") if date_attrs.include? attr_name
        attr_value = attr_value.round(2) if decimal_attrs.include? attr_name
        table += "<td>#{attr_value}</td>"
      end
      table += '</tr>'
    end

    table += '</tbody>'

    table += '</table>'

    table.html_safe
  end
end
