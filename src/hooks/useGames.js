// FRONT END data hook

import { useEffect, useState } from 'react';
import { fetchGames } from '../services/gameService';

const useGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  return { games };
};

export default useGames;