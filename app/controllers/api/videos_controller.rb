class Api::VideosController < ApplicationController

  def index
    @videos = Video
    .all
    .limit(video_index_params[:limit])
    .offset(video_index_params[:offset])
    .includes(:user)

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
    @video = Video.new(sub_video_params)

    if @video.save
      @video.get_video_length
      @video.ensure_thumbnail_image(video_params[:thumbnail_image])
      @user = @video.user
      render "api/videos/show"
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def update
    @video = Video.update(params[:id], sub_video_params)

    if @video.save
      @video.ensure_thumbnail_image(video_params[:thumbnail_image])
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

  def video_index_params
    params.require(:video_index_params).permit(:limit, :offset)
  end

  def sub_video_params
    {
      title: video_params[:title],
      description: video_params[:description],
      video_url: video_params[:video_url],
      thumbnail_url: video_params[:thumbnail_url],
      views: video_params[:views],
      uploader_id: video_params[:uploader_id],
      film: video_params[:film]
    }
  end
end
