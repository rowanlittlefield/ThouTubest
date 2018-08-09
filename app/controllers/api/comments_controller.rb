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
      @parent_comment = @comment.parent_comment
      @user = @comment.user
      @video = @comment.video

      if @parent_comment
        render "api/comments/comment_show_with_parent"
      else
        render "api/comments/single_comment_show"
      end
    else
      render json:  @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    @video = @comment.video
    @user = @comment.user
    @parent_comment = @comment.parent_comment
    render "api/comments/destroy"
  end

  def update
    @comment = Comment.update(params[:id], comment_params)

    if @comment.save
      @video = @comment.video
      @user = @comment.user
      render "api/comments/single_comment_show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:video_id, :parent_comment_id, :user_id, :body)
  end
end
