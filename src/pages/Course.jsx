import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import EpisodeCard from "../components/EpisodeCard";
import { COURSES, getCourseById } from "../data/coursesData";
import {
  loadProgress,
  getCourseProgressPercentage,
  isEpisodeLocked,
  getCurrentEpisodeForCourse,
  toggleEpisodeCompletion,
  setActiveEpisode
} from "../utils/progressStorage";
import "../styles/learning.css";

export default function Course() {
  const { courseId: paramCourseId } = useParams();
  const navigate = useNavigate();

  // Progress state stored in localStorage
  const [progressState, setProgressState] = useState(loadProgress);

  // Track manually clicked episode ID (null defaults to course's current unlocked episode)
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);

  // Determine current active course
  const currentCourseId =
    paramCourseId || progressState.lastActiveCourseId || "java-programming";
  const course = getCourseById(currentCourseId);

  // Get current course progress
  const courseProgress = progressState.courses?.[course.id] || {
    completedEpisodes: [],
    lastEpisodeId: null
  };
  const completedEpisodes = courseProgress.completedEpisodes || [];
  const progressPercent = getCourseProgressPercentage(course, completedEpisodes);

  // Derive active episode cleanly without cascading render effects
  const defaultEpisode = getCurrentEpisodeForCourse(course, courseProgress) || course.episodes[0];
  const activeEpisode =
    (selectedEpisodeId && course.episodes.find((e) => e.id === selectedEpisodeId)) ||
    defaultEpisode;

  // Handle switching courses via selector
  const handleCourseSwitch = (newId) => {
    setSelectedEpisodeId(null);
    navigate(`/course/${newId}`);
  };

  // Handle episode selection from the syllabus
  const handleSelectEpisode = (ep) => {
    const epIndex = course.episodes.findIndex((e) => e.id === ep.id);
    if (isEpisodeLocked(course, epIndex, completedEpisodes)) {
      alert("Please complete the preceding episodes to unlock this episode!");
      return;
    }
    setSelectedEpisodeId(ep.id);
    const updated = setActiveEpisode(course.id, ep.id);
    setProgressState(updated);
  };

  // FEATURE 5: MARK COMPLETE
  const handleToggleComplete = (episodeIdToToggle) => {
    const targetId = episodeIdToToggle || activeEpisode.id;
    const updated = toggleEpisodeCompletion(course.id, targetId);
    setProgressState(updated);

    // If we marked the active episode as complete, auto-advance to next episode if available
    const isNowCompleted = updated.courses[course.id]?.completedEpisodes.includes(targetId);
    if (isNowCompleted && targetId === activeEpisode.id) {
      const currentIndex = course.episodes.findIndex((e) => e.id === targetId);
      if (currentIndex + 1 < course.episodes.length) {
        const nextEp = course.episodes[currentIndex + 1];
        setSelectedEpisodeId(nextEp.id);
      }
    }
  };

  // Check state of active episode
  const isActiveCompleted = completedEpisodes.includes(activeEpisode?.id);
  const activeEpisodeIndex = course.episodes.findIndex((e) => e.id === activeEpisode?.id);
  const hasPrevious = activeEpisodeIndex > 0;
  const hasNext = activeEpisodeIndex < course.episodes.length - 1;

  const handlePreviousEpisode = () => {
    if (hasPrevious) {
      handleSelectEpisode(course.episodes[activeEpisodeIndex - 1]);
    }
  };

  const handleNextEpisode = () => {
    if (hasNext) {
      handleSelectEpisode(course.episodes[activeEpisodeIndex + 1]);
    }
  };

  return (
    <div className="studyflix-page">
      <Navbar />

      {/* Course Banner / Summary Header */}
      <header className="sf-course-banner">
        <div className="sf-course-banner-top">
          <Link to="/learning" className="sf-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Back to All Courses</span>
          </Link>

          {/* Quick Course Switcher Dropdown */}
          <div className="sf-course-switcher">
            <label htmlFor="course-select">Select Course:</label>
            <select
              id="course-select"
              className="sf-course-select"
              value={course.id}
              onChange={(e) => handleCourseSwitch(e.target.value)}
            >
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sf-course-banner-main">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="sf-category-chip">{course.category}</span>
              <span style={{ fontSize: "13px", color: "var(--sf-muted)" }}>• {course.level}</span>
            </div>
            <h1 className="sf-course-banner-title">{course.title}</h1>
            <p className="sf-course-banner-desc">{course.tagline}</p>
          </div>

          <div className="sf-course-banner-stats">
            <div className="sf-progress-header">
              <span>Overall Progress</span>
              <span className="sf-progress-percent">{progressPercent}%</span>
            </div>
            <div className="sf-progress-track">
              <div
                className="sf-progress-fill"
                style={{
                  width: `${progressPercent}%`,
                  background: progressPercent === 100 ? "linear-gradient(90deg, #10b981, #059669)" : undefined
                }}
              ></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px", color: "var(--sf-muted)" }}>
              <span>{completedEpisodes.length} of {course.episodes.length} Episodes Completed</span>
              <span>{course.totalDuration} Total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Course Layout: Player (Left) & Episode Syllabus (Right) */}
      <div className="sf-course-layout">
        {/* Left Column: Interactive Video Player & Episode Detail */}
        <section className="sf-player-container" aria-label="Interactive Player">
          <div className="sf-video-viewport">
            <div className="sf-video-overlay-grid"></div>

            <div className="sf-video-screen-content">
              <button
                className="sf-play-circle-btn"
                onClick={() => handleToggleComplete(activeEpisode.id)}
                title={isActiveCompleted ? "Replay Episode" : "Play & Complete"}
              >
                {isActiveCompleted ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>

              <div className="sf-video-ep-label">
                Episode {String(activeEpisode.number).padStart(2, "0")} • {activeEpisode.duration}
              </div>
              <h2 className="sf-video-ep-title">{activeEpisode.title}</h2>

              <div className="sf-video-status-indicator">
                {isActiveCompleted ? (
                  <span style={{ color: "var(--sf-success)" }}>✓ Episode Completed</span>
                ) : (
                  <span>▶ Ready to Stream</span>
                )}
              </div>
            </div>

            {/* Video Controls Bar Mockup */}
            <div className="sf-video-controls-bar">
              <div className="sf-video-time-track">
                <div
                  className="sf-video-time-progress"
                  style={{ width: isActiveCompleted ? "100%" : "42%" }}
                ></div>
              </div>
              <span className="sf-video-control-text">
                {isActiveCompleted ? activeEpisode.duration : "04:12"} / {activeEpisode.duration}
              </span>
              <span className="sf-video-control-text">1080p HD • 1.0x</span>
            </div>
          </div>

          {/* Episode Details & Feature 5: Mark Complete Action */}
          <div className="sf-episode-details-card">
            <div className="sf-episode-actions-row">
              <div className="sf-ep-header-left">
                <span className="sf-ep-num-pill">
                  Episode {String(activeEpisode.number).padStart(2, "0")} of {course.episodes.length}
                </span>
                <h3 className="sf-ep-active-title">{activeEpisode.title}</h3>
              </div>

              {/* Step Navigation and Mark Complete */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <div className="sf-ep-navigation-row">
                  <button
                    className="sf-btn-nav-ep"
                    onClick={handlePreviousEpisode}
                    disabled={!hasPrevious}
                    title="Previous Episode"
                  >
                    ← Prev
                  </button>
                  <button
                    className="sf-btn-nav-ep"
                    onClick={handleNextEpisode}
                    disabled={!hasNext}
                    title="Next Episode"
                  >
                    Next →
                  </button>
                </div>

                {/* FEATURE 5 — MARK AS COMPLETE BUTTON */}
                <button
                  id="mark-complete-btn"
                  className={`sf-btn-mark-complete ${
                    isActiveCompleted ? "action-completed" : "action-mark"
                  }`}
                  onClick={() => handleToggleComplete(activeEpisode.id)}
                >
                  {isActiveCompleted ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Completed ✓</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Mark as Complete</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="sf-ep-desc">{activeEpisode.description}</p>

            {/* Key Topics List */}
            {activeEpisode.topics && activeEpisode.topics.length > 0 && (
              <div>
                <div className="sf-topics-heading">Key Syllabus Topics</div>
                <ul className="sf-topics-list">
                  {activeEpisode.topics.map((topic, idx) => (
                    <li key={idx} className="sf-topic-pill">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Episode Syllabus Cards List */}
        <aside className="sf-syllabus-section" aria-label="Course Syllabus">
          <div className="sf-syllabus-header">
            <h3 className="sf-syllabus-title">Course Syllabus</h3>
            <span className="sf-syllabus-count">
              {completedEpisodes.length}/{course.episodes.length} Completed
            </span>
          </div>

          <div className="sf-episodes-list">
            {course.episodes.map((ep, index) => {
              const isCompleted = completedEpisodes.includes(ep.id);
              const isActive = activeEpisode.id === ep.id;
              const isLocked = isEpisodeLocked(course, index, completedEpisodes);

              return (
                <EpisodeCard
                  key={ep.id}
                  episode={ep}
                  isCompleted={isCompleted}
                  isActive={isActive}
                  isLocked={isLocked}
                  onSelect={handleSelectEpisode}
                  onToggleComplete={handleToggleComplete}
                />
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}