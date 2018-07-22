const getVideoIds = videos => (
  Object.values(videos).map(video => video.id)
);

export const groupVideoKeysIntoFives = (videos) => {
  const videoIds = getVideoIds(videos);
  const groupsOfFive = [];

  for(let i = 0; i < videoIds.length; i++) {
    if(i % 5 === 0) groupsOfFive.push([]);
    groupsOfFive[groupsOfFive.length - 1].push(videoIds[i]);
  }

  return groupsOfFive;
}
