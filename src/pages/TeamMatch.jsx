import "./TeamMatch.css";

function TeamMatch() {
  return (
    <div className="teammatch-page">

      <main className="teammatch-content">

        <p className="teammatch-label">STUDYFLIX TEAMMATCH</p>

        <h1 className="teammatch-title">
          Find Your Study Partners
        </h1>

        <p className="teammatch-description">
          Connect with students who share your skills,
          study habits, and goals.
        </p>

        <div className="teammatch-search">
          <input
            type="text"
            placeholder="Search students or skills..."
          />
        </div>

        <div className="teammatch-filters">

          <button className="teammatch-filter-active">
            All
          </button>

          <button>Java</button>
          <button>JavaScript</button>
          <button>React</button>
          <button>DBMS</button>
          <button>DSA</button>
          <button>Python</button>

        </div>

        <section className="teammatch-card-area">

          <div className="teammatch-card-placeholder">
            <p>Student profiles will appear here</p>
          </div>

        </section>

        <div className="teammatch-actions">

          <button className="teammatch-pass-button">
            ❌ Pass
          </button>

          <button className="teammatch-connect-button">
            ❤️ Connect
          </button>

        </div>

      </main>

    </div>
  );
}

export default TeamMatch;
