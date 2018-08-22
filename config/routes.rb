Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :videos, only: [:index, :show, :create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]
    resources :likes, only: [:create, :update, :destroy]
    resources :search, only: [:index]
  end

  root to: 'static_pages#root'
end
