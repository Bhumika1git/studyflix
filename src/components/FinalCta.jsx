import { Link } from "react-router-dom";
import "./FinalCta.css";

function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <span className="final-cta-label">MAKE THE NEXT HOUR COUNT</span>
      <h2 id="final-cta-title">
        Your attention
        <br />
        is worth protecting.
      </h2>
      <p>Start with one focused session and see where it takes you.</p>
      <Link to="/signup" className="final-cta-link">
        Start studying <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default FinalCta;
