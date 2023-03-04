import { useNavigate } from 'react-router-dom';
import { UserAuth } from './context/AuthContext';

export const handleLogout = async () => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();

  try {
    await logOut();
    navigate('/', { replace: true });
  } catch (error) {
    console.error(error);
  }
};
