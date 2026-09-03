export default function EpisodeCard({
  episode,
  isCompleted,
  isActive,
  isLocked,
  onSelect,
  onToggleComplete
}) {
  // Pad episode number to two digits (e.g., 1 -> "01")
  const paddedNumber = String(episode.number).padStart(2, "0");

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <span className="sf-status-badge badge-completed">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Completed
        </span>
      );
    }
    if (isActive) {
      return (
        <span className="sf-status-badge badge-learning">
          <span className="sf-pulse-dot"></span>
          Now Playing
        </span>
      );
    }
    if (isLocked) {
      return (
        <span className="sf-status-badge badge-locked">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Locked
        </span>
      );
    }
    return (
      <span className="sf-status-badge badge-notstarted">
        Not Started
      </span>
    );
  };

  const handleCardClick = () => {
    if (isLocked) return;
    if (onSelect) onSelect(episode);
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (isLocked) return;
    if (onToggleComplete) onToggleComplete(episode.id);
  };

  const cardClasses = [
    "sf-episode-card",
    isActive ? "active" : "",
    isCompleted ? "completed" : "",
    isLocked ? "locked" : ""
  ].filter(Boolean).join(" ");

  return (
    <div
      className={cardClasses}
      onClick={handleCardClick}
      title={isLocked ? "Complete previous episode to unlock" : `Play ${episode.title}`}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isLocked) {
          handleCardClick();
        }
      }}
    >
      <div className="sf-ep-number-box">
        {isCompleted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : isLocked ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        ) : (
          paddedNumber
        )}
      </div>

      <div className="sf-ep-info-main">
        <div className="sf-ep-card-top">
          <h4 className="sf-ep-card-title">{episode.title}</h4>
        </div>
        <div className="sf-ep-card-meta">
          <span>{episode.duration}</span>
          <span>•</span>
          {getStatusBadge()}
        </div>
      </div>

      {!isLocked && (
        <button
          className={`sf-ep-toggle-check-btn ${isCompleted ? "checked" : ""}`}
          onClick={handleToggleClick}
          title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          aria-label={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
}
