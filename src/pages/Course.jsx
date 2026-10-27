import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SyllabusChecklist from "../components/SyllabusChecklist";
import {
  COURSES,
  getCourseById,
  getCourseVideoOptions,
  getCourseVideo,
  getCourseTimestamps,
  getCourseTimestampCategories
} from "../data/coursesData";
import "../styles/learning.css";

export default function Course() {
  const { courseId: paramCourseId } = useParams();
  const navigate = useNavigate();

  // Active course
  const currentCourseId = paramCourseId || "java-programming";
  const course = getCourseById(currentCourseId);

  // Available 3 video options for this course
  const videoOptions = useMemo(() => getCourseVideoOptions(course.id), [course.id]);

  // Selected video option (defaults to first option: Best Overall)
  const [selectedOptionId, setSelectedOptionId] = useState(videoOptions[0]?.id || null);

  // Derive active video object
  const activeVideo = useMemo(
    () => getCourseVideo(course, selectedOptionId) || videoOptions[0],
    [course, selectedOptionId, videoOptions]
  );

  // Cued start time for the YouTube player
  const [activeStartSecond, setActiveStartSecond] = useState(0);

  // Interactive Timestamps & Categories for active course
  const timestamps = useMemo(() => getCourseTimestamps(course.id), [course.id]);
  const topicCategories = useMemo(() => getCourseTimestampCategories(course.id), [course.id]);

  // Search & category filters for timestamps
  const [timestampSearch, setTimestampSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Reset local state whenever course changes
  useEffect(() => {
    setSelectedOptionId(videoOptions[0]?.id || null);
    setActiveStartSecond(0);
    setTimestampSearch("");
    setSelectedCategory("all");
  }, [course.id, videoOptions]);

  // Handle switching courses via selector
  const handleCourseSwitch = (newId) => {
    navigate(`/course/${newId}`);
    setSelectedOptionId(null);
    setActiveStartSecond(0);
    setTimestampSearch("");
    setSelectedCategory("all");
  };

  // Switch curated video option
  const handleSelectVideoOption = (optionId) => {
    setSelectedOptionId(optionId);
    setActiveStartSecond(0);
  };

  // Jump YouTube player to specific timestamp second
  const handleJumpToTimestamp = (sec) => {
    setActiveStartSecond(sec);
  };

  // Reset to beginning (00:00:00)
  const handleResetToBeginning = () => {
    setActiveStartSecond(0);
  };

  // Filter timestamps based on search query and category pill
  const filteredTimestamps = useMemo(() => {
    if (!timestamps || !timestamps.length) return [];
    return timestamps.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categoryId === selectedCategory;
      const matchesSearch =
        !timestampSearch ||
        item.title.toLowerCase().includes(timestampSearch.toLowerCase()) ||
        item.time.includes(timestampSearch);
      return matchesCategory && matchesSearch;
    });
  }, [timestamps, selectedCategory, timestampSearch]);

  return (
    <div className="studyflix-page">
      <Navbar />

      {/* Course Banner / Summary Header */}
      <header className="sf-course-banner">
        <div className="sf-course-banner-top">
          <Link to="/learning" className="sf-back-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Back to All Courses</span>
          </Link>

          {/* Quick Course Switcher Dropdown */}
          <div className="sf-course-switcher">
            <label htmlFor="course-select">Select Subject:</label>
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
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>• {course.level}</span>
            </div>
            <h1 className="sf-course-banner-title">{course.title}</h1>
            <p className="sf-course-banner-desc">{course.tagline}</p>
          </div>

          <div className="sf-course-banner-stats">
            <div className="sf-banner-feature-badge">
              <span className="sf-pulse-dot"></span>
              <span>Single Video Course • 3 Curated Tracks</span>
            </div>
            <div style={{ marginTop: "10px", fontSize: "13px", color: "var(--muted)" }}>
              <span>Total Duration: <strong>{course.totalDuration}</strong></span>
              <span style={{ margin: "0 8px" }}>•</span>
              <span>{course.modules?.length || 6} Syllabus Modules</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Course Layout: Player & Options (Left) & Syllabus Checklist (Right) */}
      <div className="sf-course-layout">
        {/* Left Column: Interactive Video Player, Chapters, and 3 Curated Option Cards */}
        <section className="sf-player-container" aria-label="Interactive Video Learning Experience">
          {/* Quick 1-Click Track Preference Pills Above Video */}
          <div className="sf-track-pills-bar">
            <span className="sf-track-pills-label">Learning Track:</span>
            <div className="sf-track-pills-group">
              {videoOptions.map((opt) => {
                const isActive = activeVideo?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`sf-track-pill-btn ${isActive ? "active" : ""}`}
                    onClick={() => handleSelectVideoOption(opt.id)}
                    title={`Switch to ${opt.label}`}
                  >
                    <span>{opt.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive YouTube Embed Viewport */}
          <div className="sf-video-viewport sf-youtube-viewport">
            {activeVideo?.youtubeId ? (
              <iframe
                key={`${activeVideo.youtubeId}-${activeStartSecond}`}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?si=B8Rd4_2RjFQLZehI&start=${activeStartSecond}&autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="sf-youtube-iframe"
              ></iframe>
            ) : (
              <div className="sf-video-screen-content">
                <div className="sf-video-ep-label">Video Not Available</div>
                <h2 className="sf-video-ep-title">{activeVideo?.title}</h2>
              </div>
            )}
          </div>

          {/* Video Info under the Player */}
          <div className="sf-video-info-card">
            <div className="sf-video-info-header">
              <div className="sf-video-creator-group">
                <div className="sf-creator-avatar">{course.icon || "☕"}</div>
                <div>
                  <h2 className="sf-video-title">{activeVideo?.title}</h2>
                  <div className="sf-creator-subtext">
                    Creator: <strong>{activeVideo?.instructor || activeVideo?.channel}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Reset to Beginning & Open in YouTube */}
              <div className="sf-video-actions-group">
                <button
                  type="button"
                  className="sf-btn-video-action sf-btn-reset-video"
                  onClick={handleResetToBeginning}
                  title="Reset video playback to start"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5"></line>
                  </svg>
                  <span>Start (00:00:00)</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo?.youtubeId}&t=${activeStartSecond}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-btn-video-action sf-btn-youtube-external"
                  title="Watch directly on YouTube in new tab"
                >
                  <span>Watch on YouTube</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>

            {/* Badges Bar */}
            <div className="sf-video-badges-row">
              <span className="sf-badge-pill sf-badge-track">{activeVideo?.badge}</span>
              <span className="sf-badge-pill">⏱ {activeVideo?.duration}</span>
              {activeVideo?.chaptersCount && (
                <span className="sf-badge-pill">📑 {activeVideo.chaptersCount} Chapters</span>
              )}
              <span className="sf-badge-pill">★ {activeVideo?.rating} Rating</span>
              <span className="sf-badge-pill">👁 {activeVideo?.views || "15M+ Views"}</span>
            </div>

            {/* Comprehensive Course Description */}
            <p className="sf-video-description-text">
              {course.id === "java-programming"
                ? "Master Java from zero to advanced engineering with this comprehensive deep-dive. Covers core fundamentals (syntax, variables, data types, logic operators), Object-Oriented Programming (classes, inheritance, polymorphism, encapsulation, abstraction), graphical interfaces & games, file I/O, Generics, and modern multithreading with 71 structured code chapters."
                : activeVideo?.description}
            </p>
          </div>

          {/* Interactive Video Chapters & Timestamps Explorer */}
          {timestamps.length > 0 && (
            <div className="sf-timestamps-section">
              <div className="sf-timestamps-header">
                <div>
                  <h3 className="sf-timestamps-heading">
                    📑 Interactive Video Chapters ({timestamps.length} Topics)
                  </h3>
                  <p className="sf-timestamps-subheading">
                    Click any topic to immediately jump the video player to that chapter.
                  </p>
                </div>

                {/* Real-time Search Box */}
                <div className="sf-timestamps-search-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder={`Search ${timestamps.length} topics or times...`}
                    value={timestampSearch}
                    onChange={(e) => setTimestampSearch(e.target.value)}
                    className="sf-timestamps-search-input"
                  />
                  {timestampSearch && (
                    <button
                      type="button"
                      className="sf-search-clear-btn"
                      onClick={() => setTimestampSearch("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Topic Range Filter Chips */}
              <div className="sf-topic-filter-chips" role="tablist">
                {topicCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                    className={`sf-category-chip-btn ${
                      selectedCategory === cat.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Timestamps Scrollable List */}
              <div className="sf-timestamps-list-container">
                {filteredTimestamps.length > 0 ? (
                  filteredTimestamps.map((item) => {
                    const isNowPlaying = activeStartSecond === item.seconds;

                    return (
                      <div
                        key={item.id}
                        className={`sf-timestamp-row ${isNowPlaying ? "now-playing" : ""}`}
                        onClick={() => handleJumpToTimestamp(item.seconds)}
                        title={`Jump to ${item.title} at ${item.time}`}
                      >
                        <div className="sf-timestamp-row-left">
                          <span className="sf-timestamp-id">#{item.id}</span>
                          <span className="sf-timestamp-time-badge">[{item.time}]</span>
                          <span className="sf-timestamp-title">{item.title}</span>
                        </div>

                        <div className="sf-timestamp-row-right">
                          {isNowPlaying ? (
                            <span className="sf-now-playing-badge">
                              <span className="sf-pulse-dot"></span>
                              ▶ Now Playing
                            </span>
                          ) : (
                            <span className="sf-play-hint">Play Chapter</span>
                          )}

                          <a
                            href={item.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sf-timestamp-ext-link"
                            onClick={(e) => e.stopPropagation()}
                            title="Open this chapter directly on YouTube"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="sf-no-timestamps-found">
                    No chapters match your search <strong>"{timestampSearch}"</strong>.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3 Personalized Video Option Cards */}
          <div className="sf-video-options-section">
            <div className="sf-video-options-header">
              <h3 className="sf-video-options-title">
                Curated Video Options (3 Tracks)
              </h3>
              <p className="sf-video-options-subtitle">
                Choose the learning style that fits your goals. Switch videos at any time without losing syllabus checklist progress.
              </p>
            </div>

            <div className="sf-video-options-grid">
              {videoOptions.map((opt) => {
                const isSelected = activeVideo?.id === opt.id;

                return (
                  <div
                    key={opt.id}
                    className={`sf-video-option-card ${isSelected ? "selected" : ""}`}
                  >
                    <div className="sf-option-card-top">
                      <span className="sf-option-badge">{opt.badge}</span>
                      <span className="sf-option-difficulty">{opt.difficulty}</span>
                    </div>

                    <h4 className="sf-option-title">{opt.title}</h4>
                    <p className="sf-option-desc">{opt.description}</p>

                    <div className="sf-option-details-list">
                      <div className="sf-option-detail-row">
                        <span>Instructor:</span>
                        <strong>{opt.instructor}</strong>
                      </div>
                      <div className="sf-option-detail-row">
                        <span>Channel:</span>
                        <strong>{opt.channel}</strong>
                      </div>
                      <div className="sf-option-detail-row">
                        <span>Duration:</span>
                        <strong>{opt.duration}</strong>
                      </div>
                      <div className="sf-option-detail-row">
                        <span>Rating:</span>
                        <strong>★ {opt.rating} ({opt.views})</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`sf-btn-select-option ${isSelected ? "btn-watching" : ""}`}
                      onClick={() => handleSelectVideoOption(opt.id)}
                    >
                      {isSelected ? (
                        <>
                          <span className="sf-pulse-dot"></span>
                          <span>▶ Watching Now</span>
                        </>
                      ) : (
                        <span>Switch to this Video →</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Column: Full Course Syllabus Checklist */}
        <SyllabusChecklist courseId={course.id} />
      </div>
    </div>
  );
}