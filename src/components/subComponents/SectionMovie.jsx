import { POSTER_PATH } from '../../config/data';

function SectionMovie({ movie, handleClick }) {
  return (
    <div
      onClick={() => handleClick(movie.index)}
      className="min-w-fit h-[100px] lg:h-[150px] hover:h-[200px] lg:hover:h-[250px] relative overflow-hidden cursor-pointer  ease-linear duration-300"
    >
      <img
        className="w-full h-full"
        src={`${POSTER_PATH}${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
}

export default SectionMovie;
