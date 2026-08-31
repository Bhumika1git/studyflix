import "./StudySurface.css";
function StudySurface() {
  return (
    <div className="study-surface">
      <div className="study-surface-header">
        <span className="study-surface-label">TODAY</span>
        <span className="study-surface-date">FOCUS LOG / 01</span>
      </div>

      <div className="study-surface-body">
        <div className="study-surface-mark" aria-hidden="true">
          /
        </div>

        <div>
          <p className="study-surface-kicker">A SMALLER FEED</p>
          <p className="study-surface-title">
            One thing at a time.
          </p>
        </div>
      </div>

      <div className="study-surface-footer">
        <span>FOCUS</span>
        <span className="study-surface-progress">
          <span />
        </span>
        <span>72%</span>
      </div>
    </div>
  );
}

export default StudySurface;