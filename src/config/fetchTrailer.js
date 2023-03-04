import { TRAILER_KEY } from './data';

export const fetchTrailer = async movieTitle => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle} trailer&key=${TRAILER_KEY}
      `
  );

  const data = await res.json();

  const videoId = data?.items[0].id.videoId;
  const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;

  //link creation
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = trailerUrl;
  link.click();
};
