const setToken = (token: string) => {
  localStorage.setItem('@store-token', token);
};

const getToken = () => {
  return localStorage.getItem('@store-token') || '';
};

const removeToken = () => {
  localStorage.removeItem('@store-token');
  localStorage.removeItem('@store-user');
  window.location.href = '/login';
};

const setCurrentUser = (data: any) => {
  localStorage.setItem('@store-user', JSON.stringify(data));
};

const removeCurrentUser = () => {
  localStorage.removeItem('@store-user');
};

export { removeToken, setToken, getToken, setCurrentUser, removeCurrentUser };
