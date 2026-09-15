import { useState, useRef } from "react";
import "./TeamMatch.css";
import StudentCard from "../components/StudentCard";
import students from "../data/students";
import Navbar from "../components/Navbar";

function TeamMatch() {
  const [currentStudent, setCurrentStudent] = useState(0);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const startX = useRef(0);

  /* FILTER STUDENTS */

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

  /* CURRENT STUDENT */

  const displayedStudent =
    filteredStudents.length > 0
      ? filteredStudents[
          currentStudent % filteredStudents.length
        ]
      : null;

  /* START DRAG */

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;

    startX.current = e.clientX;
    setIsDragging(true);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  /* MOVE ONLY WHILE CLICKING */

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const distance = e.clientX - startX.current;

    setDragX(distance);
  };

  /* FINISH DRAG */

  const handlePointerUp = (e) => {
    if (!isDragging) return;

    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Pointer already released
    }

    if (!filteredStudents.length) {
      setDragX(0);
      return;
    }

    const current =
      filteredStudents[
        currentStudent % filteredStudents.length
      ];

    /* CONNECT */

    if (dragX > 120) {
      setSwipeDirection("right");

      setMessage(
        `Connection request sent to ${current.name}! ❤️`
      );

      setTimeout(() => {
        setCurrentStudent(
          (currentStudent + 1) %
            filteredStudents.length
        );

        setDragX(0);
        setSwipeDirection(null);
      }, 300);

      return;
    }

    /* PASS */

    if (dragX < -120) {
      setSwipeDirection("left");

      setMessage("");

      setTimeout(() => {
        setCurrentStudent(
          (currentStudent + 1) %
            filteredStudents.length
        );

        setDragX(0);
        setSwipeDirection(null);
      }, 300);

      return;
    }

    /* SMALL MOVEMENT */

    setDragX(0);
  };

  /* CHANGE FILTER */

  const changeSkill = (skill) => {
    setSelectedSkill(skill);
    setCurrentStudent(0);
    setMessage("");
    setDragX(0);
    setSwipeDirection(null);
  };

  /* PASS BUTTON */

  const handlePass = () => {
    if (!filteredStudents.length) return;

    setMessage("");
    setDragX(0);

    setCurrentStudent(
      (currentStudent + 1) %
        filteredStudents.length
    );
  };

  /* CONNECT BUTTON */

  const handleConnect = () => {
    if (!displayedStudent) return;

    setMessage(
      `Connection request sent to ${displayedStudent.name}! ❤️`
    );

    setCurrentStudent(
      (currentStudent + 1) %
        filteredStudents.length
    );
  };

  /* PREVIOUS STUDENT */

  const previousStudent =
    filteredStudents.length > 1
      ? filteredStudents[
          (currentStudent - 1 + filteredStudents.length) %
            filteredStudents.length
        ]
      : null;

  /* NEXT STUDENT */

  const nextStudent =
    filteredStudents.length > 1
      ? filteredStudents[
          (currentStudent + 1) %
            filteredStudents.length
        ]
      : null;

  return (
    <div className="teammatch-page">

      <Navbar />


      {/* ================= MAIN ================= */}

      <main className="teammatch-content">

        {/* ================= HERO ================= */}

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

            <span className="teammatch-search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search students by name or skill..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentStudent(0);
                setMessage("");
                setDragX(0);
              }}
            />

          </div>


          {/* FILTERS */}

          <div className="teammatch-filters">

            {[
              "All",
              "Java",
              "React",
              "DBMS",
              "DSA",
              "Python",
              "JavaScript"
            ].map((skill) => (

              <button
                key={skill}
                className={
                  selectedSkill === skill
                    ? "teammatch-filter-active"
                    : ""
                }
                onClick={() => changeSkill(skill)}
              >
                {skill}
              </button>

            ))}

          </div>

        </section>


        {/* ================= STUDENTS ================= */}

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


          {/* ================= CARD DECK ================= */}

          {filteredStudents.length > 0 ? (

            <div className="teammatch-card-deck">


              {/* LEFT CARD */}

              <div className="teammatch-side-card teammatch-left-card">

                {previousStudent && (
                  <StudentCard
                    student={previousStudent}
                  />
                )}

              </div>


              {/* CENTER CARD */}

              <div
                className={`teammatch-swipe-card ${
                  isDragging
                    ? "teammatch-is-dragging"
                    : ""
                }`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  transform:
                    swipeDirection === "right"
                      ? "translateX(650px) rotate(8deg)"
                      : swipeDirection === "left"
                      ? "translateX(-650px) rotate(-8deg)"
                      : `translateX(${dragX}px) rotate(${dragX * 0.025}deg)`
                }}
              >

                {/* SWIPE LABEL */}

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


                <StudentCard
                  student={displayedStudent}
                />

              </div>


              {/* RIGHT CARD */}

              <div className="teammatch-side-card teammatch-right-card">

                {nextStudent && (
                  <StudentCard
                    student={nextStudent}
                  />
                )}

              </div>

            </div>

          ) : (

            <div className="teammatch-no-results">

              <h3>
                No students found 😭
              </h3>

              <p>
                Try another name or skill.
              </p>

            </div>

          )}


          {/* ================= ACTION BUTTONS ================= */}

          {filteredStudents.length > 0 && (

            <div className="teammatch-actions">

              <button
                className="teammatch-pass-button"
                onClick={handlePass}
              >
                ✕
                <span>Pass</span>
              </button>

              <button
                className="teammatch-connect-button"
                onClick={handleConnect}
              >
                ♥
                <span>Connect</span>
              </button>

            </div>

          )}


          {/* MESSAGE */}

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