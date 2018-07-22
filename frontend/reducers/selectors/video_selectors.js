export const getVideoIds = videos => (
  Object.values(videos).map(video => video.id)
);

export const groupVideoKeysIntoLists = (videos) => {
  const videoIds = getVideoIds(videos);
  const videoIdLists = [];

  for(let i = 0; i < videoIds.length; i++) {
    if(i % 5 === 0) videoIdLists.push([]);
    videoIdLists[videoIdLists.length - 1].push(videoIds[i]);
  }

  return videoIdLists;
}
