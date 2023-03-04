import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export const addToWatchlist = async (movie, user, ref, setBookmark) => {
  if (user?.email) {
    setBookmark(true);
    try {
      await updateDoc(ref, {
        watchlist: arrayUnion({
          id: movie?.id,
          title: movie?.title
            ? movie?.title
            : movie?.name
            ? movie?.name
            : movie?.original_title,
          backdrop_path: movie?.backdrop_path,
          poster_path: movie?.poster_path,
          release_date: movie?.release_date,
          vote_count: movie?.vote_count,
          vote_average: movie?.vote_average,
          overview: movie?.overview,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  }
};
