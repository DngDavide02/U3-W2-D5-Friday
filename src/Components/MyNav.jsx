import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/24/outline";
import "./MyNav.css";
import logo from "../assets/METEOCODE.png";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/details/${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-container" aria-label="Go to WeatherApp homepage">
          <img src={logo} alt="METEOCODE" className="logo" />
          <span className="logo-text">METEOCODE</span>
        </Link>

        <form onSubmit={handleSubmit} className="search-container" role="search" aria-label="Search city">
          <div className="search-box">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="search"
              placeholder="Search city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Enter name of city to search"
              className="search-input"
              required
            />
          </div>
        </form>

        <div className="nav-menu">
          <Link to="/" className="nav-link">
            <HomeIcon className="nav-icon" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
