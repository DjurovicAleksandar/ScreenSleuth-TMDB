import { useState, useEffect, useRef } from 'react';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from 'react-icons/rx';
import { Link } from 'react-router-dom';

import Movie from './Movie';

function Row({ fetchUrl, title, rootPath, handleMovie }) {
  const scrollCon = useRef(null);
  const [movies, setMovies] = useState([]);

  const scrollHandler = scroll => {
    const screenWidth = screen.width;
    if (screenWidth <= 601) {
      scrollCon.current.scrollLeft += scroll - 100;
    } else {
      scrollCon.current.scrollLeft += scroll;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        if (!res.ok)
          throw new Error(`Something went wrong. Code: ${res.status}`);

        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [fetchUrl]);

  return (
    <div className="mt-5 w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-xs md:text-m">{title}</h2>
        <div className="text-white text-xs md:text-m hover:scale-90 ease-in duration-2s00">
          <Link to={rootPath}>Click for more</Link>
        </div>
      </div>

      <div className="relative">
        <div
          className="items-center justify-start flex gap-x-4 overflow-x-auto scrollbar-hide pl-20"
          ref={scrollCon}
        >
          {movies.map(movie => (
            <Movie handleMovie={handleMovie} key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="text-white absolute right-0 top-0  h-full lg:w-[80px] flex flex-col items-start justify-center gap-4 bg-black/70 group">
          <RxDoubleArrowRight
            onClick={() => scrollHandler(280)}
            className="cursor-pointer scroll-smooth text-white group-hover:scale-75 ease-in duration-200 text-[30px] xl:text-[90px]"
          />
        </div>
        <div className="text-white absolute left-0 top-0  h-full lg:w-[80px] flex flex-col items-center justify-center gap-4  bg-black/70 group">
          <RxDoubleArrowLeft
            onClick={() => scrollHandler(-280)}
            className="cursor-pointer scroll-smoothgroup- hover:scale-90 text-white group-hover:scale-75 ease-in duration-200 text-[30px] xl:text-[90px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Row;
