import clienteAxios from './axios';

// function solo hace colocar el token y enviarlo via headers
const tokenAuth = token => {
  if (token) {
    clienteAxios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete clienteAxios.defaults.headers.common['x-auth-token'];
  }
};

export default tokenAuth;
