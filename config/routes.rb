Rails.application.routes.draw do
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  authenticated :user do
    root to: 'javascript_app#index', as: :authenticated_root

    resources :regions
    resources :users

    resources :spots
    get 'spots', to: 'spots#index'
    get 'spots/:id/forecast/surf.json', to: 'spots#forecast_surf'
    get 'spots/:id/forecast/weather-daily.json', to: 'spots#forecasts'
    get 'spots/:id/clone', to: 'spots#clone', as: 'clone_spot'
    # TODO: the same as this below but for Winds and Tides too
    # get 'swells/:id', to: 'swells#show'

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

  get '*path' => redirect('/')
end
