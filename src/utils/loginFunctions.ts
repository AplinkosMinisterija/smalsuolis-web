import Cookies from 'universal-cookie';
import { UserReducerProps } from '../state/user/reducer';

const cookies = new Cookies();

interface UpdateTokenProps {
  token?: string;
  error?: string;
  message?: string;
  refreshToken?: string;
}

export const emptyUser: UserReducerProps = {
  userData: {},
  loggedIn: false,
};

export const clearCookies = () => {
  cookies.remove('token', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });
  cookies.remove('module', { path: '/' });
};

export const handleUpdateTokens = (data: UpdateTokenProps) => {
  const { token, refreshToken } = data;

  if (token) {
    cookies.set('token', `${token}`, {
      path: '/',
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
    });
  }

  if (refreshToken) {
    cookies.set('refreshToken', `${refreshToken}`, {
      path: '/',
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 30),
    });
  }
};
