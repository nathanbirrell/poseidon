Rails.application.routes.draw do
  resources :regions
  resources :spots
  root to: 'spots#index'
  devise_for :users
  resources :users
end
