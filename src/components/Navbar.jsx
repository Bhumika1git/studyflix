import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import StudyFlixLogo from "./StudyFlixLogo";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Learning", path: "/learning" },
    { name: "Course", path: "/course" },
    { name: "TeamMatch", path: "/teammatch" },
    { name: "Progress", path: "/progress" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <header className="sf-navbar">
      <StudyFlixLogo className="sf-brand" />

      <nav aria-label="Main Navigation">
        <ul className="sf-nav-links">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/course" &&
                location.pathname.startsWith("/course"));

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

      <ThemeToggle />
    </header>
  );
}