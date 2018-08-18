class Api::SearchController < ApplicationController

  def index
    debugger
    if search_params['searchQuery'].present?
      @results = Video.search(search_params['searchQuery'])
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
