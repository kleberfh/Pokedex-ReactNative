import axios from 'axios';

const instanceHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

instance.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    return Promise.reject(error);
  }
);

export const getPokemons = () => {
  return instance.get('pokemon?limit=151&offset=0');
}

export const getPokemon = (id) => {
  return instance.get(`pokemon/${id}`);
}

export const searchPokemon = (query) => {
  return instance.get(`pokemon/${query}`);
}

export default async function TinnovaRequestHandler(
  url,
  method,
  body = undefined
) {
  const config = {
    headers: {
      ...instanceHeader,
    },
  };

  if (method === 'GET' && body) {
    config.params = body;
    config.data = undefined;
  } else {
    config.data = body;
  }

  return instance.request({
    url,
    method,
    ...config,
  });
}
