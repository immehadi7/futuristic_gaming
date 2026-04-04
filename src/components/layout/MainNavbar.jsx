import { useMemo, useState } from "react";
import { Navbar, Nav, Container, Form, InputGroup, Button } from "react-bootstrap";
import { Search, Gamepad2 } from "lucide-react";
import "./MainNavbar.css";

export default function MainNavbar({ games = [], onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Search by game name, description, and price text
  const filteredResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return [];

    return games.filter((game) => {
      const nameMatch = game.name?.toLowerCase().includes(term);
      const descriptionMatch = game.description?.toLowerCase().includes(term);
      const priceMatch = String(game.price).includes(term);

      return nameMatch || descriptionMatch || priceMatch;
    });
  }, [games, searchTerm]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const term = value.trim().toLowerCase();

    setSearchTerm(value);
    setShowResults(true);

    if (!onSearch) return;

    if (!term) {
      onSearch(games, "");
      return;
    }

    const matches = games.filter((game) => {
      const nameMatch = game.name?.toLowerCase().includes(term);
      const descriptionMatch = game.description?.toLowerCase().includes(term);
      const priceMatch = String(game.price).includes(term);

      return nameMatch || descriptionMatch || priceMatch;
    });

    onSearch(matches, value);
  };

  const handleSuggestionClick = (selectedGameName) => {
    setSearchTerm(selectedGameName);
    setShowResults(false);

    if (!onSearch) return;

    const matches = games.filter((game) =>
      game.name?.toLowerCase().includes(selectedGameName.toLowerCase())
    );

    onSearch(matches, selectedGameName);
  };

  return (
    <Navbar expand="lg" className="futuristic-navbar py-3" sticky="top">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand href="#home" className="brand-logo d-flex align-items-center gap-2">
          <Gamepad2 size={22} />
          <span>FuturisticGaming</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" className="nav-toggle-custom" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto align-items-lg-center gap-lg-3 nav-center-links">
            <Nav.Link href="#home" className="nav-link-futuristic">Home</Nav.Link>
            <Nav.Link href="#popular-games" className="nav-link-futuristic">All Popular Games</Nav.Link>
            <Nav.Link href="#contact-us" className="nav-link-futuristic">Contact Us</Nav.Link>
            <Nav.Link href="#live-chat" className="nav-link-futuristic">Live Chat</Nav.Link>
          </Nav>

          <div className="d-flex align-items-lg-center flex-column flex-lg-row gap-3 position-relative navbar-right-area">
            <div className="search-wrapper position-relative">
              <InputGroup className="search-group-futuristic">
                <InputGroup.Text className="search-icon-box">
                  <Search size={16} />
                </InputGroup.Text>

                <Form.Control
                  type="text"
                  placeholder="Search game name, price, keyword..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => {
                    setTimeout(() => setShowResults(false), 150);
                  }}
                  className="search-input-futuristic"
                />
              </InputGroup>

              {showResults && searchTerm.trim() && (
                <div className="search-results-box">
                  {filteredResults.length > 0 ? (
                    filteredResults.slice(0, 8).map((game) => (
                      <button
                        key={game.id}
                        type="button"
                        className="search-result-item"
                        onClick={() => handleSuggestionClick(game.name)}
                      >
                        <div className="d-flex flex-column">
                          <span className="result-title">{game.name}</span>
                          <span className="result-desc">
                            {game.description.slice(0, 55)}...
                          </span>
                        </div>
                        <span className="result-price">¥{game.price}</span>
                      </button>
                    ))
                  ) : (
                    <div className="search-no-result">No matching game found</div>
                  )}
                </div>
              )}
            </div>

            <Button className="nav-btn-login">Login</Button>
            <Button className="nav-btn-register">Register</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}