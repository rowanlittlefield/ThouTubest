class Api::SearchController < ApplicationController

  def index
    debugger
  end

  private

  def search_params
    params.require(:search).permit(:searchQuery)
    # params.require(:user).permit(:email, :password, :username, :photo)
  end

end
