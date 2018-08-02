class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      @likes = @user.likes
      render "api/users/show"
    else
      render json: ["Invalid email/password combination"], status: 401
    end
  end

  def show
    @current_user = current_user
    render "api/users/show"
  end

  def destroy
    @user = current_user
    if @user
      sign_out
      render "api/users/show"
    else
      render json: ["Nobody signed in"], status: 404
    end
  end
end
