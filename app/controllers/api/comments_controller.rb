class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.all#.where(
      #video_id: comment_params[:video_id],
      #parent_comment_id: comment_params[:parent_comment_id]
    #)
     render "api/comments/show"
  end

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      @user = @comment.user
      @video = @comment.video
      render "api/comments/single_comment_show"
    else
      render json:  @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render "api/comments/destroy"
  end

  private

  def comment_params
    params.require(:comment).permit(:video_id, :parent_comment_id, :user_id, :body)
  end
end
