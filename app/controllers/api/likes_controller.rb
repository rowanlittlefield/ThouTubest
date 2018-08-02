class Api::LikesController < ApplicationController

  def create
    debugger
    @like = Like.new(
      user_id: like_params[:user_id], is_dislike: like_params[:is_dislike]
    )

    if like_params[:likeable_type] == 'Video'
      @like.likeable = Video.find(like_params[:likeable_id])
    else
      @like.likeable = Comment.find(like_params[:likeable_id])
    end

    if @like.save
      render 'api/likes/show'
    else
      render json:  @like.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  private

  def like_params
    params.require(:like).permit(:user_id, :is_dislike, :likeable_type, :likeable_id)
  end
end
