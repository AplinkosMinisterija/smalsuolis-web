import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface UpdateTokenProps {
  token?: string;
  error?: string;
  message?: string;
  refreshToken?: string;
}

export const clearCookies = () => {
  cookies.remove('token', { path: '/' });
  cookies.remove('refreshToken', { path: '/' });
};

export const updateTokens = (data: UpdateTokenProps) => {
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
