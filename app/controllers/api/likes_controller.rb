class Api::LikesController < ApplicationController

  def create
    @like = Like.new(
      user_id: like_params[:user_id], is_dislike: like_params[:is_dislike]
    )

    if like_params[:likeable_type] == 'Video'
      @like.likeable = Video.find(like_params[:likeable_id])
      @video = @like.likeable
    else
      @like.likeable = Comment.find(like_params[:likeable_id])
    end

    if @like.save
      @user = @like.user
      render 'api/likes/show'
    else
      render json:  @like.errors.full_messages, status: 422
    end
  end

  def update
    @like = Like.update(like_update_params[:id], like_update_params[:is_dislike])

    if @like.save
      @video = @like.likeable
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

  def like_update_params
    params.require(:like).permit(:id, :is_dislike)
  end
end
