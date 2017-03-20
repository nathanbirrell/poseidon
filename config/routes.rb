Rails.application.routes.draw do
  resources :regions
  resources :spots
  root to: 'spots#show', :id => 1
  devise_for :users
  resources :users
end
