# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

Slack.configure do |config|
  config.token = ENV['SLACK_API_TOKEN']
end

run Rails.application
