Rails.application.routes.draw do
  authenticated :user do
    root to: 'javascript_app#index', as: :authenticated_root

    resources :regions
    resources :spots
    resources :users

    # TODO: the same as this but for Winds and Tides too
    get 'swells/:id', to: 'swells#show'
    get 'spots/:id/forecasts.json', to: 'spots#forecasts'
    get 'spots/:id/clone', to: 'spots#clone', as: 'clone_spot'

    # These are React Router handled routes, leave them to the JS app
    # TODO: should probably change this logic to fallback to send ALL traffic
    #         to the js app, if not defined above.
    #       when ready to do this, use: `get '*path' => 'javascript_app#index'
    get 'spots/:id/forecast', to: 'javascript_app#index'
    get 'spots/:id/about', to: 'javascript_app#index'
    get 'spots/:id/history', to: 'javascript_app#index'

    get '*path' => 'javascript_app#index'
  end

  root to: redirect('/users/sign_in')

  devise_for :users
end
