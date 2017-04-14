Poseidon
================

The Ruby on Rails application behind [Poseidon](https://surfposeidon.nathanbirrell.me).

Getting Started
---------------

1. Install [RVM](https://rvm.io/rvm/install)
1. Install [RubyGems](https://rubygems.org/pages/download)
1. Install the correct version of Ruby on your machine - `rvm install ruby-2.3.3 && rvm use ruby-2.3.3`
1. Install [Bundler](http://bundler.io) for the current Ruby version - `gem install bundler`
1. Install [Rails](http://railsapps.github.io/installing-rails.html)
1. Clone this repo - `git clone git@github.com:nathanbirrell/poseidon.git poseidon`
1. Install project dependencies - `cd poseidon; bundle install`
1. Create, set-up and seed database with `rails db:create db:schema:load db:seed`
1. Start the Rails server to confirm all is working `rails server`

Optional: install and use [Pow](http://pow.cx) for nice local development server/tools/urls:

1. Install Pow: `curl get.pow.cx | sh`
1. Add your local project to pow: `cd ~/.pow; ln -s /path/to/poseidon`
1. Open [http://poseidon.dev](http://poseidon.dev) in your browser. This is your local instance of Poseidon to play with.


Documentation and Support
-------------------------

[Github Wiki](https://github.com/nathanbirrell/poseidon/wiki)
[Slack](https://poseidonweb.slack.com)

Features & Issues
-------------

[Github Issues](https://github.com/nathanbirrell/poseidon/issues)

Contributing
------------

Use [Gitflow](http://nvie.com/posts/a-successful-git-branching-model/), branch a `feature/your_feature` off `develop`, create a Pull Request back to `develop` for approval and merge by team.
