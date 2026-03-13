import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p>&copy; 2025 WeatherCode. All rights reserved.</p>
      <p>
        Made with{" "}
        <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
          API OpenWeather
        </a>
      </p>
      <small>Version 1.0.0</small>
    </footer>
  );
}

export default Footer;
