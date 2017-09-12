Rails.application.routes.draw do
  root to: 'spots#index'

  devise_for :users

  resources :regions
  resources :spots
  resources :users

  # TODO: the same as this but for Winds and Tides too
  get 'swells/:id', to: 'swells#show'
  get 'spots/:id/forecasts.json', to: 'spots#forecasts'
  get 'spots/:id/clone', to: 'spots#clone', as: 'clone_spot'

  # These are React Router handled routes, leave them to the JS app
  get 'spots/:id/forecast', to: 'spots#show'
  get 'spots/:id/about', to: 'spots#show'
  get 'spots/:id/history', to: 'spots#show'
end
