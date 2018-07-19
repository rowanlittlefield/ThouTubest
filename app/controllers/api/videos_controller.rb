class Api::VideosController < ApplicationController

  def index
    @videos = Video.all.includes(:user)
    @users = @videos.map {|video| video.user}
    render "api/videos/index"
  end

  def show
    @video = Video.find(params[:id])
    @user = @video.user

    if @video
      @user = @video.user
      render "api/videos/show"
    else
      render json: ['Cannot find video'], status: 422
    end
  end

  def create
    @video = Video.new(video_params)

    if @video.save
      @video.get_video_length
      @user = @video.user
      render "api/videos/show"
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def update
    @video = Video.update(params[:id], video_params)

    if @video.save
      @user = @video.user
      render "api/videos/show"
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    render 'api/videos/destroy'
  end

  private

  def video_params
    params.require(:video).permit(
      :title, :description, :video_url, :thumbnail_url, :views,
       :uploader_id, :thumbnail_image, :film
    )
  end
end
