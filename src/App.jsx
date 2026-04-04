import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/layout/MainNavbar";
import HeroCarousel from "./components/HeroCarousel";
import GameCards from "./components/GameCards.jsx";
import ContactUs from "./components/ContactUs.jsx";
import AuthModal from "./components/auth/AuthModal";
import PaymentResultPage from "./pages/PaymentResultPage";
import gamesData from "./data/gamesData";

function HomePage() {
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  const handleSearch = (results, term) => {
    setFilteredGames(results);
    setSearchTerm(term);
  };

  const openLogin = () => {
    setAuthTab("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthTab("register");
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
  };

  return (
    <div className="w-full min-h-screen">
      <MainNavbar
        games={gamesData}
        onSearch={handleSearch}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
      />

      <HeroCarousel />

      <section id="popular-games">
        <GameCards games={filteredGames} searchTerm={searchTerm} />
      </section>

      <section id="contact-us">
        <ContactUs />
      </section>

      <section id="live-chat" />

      <AuthModal
        isOpen={authOpen}
        onClose={closeAuth}
        initialTab={authTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/payment-result" element={<PaymentResultPage />} />
    </Routes>
  );
}