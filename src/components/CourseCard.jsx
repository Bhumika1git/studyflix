import { Link } from "react-router-dom";

export default function CourseCard({
  course,
  completedEpisodes = [],
  progressPercent = 0,
  upNextEpisode
}) {
  const isCompleted = progressPercent === 100;
  const buttonLabel = progressPercent > 0 ? (isCompleted ? "Review Course" : "Continue") : "Start Course";

  return (
    <div className="sf-course-card">
      <div className="sf-course-header">
        <div className="sf-course-icon-badge" style={{ borderColor: course.badgeColor ? `${course.badgeColor}40` : undefined }}>
          <span>{course.icon || "📚"}</span>
        </div>
        <span className="sf-category-chip">{course.category}</span>
      </div>

      <h3 className="sf-course-card-title">{course.title}</h3>
      <p className="sf-course-tagline">{course.tagline}</p>

      <div className="sf-course-meta-row">
        <span>{course.episodes.length} Episodes</span>
        <span className="sf-course-meta-dot"></span>
        <span>{course.totalDuration}</span>
        <span className="sf-course-meta-dot"></span>
        <span>{course.level}</span>
      </div>

      <div className="sf-course-card-progress">
        <div className="sf-progress-header">
          <span>{completedEpisodes.length} of {course.episodes.length} completed</span>
          <span className="sf-progress-percent">{progressPercent}%</span>
        </div>
        <div className="sf-progress-track">
          <div
            className="sf-progress-fill"
            style={{
              width: `${progressPercent}%`,
              background: isCompleted ? "linear-gradient(90deg, #10b981, #059669)" : undefined
            }}
          ></div>
        </div>
      </div>

      <div className="sf-course-footer">
        <div className="sf-course-upnext" title={upNextEpisode ? `Up next: ${upNextEpisode.title}` : ""}>
          {isCompleted ? (
            <span style={{ color: "var(--sf-success)", fontWeight: 600 }}>🎉 Course Completed!</span>
          ) : upNextEpisode ? (
            <span>Next: <strong>{upNextEpisode.title}</strong></span>
          ) : (
            <span>Ready to begin</span>
          )}
        </div>

        <Link to={`/course/${course.id}`} className="sf-btn-view-course">
          <span>{buttonLabel}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
}
