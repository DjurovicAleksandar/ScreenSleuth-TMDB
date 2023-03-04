import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../config/context/AuthContext';
import bg from '../../assets/signbg.jpg';

function Sign({ title, statement }) {
  const [path, signLink] =
    title === 'Sign Up' ? ['/signIn', 'Sign In'] : ['/signUp', 'Sign Up'];
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signUp, logIn } = UserAuth();

  const handleSign = async e => {
    e.preventDefault();
    try {
      if (title === 'Sign Up') await signUp(email, password);
      if (title === 'Sign In') await logIn(email, password);
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
      setError(error.message.replace('Firebase: ', ''));
    }
  };

  return (
    <>
      <div className="w-full h-screen relative flex items-end justify-center text-white">
        <div className="bg-black/70 h-[500px] w-[450px] text-mainCol z-10 mb-6 p-4">
          <div className="mx-auto w-[300px] p-12">
            <h2 className="text-3xl lg:text-3xl mt-20">{title}</h2>
            <form onSubmit={handleSign}>
              <input
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="mt-4 w-full bg-gray-700 rounded p-2 "
              />
              <input
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                autoComplete="password"
                className="mt-4 w-full bg-gray-700 rounded p-2 "
              />
              {error ? (
                <p className="text-xs mt-2 text-red-500 text-center">{error}</p>
              ) : null}
              <input
                type="submit"
                value="Submit"
                className="mt-4 w-full bg-mainCol rounded p-2 text-center text-black hover:scale-90 ease-in-out duration-500 cursor-pointer"
              />
            </form>
            <label
              htmlFor="remember"
              className="text-mainCol-700 text-xs font-light mt-4 cursor-pointer inline-block"
            >
              <input type="checkbox" value="true" id="remember" /> Remember me
            </label>
            <p className="text-mainCol-700 text-xs font-light mt-4">
              {statement} <Link to={path}>{signLink}</Link>
            </p>
          </div>
        </div>
        <img
          src={bg}
          alt="background"
          className="w-full h-full object-cover absolute"
        ></img>
      </div>
    </>
  );
}
export default Sign;
