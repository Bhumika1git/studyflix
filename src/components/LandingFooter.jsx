import { Link } from "react-router-dom";
import "./LandingFooter.css";

function LandingFooter() {
  return (
    <footer className="landing-footer">
      <Link to="/" className="landing-footer-brand" aria-label="StudyFlix home">
        Study<span>Flix</span>
      </Link>

      <p className="landing-footer-note">
        A quieter way to learn.
      </p>

      <nav className="landing-footer-links" aria-label="Footer">
        <a href="#problem">Problem</a>
        <a href="#how-it-works">How it works</a>
        <a href="#features">Features</a>
      </nav>
    </footer>
  );
}

export default LandingFooter;
