module SpotsHelper
  def spot_observations_table(spot)
    return '' unless spot.observations

    date_attrs = ['created_at', 'updated_at', 'axes_reftime', 'axes_time']

    table = ''
    table += '<table>'
    table += '<thead><tr>'

    @spot.observations.columns.map do |column|
      table += "<td>#{column.name}</td>"
    end

    table += '</tr></thead>'

    table += '<tbody>'

    @spot.observations.each do |observation|
      table += '<tr>'
      observation.attributes.each do |attr_name, attr_value|
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
