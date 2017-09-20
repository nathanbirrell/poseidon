source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.3.3'

gem 'rails', '~> 5.1.2'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.5'
gem 'rest-client', '2.0.1'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'devise'
gem 'foundation-rails', '~> 5.5'
gem 'high_voltage'
# gem 'geocoder'
gem 'countries'
gem 'country_select'
gem 'ruby-units'
gem 'webpacker', '~> 2.0'
gem 'figaro'

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'annotate'
  gem 'seed_dump'
  gem 'slack-ruby-client'
  gem 'eventmachine'
  gem 'faye-websocket'
  gem 'better_errors'
  gem 'hub', :require=>nil
  gem 'rails_layout'
  gem 'spring-commands-rspec'
  gem "guard", ">= 2.2.2", :require => false
  gem "guard-livereload",  :require => false
  gem "rack-livereload"
  gem "rb-fsevent",        :require => false
  gem "foreman"
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'selenium-webdriver'
end

group :development, :test do
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'rspec-rails'
  gem 'sqlite3'
  gem 'byebug', platform: :mri
end

group :production do
  gem 'pg'
  gem 'unicorn'
end
