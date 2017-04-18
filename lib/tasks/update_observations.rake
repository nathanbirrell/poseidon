# See example below for a task with access to ActiveRecord model :D
namespace :observations do
  task :update => :environment do
    puts Spot.all.inspect
  end
end
