import { POSTER_PATH } from '../../config/data';

import rating from '../../assets/rating.png';
import release from '../../assets/release.png';
import moment from 'moment';

function Movie({ movie, handleMovie }) {
  const headerMovie = movie;
  return (
    <div className="group min-w-fit h-[250px] lg:h-[400px] relative overflow-hidden">
      <img
        id="poster__img"
        className="w-full h-full group-hover:scale-110 all duration-500"
        src={`${POSTER_PATH}${movie?.poster_path}`}
        alt={movie?.title}
      />
      <div
        className="absolute bottom-[-1rem] right-0 left-0 h-[0%] group-hover:h-full  group-hover:bottom-0 bg-gradient-to-t from-mainCol
      flex flex-col justify-center items-center gap-3 p-1 backdrop-blur overflow-hidden all duration-500"
      >
        <h3 className="lg:text-3xl font-semibold text-gray-800 text-center ">
          {movie.title
            ? movie.title
            : movie?.name
            ? movie.name
            : movie?.original_title}
        </h3>
        <div className="text-xs text-center flex flex-col">
          <div>
            <img src={release} alt="release" className="w-[1rem]" />
            <span>{moment(movie?.release_date).format('D-MM-YYYY')}</span>
          </div>

          <div>
            <img src={rating} alt="rating" className="w-[1rem]" />
            <span className="ml-2"> {movie?.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={() => handleMovie(headerMovie)}
          className="text-xs bg-mainCol text-black border border-transparent hover:scale-90 hover:border-black hover:bg-transparent py-2 px-4 ease-in-out duration-500  cursor-pointer"
        >
          Read more
        </button>
      </div>
    </div>
  );
}

export default Movie;
