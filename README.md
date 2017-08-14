Poseidon
================

The Ruby on Rails application behind [Poseidon](https://surfposeidon.io).

Getting Started
---------------

1. Install [RVM](https://rvm.io/rvm/install)
1. Install [RubyGems](https://rubygems.org/pages/download)
1. Install Postgres `brew install postgresql`
1. Install the correct version of Ruby on your machine - `rvm install ruby-2.3.3 && rvm use ruby-2.3.3`
1. Install [Bundler](http://bundler.io) and Foreman `gem install bundler foreman`
1. Install [Rails](http://railsapps.github.io/installing-rails.html)
1. Clone this repo - `git clone git@github.com:nathanbirrell/poseidon.git poseidon`
1. Install project dependencies - `cd poseidon; bundle install`. [Note if you have an issue with the `pg` gem, make sure you run `brew install postgresql` and `bundle` again.]
1. Find a [template](https://poseidonweb.slack.com/archives/C3X92NSA1/p1502094031661986) `config/application.yml` file for your environment variables (handled by Figaro)
1. Create, set-up and seed database with `rails db:create db:schema:load db:seed`
1. Load some model data for the seed spots with `rails forecasts:update` (retrieves data from 3rd party APIs)
1. `npm install -g yarn` then `yarn`
1. Run a local build with `foreman start`
1. Install Rubocop and the [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide) ([Atom](https://fmcgeough.wordpress.com/2015/11/14/using-rubocop-in-atom/), [RubyMine](#TODO))

LiveReload:

* If you're working on the front-end, it's convenient to use [Live Reload](https://mattbrictson.com/lightning-fast-sass-reloading-in-rails). To use it, run `guard -P livereload`.

Marketing site (Jekyll)
-------------------------

1. `$ cd docs`
1. `$ gem install jekyll`
1. `$ bundle install`
1. `$ jekyll serve` and navigate to [http://localhost:4000/](http://localhost:4000/)

Documentation and Support
-------------------------

[Github Wiki](https://github.com/nathanbirrell/poseidon/wiki)
[Slack](https://poseidonweb.slack.com)

Features & Issues
-------------

[Trello Team](https://trello.com/surfposeidon) (for build/feature work)

[Github Issues](https://github.com/nathanbirrell/poseidon/issues) (for bugs)