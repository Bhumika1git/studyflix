import { Link } from "react-router-dom";

export default function ContinueLearningCard({ continueData }) {
  if (!continueData || !continueData.course) {
    return null;
  }

  const { course, progressPercent = 0, completedTopics = 0, totalTopics = 0, activeTrack } = continueData;

  return (
    <section className="sf-continue-section" aria-label="Continue Learning">
      <div className="sf-continue-card">
        <div className="sf-continue-main">
          <div className="sf-continue-meta">
            <span className="sf-continue-badge">
              <span className="sf-pulse-dot"></span>
              Continue Learning
            </span>
            <span className="sf-continue-course-title">
              {course.title} • {course.category}
            </span>
          </div>

          <h3 className="sf-continue-episode-title">
            {course.title} — {activeTrack || "Single Comprehensive Course"}
          </h3>
          <p style={{ margin: "4px 0 16px", fontSize: "14px", color: "var(--muted)" }}>
            {course.tagline}
          </p>

          <div className="sf-continue-progress-wrap">
            <div className="sf-progress-header">
              <span>
                Syllabus Progress {totalTopics > 0 ? `(${completedTopics}/${totalTopics} Topics Completed)` : ""}
              </span>
              <span className="sf-progress-percent">{progressPercent}%</span>
            </div>
            <div className="sf-progress-track">
              <div
                className="sf-progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="sf-continue-action">
          <Link
            to={`/course/${course.id}`}
            className="sf-btn-resume"
            title={`Resume ${course.title}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Resume Course</span>
          </Link>
          <span style={{ fontSize: "11px", color: "var(--muted)" }}>
            Full Duration: {course.totalDuration}
          </span>
        </div>
      </div>
    </section>
  );
}
