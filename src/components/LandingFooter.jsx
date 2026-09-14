import "./LandingFooter.css";
import StudyFlixLogo from "./StudyFlixLogo";

function LandingFooter() {
  return (
    <footer className="landing-footer">
      <StudyFlixLogo className="landing-footer-brand" />

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
