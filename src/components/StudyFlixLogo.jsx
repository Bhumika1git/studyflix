import { Link } from "react-router-dom";
import "./StudyFlixLogo.css";

function StudyFlixLogo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`studyflix-logo ${className}`.trim()}
      aria-label="StudyFlix home"
    >
      <span>Study</span>
      <span className="studyflix-logo-flix">Flix</span>
    </Link>
  );
}

export default StudyFlixLogo;
