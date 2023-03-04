import release from '../assets/release.png';
import rating from '../assets/rating.png';
import voter from '../assets/voter.png';
// import release from '../assets/release.png';
import moment from 'moment';
import { IMG_PATH } from '../config/data';

import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { UserAuth } from '../config/context/AuthContext';
import { db } from '../config/firebase';
import { fetchTrailer } from '../config/fetchTrailer';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import SectionMovie from './subComponents/SectionMovie';

function Watchlist() {
  const scrollCon = useRef(null);
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();

  const movie = movies.length > 0 ? movies[index] : undefined;

  const movieTitle = movie?.title
    ? movie.title
    : movie?.name
    ? movie.name
    : movie?.original_title;

  const scrollHandler = scroll => {
    const screenWidth = screen.width;
    if (screenWidth <= 601) {
      scrollCon.current.scrollLeft += scroll - 100;
    } else {
      scrollCon.current.scrollLeft += scroll;
    }
  };

  const handleClick = i => {
    setIndex(i);
  };

  const getFromWatchlist = () => {
    onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
      setMovies(doc.data()?.watchlist);
    });
  };

  const deleteMovie = async id => {
    try {
      const movieDelete = movies.filter(item => item.id !== id);

      await updateDoc(doc(db, 'users', `${user?.email}`), {
        watchlist: movieDelete,
      });
    } catch (error) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFromWatchlist();
  }, []);

  useEffect(() => {
    getFromWatchlist();
  }, [user?.email]);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-r from-black p-4 flex flex-col justify-end gap-4">
        <h1 className="text-white text-2xl lg:text-4xl xl:text-5xl font-semibold  w-full md:max-w-[90%] lg:max-w-[60%]">
          {movieTitle}
        </h1>

        {movie ? (
          <>
            <div>
              <button
                onClick={() => deleteMovie(movie.id)}
                className="text-xs md:text-sm lg:text-lg   px-4 py-1 bg-mainCol border border-transparent mr-4 cursor-pointer hover:scale-90 ease-in-out duration-300"
              >
                Remove
              </button>
              <button
                onClick={() => fetchTrailer(movieTitle)}
                className=" text-xs md:text-sm lg:text-lg  px-4 py-1 bg-transparent border border-gray-300 text-gray-300 cursor-pointer hover:scale-90 ease-in-out duration-300"
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
                  {' '}
                  {movie?.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                <img className="w-[1rem]" src={voter} alt="vote" />
                <span className="ml-[1px]"> {movie?.vote_count}</span>
              </div>
            </div>
          </>
        ) : null}

        <p className="ext-m lg:text-l xl:text-xl  text-white w-full md:max-w-[75%] lg:max-w-[50%] h-[100px] overflow-y-auto scrollbar-hide">
          {movie?.overview}
        </p>

        <div className="relative">
          <div
            className=" flex items-center justify-start gap-x-4 overflow-x-auto scrollbar-hide h-[200px] lg:h-[250px] p-8 lg:pl-20"
            ref={scrollCon}
          >
            {movies.map((moviex, i) => {
              moviex.index = i;
              return (
                <SectionMovie
                  movie={moviex}
                  key={(moviex.id + i) * Math.random() * 10}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
          <div className="text-white absolute right-0 top-[20%] h-[100px] lg:h-[150px] w-[5%] flex flex-col items-center justify-center gap-4 bg-gradient-to-l from-black">
            <RxDoubleArrowRight
              onClick={() => scrollHandler(screen.width <= 600 ? 85 : 120)}
              size={30}
              className="cursor-pointer scroll-smooth hover:scale-90 text-white "
            />{' '}
          </div>
          <div className="text-white absolute left-0 top-[20%] h-[100px] lg:h-[150px] w-[5%] flex flex-col items-center justify-center gap-4 bg-gradient-to-l from-black">
            <RxDoubleArrowLeft
              onClick={() => scrollHandler(screen.width <= 600 ? -85 : -120)}
              size={30}
              className="cursor-pointer scroll-smooth hover:scale-90 text-white"
            />
          </div>
        </div>
      </div>
      <img
        className="w-full h-full object-cover"
        src={`${IMG_PATH}${movie?.backdrop_path}`}
      ></img>
    </div>
  );
}

export default Watchlist;
