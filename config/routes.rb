Rails.application.routes.draw do
  root to: 'spots#index'

  devise_for :users

  resources :regions
  resources :spots
  resources :users

  # TODO: the same as this but for Winds and Tides too
  get 'swells/:id', to: 'swells#show'
  get 'spots/:id/forecasts', to: 'spots#forecasts'
  get 'spots/:id/clone', to: 'spots#clone', as: 'clone_spot'
end
