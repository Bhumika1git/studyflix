import { useState, useRef } from "react";
import "./TeamMatch.css";
import StudentCard from "../components/StudentCard";
import students from "../data/students";

function TeamMatch() {
    const [currentStudent, setCurrentStudent] = useState(0);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const startX = useRef(0);
  const handlePointerDown = (e) => {
  setIsDragging(true);
  startX.current = e.clientX;
};

const handlePointerMove = (e) => {
  if (!isDragging) return;

  const distance = e.clientX - startX.current;
  setDragX(distance);
};

const handlePointerUp = () => {
  if (!isDragging) return;

  setIsDragging(false);

  if (!filteredStudents.length) {
    setDragX(0);
    return;
  }

  const current =
    filteredStudents[currentStudent % filteredStudents.length];

  if (dragX > 120) {
    setSwipeDirection("right");
    setMessage(`Connection request sent to ${current.name}! ❤️`);

    setTimeout(() => {
      setCurrentStudent(
        (currentStudent + 1) % filteredStudents.length
      );
      setDragX(0);
      setSwipeDirection(null);
    }, 250);

  } else if (dragX < -120) {
    setSwipeDirection("left");
    setMessage("");

    setTimeout(() => {
      setCurrentStudent(
        (currentStudent + 1) % filteredStudents.length
      );
      setDragX(0);
      setSwipeDirection(null);
    }, 250);

  } else {
    setDragX(0);
  }
};

//   const filteredStudents = students.filter((student) => {
//   const search = searchTerm.toLowerCase();

//   return (
//     student.name.toLowerCase().includes(search) ||
//     student.skills.some((skill) =>
//       skill.toLowerCase().includes(search)
//     )
//   );
// });

const filteredStudents = students.filter((student) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    student.name.toLowerCase().includes(search) ||
    student.skills.some((skill) =>
      skill.toLowerCase().includes(search)
    );

  const matchesSkill =
    selectedSkill === "All" ||
    student.skills.includes(selectedSkill);

  return matchesSearch && matchesSkill;
});

const displayedStudent =
  filteredStudents.length > 0
    ? filteredStudents[currentStudent % filteredStudents.length]
    : null;
  return (
    <div className="teammatch-page">

      {/* NAVBAR */}
      <nav className="teammatch-navbar">
        <div className="teammatch-logo">
          <span>📚</span> StudyFlix
        </div>

        <div className="teammatch-nav-links">
          <span>Home</span>
          <span>My Courses</span>
          <span>My Projects</span>
          <span className="teammatch-nav-active">TeamMatch</span>
        </div>

        <div className="teammatch-nav-icons">
          <span>⌕</span>
          <span>🔔</span>
          <span className="teammatch-profile-circle">D</span>
        </div>
      </nav>


      {/* MAIN CONTENT */}
      <main className="teammatch-content">

        {/* HERO */}
        <section className="teammatch-hero">

          <p className="teammatch-label">
            STUDYFLIX • TEAMMATCH
          </p>

          <h1 className="teammatch-title">
            Find Your Study Partners
          </h1>

          <p className="teammatch-description">
            Connect with students who share your skills,
            study habits and goals.
          </p>


          {/* SEARCH */}
          <div className="teammatch-search">
            <span className="teammatch-search-icon">⌕</span>

            <input
  type="text"
  placeholder="Search students by name or skill..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
          </div>


          {/* FILTERS */}
          <div className="teammatch-filters">

            <button
  className={selectedSkill === "All" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("All");
    setCurrentStudent(0);
  }}
>
  All
</button>

<button
  className={selectedSkill === "Java" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("Java");
    setCurrentStudent(0);
  }}
>
  Java
</button>

<button
  className={selectedSkill === "React" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("React");
    setCurrentStudent(0);
  }}
>
  React
</button>

<button
  className={selectedSkill === "DBMS" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("DBMS");
    setCurrentStudent(0);
  }}
>
  DBMS
</button>

<button
  className={selectedSkill === "DSA" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("DSA");
    setCurrentStudent(0);
  }}
>
  DSA
</button>

<button
  className={selectedSkill === "Python" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("Python");
    setCurrentStudent(0);
  }}
>
  Python
</button>

<button
  className={selectedSkill === "JavaScript" ? "teammatch-filter-active" : ""}
  onClick={() => {
    setSelectedSkill("JavaScript");
    setCurrentStudent(0);
  }}
>
  JavaScript
</button>

          </div>

        </section>


        {/* TEAMMATES SECTION */}
        <section className="teammatch-students-section">

          <p className="teammatch-section-label">
            TEAMMATES
          </p>

          <h2 className="teammatch-section-title">
            Students looking for teammates
          </h2>

          <p className="teammatch-section-description">
            Find someone with the skills, energy and study habits
            that match yours.
          </p>

          <p className="teammatch-funny-text">
            Because "kal pakka padhte hain" needs to become
            "aaj sach mein padhte hain." 😭
          </p>


          {/* CARD DECK */}
          <div className="teammatch-card-deck">
            <div className="teammatch-background-card teammatch-background-left">
            </div>
            <div className="teammatch-background-card teammatch-background-right">
            </div>


            {/* MAIN CARD */}
           {filteredStudents.length > 0 ? (
  <div
  className="teammatch-swipe-card"
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
  style={{
  transform:
    swipeDirection === "right"
      ? "translateX(600px) rotate(20deg)"
      : swipeDirection === "left"
      ? "translateX(-600px) rotate(-20deg)"
      : `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`,

  cursor: isDragging ? "grabbing" : "grab"
}}
>
  {dragX < -50 && (
  <div className="teammatch-swipe-label teammatch-pass-label">
    PASS
  </div>
)}

{dragX > 50 && (
  <div className="teammatch-swipe-label teammatch-connect-label">
    CONNECT
  </div>
)}
  <StudentCard student={displayedStudent} />
</div>
) : (
  <div className="teammatch-no-results">
    <h3>No students found 😭</h3>
    <p>Try another name or skill.</p>
  </div>
)}

          </div>


          {/* ACTION BUTTONS */}
          <div className="teammatch-actions">

           <button
  className="teammatch-pass-button"
  onClick={() => {
    if (!filteredStudents.length) return;

    setMessage("");

    setCurrentStudent(
      (currentStudent + 1) % filteredStudents.length
    );
  }}
>
  ✕ &nbsp; Pass
</button>

           <button
  className="teammatch-connect-button"
  onClick={() => {
    setMessage(`Connection request sent to ${displayedStudent?.name}! ❤️`);
    setCurrentStudent((currentStudent + 1) % students.length);
  }}
>
  ♥ &nbsp; Connect
</button>

          </div>

{message && (
  <p className="teammatch-connect-message">
    {message}
  </p>
)}
        </section>

      </main>

    </div>
  );
}

export default TeamMatch;
