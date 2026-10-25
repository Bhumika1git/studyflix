import { useState, useRef, useEffect } from "react";
import "./TeamMatch.css";
import StudentCard from "../components/StudentCard";
import students from "../data/students";

function TeamMatch() {
  const [currentStudent, setCurrentStudent] = useState(0);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");

    /* SENT REQUESTS */

  const [sentRequests, setSentRequests] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("teammatch-sent-requests")
      ) || [];
    } catch {
      return [];
    }
  });

  /* CHAT */

  const [chatStudent, setChatStudent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("teammatch-chat-messages")
      ) || {};
    } catch {
      return {};
    }
  });

  const [newChatMessage, setNewChatMessage] = useState("");

  /* SAVE DATA */

  useEffect(() => {
    localStorage.setItem(
      "teammatch-sent-requests",
      JSON.stringify(sentRequests)
    );
  }, [sentRequests]);

  useEffect(() => {
    localStorage.setItem(
      "teammatch-chat-messages",
      JSON.stringify(chatMessages)
    );
  }, [chatMessages]);

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

    /* ADD CONNECTION REQUEST */

  const addRequest = (student) => {
    setSentRequests((previous) => {
      const alreadySent = previous.some(
        (item) => item.name === student.name
      );

      if (alreadySent) return previous;

      return [...previous, student];
    });
  };

  /* DELETE CONNECTION REQUEST */

  const deleteRequest = (studentName) => {
    setSentRequests((previous) =>
      previous.filter(
        (student) => student.name !== studentName
      )
    );
  };

  /* SEND CHAT MESSAGE */

  const sendChatMessage = (e) => {
    e.preventDefault();

    const text = newChatMessage.trim();

    if (!text || !chatStudent) return;

    const newMessage = {
      id: Date.now(),
      text: text
    };

    setChatMessages((previous) => ({
      ...previous,
      [chatStudent.name]: [
        ...(previous[chatStudent.name] || []),
        newMessage
      ]
    }));

    setNewChatMessage("");
  };

  /* DELETE CHAT MESSAGE */

  // const deleteChatMessage = (messageId) => {
  //   if (!chatStudent) return;

  //   setChatMessages((previous) => ({
  //     ...previous,
  //     [chatStudent.name]: (
  //       previous[chatStudent.name] || []
  //     ).filter((item) => item.id !== messageId)
  //   }));
  // };

  /* ASK BEFORE DELETING ONE MESSAGE */
const requestDeleteMessage = (messageId) => {
  setDeleteConfirm({
    type: "message",
    messageId: messageId
  });
};

/* ASK BEFORE CLEARING ALL MESSAGES */
const requestClearAll = () => {
  if (!chatStudent) return;

  if ((chatMessages[chatStudent.name] || []).length === 0) {
    return;
  }

  setDeleteConfirm({ type: "all" });
};

/* CONFIRM DELETE */
const confirmDelete = () => {
  if (!chatStudent || !deleteConfirm) return;

  const studentName = chatStudent.name;

  setChatMessages((previous) => {
    const updated = { ...previous };

    if (deleteConfirm.type === "all") {
      updated[studentName] = [];
    } else if (deleteConfirm.type === "message") {
      updated[studentName] = (
        previous[studentName] || []
      ).filter(
        (item) => item.id !== deleteConfirm.messageId
      );
    }

    return updated;
  });

  setDeleteConfirm(null);
};

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
    } catch (error) {
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

    addRequest(current);

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

    addRequest(displayedStudent);

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

      {/* ================= NAVBAR ================= */}

      <nav className="teammatch-navbar">

        <div className="teammatch-logo">
          <span>📚</span>
          StudyFlix
        </div>

        <div className="teammatch-nav-links">
          <span>Dashboard</span>
          <span>Learning</span>
          <span>Course</span>
          <span>Progress</span>

          <span className="teammatch-nav-active">
            TeamMatch
          </span>
        </div>

        <div className="teammatch-nav-icons">
          <span>⌕</span>
          <span>🔔</span>

          <span className="teammatch-profile-circle">
            D
          </span>
        </div>

      </nav>


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
                  onMessage={(student) => {
                    setChatStudent(student);
                    setNewChatMessage("");
                  }}
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
              {/* SENT REQUESTS */}

        <section className="teammatch-requests-section">
          <h2>Sent Requests ({sentRequests.length})</h2>

          {sentRequests.length === 0 ? (
            <p>You haven't sent any connection requests yet.</p>
          ) : (
            sentRequests.map((student) => (
              <div
                className="teammatch-request-item"
                key={student.name}
              >
                <div>
                  <strong>{student.name}</strong>
                  <p>{student.course} • {student.year}</p>
                </div>

                <button
                  onClick={() => deleteRequest(student.name)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </section>

        {/* CHAT POPUP */}

        {chatStudent && (
          <div className="teammatch-chat-popup">
            <div className="teammatch-chat-header">
              <h3>Chat with {chatStudent.name}</h3>

              <div className="teammatch-chat-header-actions">
                <button
                  type="button"
                  onClick={requestClearAll}
                  title="Clear all messages"
                >
                  Clear All
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setChatStudent(null);
                    setDeleteConfirm(null);
                  }}
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="teammatch-chat-messages">
              {(chatMessages[chatStudent.name] || []).length === 0 ? (
                <p>No messages yet. Say hello! 👋</p>
              ) : (
                (chatMessages[chatStudent.name] || []).map((item) => (
                  <div
                    className="teammatch-chat-message"
                    key={item.id}
                  >
                    <span>{item.text}</span>

                    <button
                      type="button"
                      onClick={() => requestDeleteMessage(item.id)}
                      title="Delete message"
                      aria-label={`Delete message: ${item.text}`}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            <form
              className="teammatch-chat-form"
              onSubmit={sendChatMessage}
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
              />

              <button type="submit">Send</button>
            </form>

            {/* DELETE CONFIRMATION */}
            {deleteConfirm && (
              <div className="teammatch-delete-confirm">
                <h4>
                  {deleteConfirm.type === "all"
                    ? "Clear all messages?"
                    : "Delete this message?"}
                </h4>

                <p>
                  {deleteConfirm.type === "all"
                    ? "All messages in this chat will be deleted."
                    : "Only this message will be deleted."}
                </p>

                <div className="teammatch-delete-actions">
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}

export default TeamMatch;