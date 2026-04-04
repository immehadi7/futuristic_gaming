import { useState } from 'react';
import MainNavbar from './components/layout/MainNavbar';
import GameCards from './components/GameCards.jsx';
import ContactUs from './components/ContactUs.jsx';
import gamesData from './data/gamesData';

export default function App() {
  // State for filtered games
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search from navbar
  const handleSearch = (results, term) => {
    setFilteredGames(results);
    setSearchTerm(term);
  };

  return (
    <div className="w-full min-h-screen">
      
      {/* 🔥 NAVBAR */}
      <MainNavbar 
        games={gamesData} 
        onSearch={handleSearch} 
      />

      {/* 🔥 GAME SECTION */}
      <section id="popular-games">
        <GameCards 
          games={filteredGames} 
          searchTerm={searchTerm}
        />
      </section>

      {/* 🔥 CONTACT */}
      <section id="contact-us">
        <ContactUs />
      </section>

    </div>
  );
}