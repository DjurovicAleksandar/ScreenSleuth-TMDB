import { IMG_PATH } from '../../config/data';
import rating from '../../assets/rating.png';
import voter from '../../assets/voter.png';
import release from '../../assets/release.png';
import moment from 'moment';
import { fetchTrailer } from '../../config/fetchTrailer';
import { useEffect, useState } from 'react';

import { addToWatchlist } from '../../config/saveMovie';
import { UserAuth } from '../../config/context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

function Header({ movie }) {
  const { user } = UserAuth();
  const [bookmark, setBookmark] = useState(false);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const movieRef = doc(db, 'users', `${user?.email}`);

  const movieRating = movie?.vote_average;
  const movieTitle = movie?.title
    ? movie.title
    : movie?.name
    ? movie.name
    : movie?.original_title;

  let movieBookmarked = userWatchlist?.filter(item => item?.id == movie?.id);

  // database snamshot
  const getFromWatchlist = () => {
    onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
      setUserWatchlist(doc.data()?.watchlist);
    });
  };

  useEffect(() => {
    getFromWatchlist();
  }, []);
  return (
    <>
      <div className="w-full h-[80vh] md:h-screen relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-black p-4 flex flex-col justify-end gap-4">
          <h1 className="text-white text-4xl xl:text-6xl font-semibold  w-full md:max-w-[90%] lg:max-w-[60%]">
            {movieTitle}
          </h1>
          <div>
            {movieBookmarked?.length === 1 ? (
              <Link
                to="/watchlist"
                className="text-xs md:text-sm lg:text-lg   px-4 py-1 bg-mainCol border border-transparent mr-4 cursor-pointer hover:scale-90 ease-in-out duration-300"
              >
                In watchlist
              </Link>
            ) : (
              <button
                onClick={() =>
                  addToWatchlist(movie, user, movieRef, setBookmark)
                }
                className="text-xs md:text-sm lg:text-lg   px-4 py-1 bg-mainCol border border-transparent mr-4 cursor-pointer hover:scale-90 ease-in-out duration-300"
              >
                Watchlist
              </button>
            )}
            <button
              onClick={() => fetchTrailer(movieTitle)}
              className="text-xs lg:text-sm xl:text-lg px-6 py-2 bg-transparent border border-gray-300 text-gray-300 cursor-pointer hover:scale-90 ease-in-out duration-300"
            >
              Trailer
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs md:text-sm text-gray-500">
              <img className="w-[1rem]" src={release} alt="release" />{' '}
              <span className="ml-[1px]">
                {moment(movie?.release_date).format('DD-MM-YYYY')}
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-500">
              <img className="w-[1rem]" src={rating} alt="rating" />
              <span className="ml-[1px]">
                {movieRating === undefined
                  ? movieRating
                  : movieRating.toFixed(1)}
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-500">
              <img className="w-[1rem]" src={voter} alt="vote" />
              <span className="ml-[1px]"> {movie?.vote_count}</span>
            </div>
          </div>
          <p className="text-xs md:text-m lg:text-xl text-white w-full md:max-w-[75%] lg:max-w-[50%] h-[150px] overflow-y-auto scrollbar-hide mb-8">
            {movie?.overview}
          </p>
        </div>
        <img
          className="w-full h-full object-cover"
          src={`${IMG_PATH}${movie?.backdrop_path}`}
        ></img>
      </div>
    </>
  );
}

export default Header;
