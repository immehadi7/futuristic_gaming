// FRONT END fetching data from BACKEND

import api from './api';

export const fetchGames = async () => {
  const response = await api.get('/games'); // BACKEND endpoint
  return response.data;
};

export const fetchGameById = async (id) => {
  const response = await api.get(`/games/${id}`); // BACKEND endpoint
  return response.data;
};