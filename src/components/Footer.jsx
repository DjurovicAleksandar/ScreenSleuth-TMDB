import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../config/context/AuthContext';
import github from '../assets/socials/github.png';
import instagram from '../assets/socials/instagram.png';
import linkedin from '../assets/socials/linkedin.png';
import portfolio from '../assets/socials/portfolio.png';
// import { handleLogout } from '../helperFunctions';

function Footer() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const sign = user
    ? [['Watchlist', '/watchlist'], ['Logout']]
    : [
        ['Sign up', '/signup'],
        ['Sign in', '/signin'],
      ];

  const categories = [
    ['Latest', '/latest'],
    ['Trending', '/trending'],
    ['Upcoming', '/upcoming'],
    ['Top rated', '/greatestofalltime'],
  ];

  const socials = [
    [portfolio, 'https://aleksandardjurovic.netlify.app/'],
    [github, 'https://github.com/DjurovicAleksandar?tab=repositories'],
    [linkedin, 'https://www.linkedin.com/in/djuraleksandar/'],
    [instagram, 'https://www.instagram.com/nekultivisan/'],
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const qucikLink = [['Home', ''], ...sign];

  return (
    <footer className=" text-mainCol text-[10px] md:text-xs lg:text-sm p-6 flex flex-col justify-center mt-32 border-[1px] border-transparent border-t-mainCol">
      <div className="flex items-start justify-around">
        {' '}
        <div className="w-1/2 ">
          <h2 className="font-semibold mb-2 underline text-red-200">About</h2>
          <p className="lg:w-[510px]">
            ScreenSleuth is a comprehensive movie database powered by TMDB API.
            Explore a vast collection of films and TV shows, with in-depth
            information about each title including plot summaries, ratings and a
            trailer.
            {screen.width <= 600 ? (
              <span>&nbsp;</span>
            ) : (
              <span>
                Whether you're a cinephile or just looking for something to
                watch, ScreenSleuth has got you covered.
              </span>
            )}
          </p>
        </div>
        <div>
          <h2 className="font-semibold mb-2 underline">Categories</h2>
          <ul>
            {categories.map(([title, path], index) => {
              return (
                <Link key={index} to={path}>
                  <li className="active:text-blue-500 cursor-pointer hover:scale-110">
                    {title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2 underline">Quick links</h2>
          <ul>
            {qucikLink.map(([title, path], index) => {
              if (title === 'Home')
                return (
                  <li
                    className="active:text-blue-500 cursor-pointer hover:scale-110"
                    key={index}
                  >
                    <button onClick={scrollTop}>{title}</button>
                  </li>
                );

              if (title === 'Log out')
                return (
                  <li
                    className="active:text-blue-500 cursor-pointer hover:scale-110"
                    key={index}
                  >
                    <button onClick={handleLogout}>{title}</button>
                  </li>
                );
              return (
                <Link key={index} to={path}>
                  <li className="active:text-blue-500 cursor-pointer hover:scale-110">
                    {title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border border-transparent border-t-mainCol w-[87%] self-center mt-6 pt-6 flex items-center justify-between">
        <p>
          Copyright &copy; Developed by{' '}
          <a target="_blank" href="https://aleksandardjurovic.netlify.app/">
            Aleksandar Đurović
          </a>{' '}
        </p>
        <ul className="flex gap-4 items-center justify-around">
          {socials.map(([social, url], index) => {
            return (
              <li key={index} className="cursor-pointer">
                <a href={url} target="_blank">
                  <img src={social} alt="social-icon" className="w-[25px]" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
