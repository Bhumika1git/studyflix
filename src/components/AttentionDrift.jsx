import "./AttentionDrift.css";
function AttentionDrift() {
  return (
    <section
      className="attention-drift"
      id="problem"
      aria-labelledby="attention-drift-title"
    >
      <div className="attention-drift-heading">
        <span className="attention-drift-label">THE PROBLEM</span>

        <h2 id="attention-drift-title">
          Your attention rarely disappears all at once.
        </h2>

        <p>
          It leaks — one notification, one reel, one tab at a time.
        </p>
      </div>

      <div className="attention-drift-timeline">
        <div className="attention-drift-item">
          <span>09:10</span>
          <strong>I'll study.</strong>
        </div>

        <div className="attention-drift-item">
          <span>09:17</span>
          <strong>Just one reel.</strong>
        </div>

        <div className="attention-drift-item">
          <span>09:42</span>
          <strong>Where did the time go?</strong>
        </div>
      </div>

      <div className="attention-drift-result">
        <span>ATTENTION LOST</span>
        <strong>32 min</strong>
      </div>
    </section>
  );
}

export default AttentionDrift;