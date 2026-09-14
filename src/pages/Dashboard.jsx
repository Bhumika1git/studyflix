import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/learning.css";
import "../styles/dashboard.css";

const modules = [
  {
    label: "Learning",
    description: "Continue courses and build momentum.",
    path: "/learning"
  },
  {
    label: "Progress",
    description: "Review your completed learning work.",
    path: "/progress"
  },
  {
    label: "TeamMatch",
    description: "Find peers to learn and collaborate with.",
    path: "/teammatch"
  },
  {
    label: "Settings",
    description: "Manage your account preferences.",
    path: "/settings"
  }
];

function Dashboard() {
  return (
    <div className="studyflix-page dashboard-page">
      <Navbar />

      <main className="dashboard-content">
        <header className="dashboard-intro">
          <p className="dashboard-kicker">StudyFlix workspace</p>
          <h1>Welcome back.</h1>
          <p>
            Keep your learning moving with quick access to your courses,
            progress, and study community.
          </p>
        </header>

        <section aria-labelledby="dashboard-modules-title">
          <div className="dashboard-section-heading">
            <p className="dashboard-kicker">Your modules</p>
            <h2 id="dashboard-modules-title">Choose where to go next</h2>
          </div>

          <div className="dashboard-module-grid">
            {modules.map((module) => (
              <Link
                className="dashboard-module-card"
                key={module.path}
                to={module.path}
              >
                <span className="dashboard-module-arrow" aria-hidden="true">
                  ↗
                </span>
                <h3>{module.label}</h3>
                <p>{module.description}</p>
                <span className="dashboard-module-link">Open module</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;