class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.where(
      video_id: comment_params[:video_id],
      parent_comment_id: comment_params[:parent_comment_id]
     )
     render "api/comments/show"
  end

  private

  def comment_params
    params.require(:comment).permit(:video_id, :parent_comment_id)
  end
end
