import "./Features.css";

const features = [
  {
    number: "01",
    title: "FOCUS",
    description: "Structured focus sessions that reduce distraction.",
  },
  {
    number: "02",
    title: "LEARN",
    description: "Intentional learning through structured courses and content.",
  },
  {
    number: "03",
    title: "TRACK",
    description: "Progress and study activity tracking that keeps momentum visible.",
  },
  {
    number: "04",
    title: "CONNECT",
    description:
      "TeamMatch helps students find compatible study partners.",
  },
];

function Features() {
  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <div className="features-intro">
        <span className="features-label">THE STUDYFLIX METHOD</span>
        <h2 id="features-title">
          A better shape
          <br />
          for study time.
        </h2>
        <p>
          Everything you need to turn scattered effort into a rhythm you can
          return to.
        </p>
      </div>

      <div className="features-list">
        {features.map((feature) => (
          <article className="features-item" key={feature.number}>
            <span className="features-number">{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Features;
