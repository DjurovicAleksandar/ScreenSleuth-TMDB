import bg from '../../assets/signbg.jpg';
import Row from './Row';
import { UPCOMING, NOW_PLAYING, TRENDING, TOP } from '../../config/data.js';

function Main({ handleMovie }) {
  const rows = [
    ['LATEST', '/latest', NOW_PLAYING],
    ['TRENDING', '/trending', TRENDING],
    ['UPCOMING', '/upcoming', UPCOMING],
    ['TOP RATED', '/greatestofalltime', TOP],
  ];

  return (
    <div className="w-full px-4 py-6 relative">
      {rows.map(([title, path, url], index) => {
        return (
          <Row
            key={index}
            handleMovie={handleMovie}
            fetchUrl={url}
            title={title}
            rootPath={path}
          />
        );
      })}
    </div>
  );
}

export default Main;
