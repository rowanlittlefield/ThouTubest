export const getVideo = videoId => (
  $.ajax({
    url: `api/videos/${videoId}`,
    method: 'GET'
  })
);
