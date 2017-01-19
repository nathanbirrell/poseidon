Rails.application.routes.draw do
  resources :spots
  root to: 'visitors#index'
  devise_for :users
  resources :users
end
