import Navbar from "../components/Navbar";
import "../styles/learning.css";
import "../styles/progress.css";

function Progress() {
  return (
    <div className="progress-page">
      <Navbar />

      <main className="progress-placeholder" aria-labelledby="progress-title">
        <p className="progress-kicker">StudyFlix / Progress</p>
        <h1 id="progress-title">Progress</h1>
        <p className="progress-lead">
          Your learning trail is being prepared.
        </p>

        <div className="progress-divider" aria-hidden="true" />

        <p className="progress-status">Coming Soon</p>
        <p className="progress-description">
          Track what you&apos;ve watched, mastered, and what&apos;s next.
        </p>
      </main>
    </div>
  );
}

export default Progress;