import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-heading">
        <span className="how-it-works-label">
          HOW STUDYFLIX WORKS
        </span>

        <h2>
          Less scrolling.
          <br />
          More studying.
        </h2>

        <p>
          StudyFlix is designed around one simple idea:
          make focused learning easier to start and easier to stick with.
        </p>
      </div>

      <div className="how-it-works-process">
        <article className="how-it-works-step">
          <span className="how-it-works-number">01</span>

          <div>
            <h3>FOCUS</h3>
            <p>
              Choose one thing you want to accomplish.
              No endless feed. No distractions.
            </p>
          </div>
        </article>

        <article className="how-it-works-step">
          <span className="how-it-works-number">02</span>

          <div>
            <h3>LEARN</h3>
            <p>
              Break your learning into short,
              focused sessions that respect your attention.
            </p>
          </div>
        </article>

        <article className="how-it-works-step">
          <span className="how-it-works-number">03</span>

          <div>
            <h3>CONNECT</h3>
            <p>
              Find students working toward similar goals
              and learn alongside them.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HowItWorks;