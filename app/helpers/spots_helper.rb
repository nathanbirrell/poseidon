module SpotsHelper
  def swell_models_table(rows)
    show_table(rows)
  end
  def wind_models_table(rows)
    show_table(rows)
  end
  def tide_models_table(rows)
    show_table(rows)
  end

  private

  def show_table(rows_to_show)
    date_attrs = ['created_at', 'updated_at', 'date_time']

    table = ''
    table += '<table>'
    table += '<thead><tr>'

    rows_to_show.columns.map do |column|
      table += "<td>#{column.name}</td>"
    end

    table += '</tr></thead>'

    table += '<tbody>'

    rows_to_show.each do |observation|
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
