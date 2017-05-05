module SpotsHelper
  def swell_models_table(spot)
    show_table(spot.swells)
  end
  def wind_models_table(spot)
    show_table(spot.winds)
  end
  def tide_models_table(spot)
    show_table(spot.tides)
  end

  def show_table(model)
    date_attrs = ['created_at', 'updated_at', 'axes_reftime', 'axes_time']

    table = ''
    table += '<table>'
    table += '<thead><tr>'

    model.columns.map do |column|
      # next unless visible_attrs.include? column.name
      table += "<td>#{column.name}</td>"
    end

    table += '</tr></thead>'

    table += '<tbody>'

    model.all.each do |observation|
      table += '<tr>'
      observation.attributes.each do |attr_name, attr_value|
        # next unless visible_attrs.include? attr_name
        attr_value = attr_value.localtime.strftime("%a, %e %b %Y %H:%M") if date_attrs.include? attr_name
        table += "<td>#{attr_value}</td>"
      end
      table += '</tr>'
    end

    table += '</tbody>'

    table += '</table>'

    table.html_safe
  end
end
