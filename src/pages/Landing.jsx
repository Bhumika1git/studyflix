import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "./Landing.css";

/**
 * Landing page — Navbar + Hero only.
 *
 * Naming convention: every page-specific class is prefixed "landing-"
 * (per team convention — see Landing.css header). No shared/generic class
 * names are used here.
 *
 * ASSUMPTIONS (flag if wrong):
 * - ThemeToggle is self-contained and reads theme state via its own
 *   useTheme() call internally — rendered here with no props.
 * - Routes "/login" and "/signup" already exist.
 * - "#problem" / "#how-it-works" / "#features" don't exist yet; those
 *   nav links are wired for when those sections are built.
 * - ThemeProvider sets a data-theme="paper" | "screen" attribute
 *   somewhere in the ancestor tree (html or body). If it uses a class
 *   or a different attribute name instead, only the selector at the
 *   top of Landing.css needs to change.
 */
export default function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-navbar">
        <Link to="/" className="landing-navbar-brand" aria-label="StudyFlix home">
          Study<span className="landing-navbar-brand-mark">Flix</span>
        </Link>

        <nav className="landing-navbar-links" aria-label="Primary">
          <a href="#problem" className="landing-navbar-link">
            Problem
          </a>
          <a href="#how-it-works" className="landing-navbar-link">
            How it works
          </a>
          <a href="#features" className="landing-navbar-link">
            Features
          </a>
          <Link to="/login" className="landing-navbar-link">
            Log in
          </Link>
        </nav>

        <div className="landing-navbar-actions">
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <div className="landing-hero-content">
            <p 
            className="landing-hero-eyebrow">
              For students who are tired of scrolling
            </p>
            <h1 id="landing-hero-title" className="landing-hero-title">
                              Your attention
                              <br />
                              deserves better.
                              </h1>

            <p className="landing-hero-description">
              StudyFlix turns scattered study time into focused learning —
              without making learning feel like punishment.
            </p>

            <div className="landing-hero-actions">
              <Link to="/signup" className="landing-hero-cta">
                Start your journey <span aria-hidden="true">→</span>
              </Link>
              <p className="landing-hero-note">
                No streaks to guilt you. No feed to lose an hour to.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
