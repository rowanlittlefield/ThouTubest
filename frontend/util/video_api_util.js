export const getVideo = videoId => (
  $.ajax({
    url: `api/videos/${videoId}`,
    method: 'GET'
  })
);

export const getVideos = () => (
  $.ajax({
    url: 'api/videos',
    method: 'GET'
  })
);

export const createVideo = video => (
  $.ajax({
    url: 'api/videos',
    method: 'POST',
    data: video
  })
);

export const deleteVideo = id => (
  $.ajax({
    url: `api/videos/${id}`,
    method: 'DELETE'
  })
);

export const updateVideo = video => (
  $.ajax({
    url: `api/videos/${video.id}`,
    method: 'PATCH',
    data: {video: video}
  })
);
