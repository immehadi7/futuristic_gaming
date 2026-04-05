import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/layout/MainNavbar";
import HeroCarousel from "./components/HeroCarousel";
import GameCards from "./components/GameCards";
import ContactUs from "./components/ContactUs";
import AuthModal from "./components/auth/authModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PaymentResultPage from "./pages/PaymentResultPage";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import CheckoutPage from "./pages/CheckoutPage";
import gamesData from "./data/gamesData";
import { clearAuthData, getStoredUser } from "./utils/auth";

function HomePage() {
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = getStoredUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

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

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    clearAuthData();
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <div className="w-full min-h-screen">
      <MainNavbar
        games={gamesData}
        onSearch={handleSearch}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        currentUser={currentUser}
        onLogout={handleLogout}
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
        show={authOpen}
        onClose={closeAuth}
        mode={authTab}
        setMode={setAuthTab}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/client-dashboard"
        element={
          <ProtectedRoute>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment-result" element={<PaymentResultPage />} />
    </Routes>
  );
}