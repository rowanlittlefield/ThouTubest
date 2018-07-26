class Api::VideosController < ApplicationController

  def index
    @videos = get_videos_list(
      video_index_params[:limit],
      video_index_params[:offset]
    )

    render "api/videos/index"
  end

  def show
    @video = Video.find(params[:id])
    get_video_show_videos_and_comments(
      @video, video_index_params[:offset], video_index_params[:limit]
    )

    if @video
      @video.add_view
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
      get_video_show_videos_and_comments(@video, 0, 10)
      render "api/videos/create"
    else
      render json: @video.errors.full_messages, status: 422
    end
  end

  def update
    debugger
    @video = Video.update(params[:id], update_params)

    if @video.save
      @video.update_thumbnail(video_params[:thumbnail_image])
      get_video_show_videos_and_comments(@video, 0, 10)
      render "api/videos/create"
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
      uploader_id: video_params[:uploader_id],
      film: video_params[:film]
    }
  end

  def update_params
    {title: video_params[:title], description: video_params[:description]}
  end

  def get_videos_list(limit, offset)
    Video.all.limit(limit).offset(offset).includes(:user)
  end

  def get_video_show_videos_and_comments(video, offset, limit)
    @user = video.user
    @videos = get_videos_list(limit, offset)
    @comments = video.comments.includes(:user)
  end
end
