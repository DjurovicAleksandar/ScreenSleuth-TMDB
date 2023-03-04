import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { SEARCH } from '../config/data';
import { BiHomeAlt } from 'react-icons/bi';
import { UserAuth } from '../config/context/AuthContext';
import { auth } from '../config/firebase';

export default function Navigation() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const rootLocation = useLocation().pathname;

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuery = e => {
    e.preventDefault();
    const fetchUrl = SEARCH(query);

    navigate('/searchresults', { state: { url: fetchUrl } });

    //Clearing query
    setQuery('');
  };

  return (
    <nav className="flex items-center justify-between p-4 w-full absolute z-10">
      <h1 className="text-4xl text-mainCol cursor-pointer font-bold flex">
        <Link to="/">ScreenSleuth</Link>{' '}
        <span>
          {' '}
          <BiHomeAlt name="Home" size={20} />
        </span>
      </h1>
      <div className="hidden sm:flex flex-col items-end justify-center gap-1">
        <div>
          {rootLocation === '/' ? (
            ''
          ) : (
            <Link to="/">
              <button className='hover:scale-90 ease-in-out duration-300 rounded text-mainCol px-6 py-2 cursor-pointer"'>
                Home
              </button>
            </Link>
          )}
          {user?.email ? (
            <>
              <Link to="/watchlist">
                <button className="hover:scale-90 ease-in-out duration-300 rounded text-mainCol px-6 py-2 cursor-pointer">
                  Watchlist
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="hover:scale-90 ease-in-out duration-300 rounded ml-4 text-gray bg-mainCol px-6 py-2 cursor-pointer"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/signIn">
                <button className="hover:scale-90 ease-in-out duration-300 rounded text-mainCol px-6 py-2 cursor-pointer">
                  Sign in
                </button>
              </Link>
              <Link to="/signUp">
                <button className="hover:scale-90 ease-in-out duration-300 rounded ml-4 text-gray bg-mainCol px-6 py-2 cursor-pointer">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
        <form onSubmit={handleQuery}>
          {' '}
          <input
            className="px-6 py-2 rounded bg-mainCol cursor-pointer hover:scale-90 ease-in-out duration-300"
            type="submit"
            value="Search"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={() => setQuery(inputRef.current.value)}
            className="search__input px-6 py-2 rounded ml-1"
            type="text"
            placeholder="Search for a movie"
          />
        </form>
      </div>
    </nav>
  );
}
