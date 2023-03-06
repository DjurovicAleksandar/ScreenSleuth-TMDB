import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Favourites from './Favourites';
import GOAT from './GOAT';
import Latest from './Latest';
import Navigation from './Navigation';
import Trending from './Trending';
import Upcoming from './Upcoming';
import Search from './subComponents/Search';
import SignUp from './Logins/SignUp';
import SignIn from './Logins/SignIn';
import { AuthContextProvider } from '../config/context/AuthContext';
import ProtectedRoute from '../ProtectedRoute';
import Watchlist from './Watchlist';

const Root = () => {
  return (
    <>
      <AuthContextProvider>
        <Navigation />
        <Outlet />
      </AuthContextProvider>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/favourites/" element={<Favourites />} />
      <Route path="/latest/" element={<Latest />} />
      <Route path="/greatestofalltime/" element={<GOAT />} />
      <Route path="/trending/" element={<Trending />} />
      <Route path="/upcoming/" element={<Upcoming />} />
      <Route path="/searchresults/:searchQuery" element={<Search />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default router;
