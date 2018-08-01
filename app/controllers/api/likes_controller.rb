class Api::Likescontroller < ApplicationController

  def create

  end

  def destroy

  end

  private

  def like_params
    params.require(:like).permit(:user_id, :is_dislike, :likeable_type, :likeable_id)
  end
end
