import Header from './subComponents/Header';
import Main from './subComponents/Main';
import Footer from './Footer.jsx';

import { useState, useEffect } from 'react';
import { IMG_PATH, TRENDING } from '../config/data.js';

function Home() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    setMovie(movies[Math.round(Math.random() * movies.length)]);
  }, [movies]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(TRENDING);
        if (!res.ok) throw new Error(`Error occured. Try again ${res.status}`);
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleMovie = mov => {
    setMovie(mov);
    setTimeout(() => window.scrollTo({ top: 0, behaviour: 'smooth' }), 300);
  };

  return (
    <div className="w-full">
      <Header movie={movie} />
      <Main handleMovie={handleMovie} />
      <Footer />
    </div>
  );
}

export default Home;
