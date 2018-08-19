class Api::SearchController < ApplicationController

  def index
    if search_params['searchQuery'].present?
      @results = Video.search(search_params['searchQuery']).includes(:user)
    else
      @results = []
    end

    render 'api/search/index'
  end

  private

  def search_params
    params.require(:search).permit(:searchQuery)
  end

end
