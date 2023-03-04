import { useState, useEffect, useRef } from 'react';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';
import { BiError } from 'react-icons/bi';

import moment from 'moment';

import rating from '../assets/rating.png';
import voter from '../assets/voter.png';
import release from '../assets/release.png';

import { IMG_PATH, moviePage } from '../config/data';
import { fetchTrailer } from '../config/fetchTrailer';
import SectionMovie from './subComponents/SectionMovie';
import { UserAuth } from '../config/context/AuthContext';
import { addToWatchlist } from '../config/saveMovie';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';

function Section({ fetchUrl }) {
  const { user } = UserAuth();
  const [userWatchlist, setUserWatchlist] = useState([]);
  const movieRef = doc(db, 'users', `${user?.email}`);
  const [bookmark, setBookmark] = useState(false);

  //Pages
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  //Settin an error
  const [error, setError] = useState('');
  //Setting a index for a heading movie
  const [index, setIndex] = useState(0);
  //Setting a ref for a scrolling a carousel
  const scrollCon = useRef(null);
  //Setting a state for a movie array
  const [movies, setMovies] = useState([]);
  //Dynamically changing a movie index
  const movie = movies[index];
  //Movie title
  const movieTitle = movie?.title
    ? movie.title
    : movie?.name
    ? movie.name
    : movie?.original_title;

  //button text handle
  let movieBookmarked = userWatchlist?.filter(item => item.id == movie.id);

  // database snamshot
  const getFromWatchlist = () => {
    onSnapshot(doc(db, 'users', `${user?.email}`), doc => {
      setUserWatchlist(doc.data()?.watchlist);
    });
  };

  //Error
  const errorMarkup = (
    <div className="text-mainCol w-full h-screen flex flex-col gap-4 items-center justify-center text-center">
      <BiError size={80} />
      Sorry, {error}
      <p className="text-lg lg:text-1xl text-mainCol ">
        No results were found for your search.
      </p>
      <p className="text-lg l:text-1xl text-mainCol ">
        Check if you spelled the name correctly!
      </p>
      <p className="lg:text-lg text-mainCol ">
        Please note that it is necessary to type the exact name, but a
        half-typed name will work, for example, when you search for the Harry
        Potter, you can only type Harry.
      </p>
    </div>
  );

  //handler for a scrolling a carousel
  const scrollHandler = scroll => {
    if (scroll > 0 && index < movies.length - 1) {
      setIndex(index + 1);
      if (index >= movies.length - 2) {
        if (currentPage >= pages - 1) return;
        setCurrentPage(prev => (prev += 1));
      }
    }
    if (scroll < 0 && index > 0) {
      setIndex(index - 1);
    }

    scrollCon.current.scrollLeft += scroll;
  };

  const handleClick = i => {
    setIndex(i);
    if (index >= movies.length - 2) {
      if (currentPage >= pages - 1) return;
      setCurrentPage(prev => (prev += 1));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(fetchUrl + moviePage(currentPage));
        const data = await res.json();
        if (!res.ok)
          throw new Error(`something went wrong. Code error: ${res.status}`);

        if (data.results <= 0)
          setError(`something went wrong. Code error: ${res.status}`);

        setMovies(prevMovie => [...prevMovie, ...data.results]);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    })();
  }, [currentPage]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        if (!res.ok)
          throw new Error(`something went wrong. Code error: ${res.status}`);

        if (data.results <= 0)
          setError(`something went wrong. Code error: ${res.status}`);

        setPages(data.total_pages);
        setMovies(data.results);

        getFromWatchlist();
      } catch (err) {
        console.error(err);
        setError(err);
      }
    })();
  }, [fetchUrl]);

  return (
    <>
      {error ? (
        errorMarkup
      ) : (
        <div className="w-full h-screen relative">
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-r from-black p-4 flex flex-col justify-end gap-4">
            <h1 className="text-white text-2xl lg:text-4xl xl:text-5xl font-semibold  w-full md:max-w-[90%] lg:max-w-[60%]">
              {movieTitle}
            </h1>

            <div>
              {movieBookmarked.length === 1 ? (
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
                  {movie?.vote_average?.toFixed(1)}
                </span>
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                <img className="w-[1rem]" src={voter} alt="vote" />
                <span className="ml-[1px]"> {movie?.vote_count}</span>
              </div>
            </div>
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
                  onClick={() =>
                    scrollHandler(screen.width <= 600 ? -85 : -120)
                  }
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
      )}
    </>
  );
}

export default Section;
