import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Learning", path: "/learning" },
    { name: "Course", path: "/course" },
    { name: "TeamMatch", path: "/teammatch" },
    { name: "Progress", path: "/progress" }
  ];

  return (
    <header className="sf-navbar">
      <Link to="/" className="sf-brand">
        <div className="sf-brand-icon">S</div>
        <span>StudyFlix</span>
        <span className="sf-brand-tag">EDU</span>
      </Link>

      <nav aria-label="Main Navigation">
        <ul className="sf-nav-links">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/course" && location.pathname.startsWith("/course"));
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`sf-nav-link ${isActive ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sf-user-chip">
        <div className="sf-avatar">A</div>
        <div className="sf-user-info">
          <span className="sf-user-name">Arnav</span>
          <span className="sf-user-role">1st Year CSE</span>
        </div>
      </div>
    </header>
  );
}
