class Api::VideosController < ApplicationController

  def index
    @videos = Video.all
    render "api/videos/index"
  end

  def show
    @video = Video.find(params[:id])

    if @video
      render "api/videos/show"
    else
      render json: ['Cannot find video'], status: 422
    end
  end

  def create

  end

  def update

  end

  def edit

  end

  def destroy

  end

  private

  def video_params
    params.require(:video).permit(
      :title, :description, :video_url, :thumbnail_url, :views,
       :uploader_id, :thumbnail_image, :film
    )
  end
end
