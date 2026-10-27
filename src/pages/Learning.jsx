import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ContinueLearningCard from "../components/ContinueLearningCard";
import CourseCard from "../components/CourseCard";
import { COURSES, ALL_CATEGORIES } from "../data/coursesData";
import {
  loadProgress,
  getContinueLearningData,
  getCourseSyllabusProgress,
  resetAllProgress
} from "../utils/progressStorage";
import "../styles/learning.css";

export default function Learning() {
  const [progressState, setProgressState] = useState(loadProgress());
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Reload progress on mount or whenever the window gains focus (e.g. returning from Course page)
  useEffect(() => {
    const handleFocus = () => {
      setProgressState(loadProgress());
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const continueData = getContinueLearningData(progressState);

  // Filter courses by category
  const filteredCourses =
    selectedCategory === "All"
      ? COURSES
      : COURSES.filter((course) => course.category === selectedCategory);

  // Calculate total topics completed across all courses from syllabus progress
  const totalMasteredTopics = COURSES.reduce((acc, course) => {
    const sp = getCourseSyllabusProgress(course.id);
    return acc + sp.completed;
  }, 0);

  const handleResetDemo = () => {
    if (window.confirm("Reset all progress back to demo starting state?")) {
      const reset = resetAllProgress();
      setProgressState(reset);
    }
  };

  return (
    <div className="studyflix-page">
      <Navbar />

      <main className="sf-content">
        {/* Page Header */}
        <header className="sf-page-header">
          <div className="sf-page-badge">
            <span className="sf-pulse-dot"></span>
            StudyFlix Learning Hub
          </div>
          <h1 className="sf-page-title">Continue your learning</h1>
          <p className="sf-page-subtitle">
            Pick up right where you left off. Choose your preferred learning style from 3 curated video tracks,
            jump through interactive timestamps, and track topic completion with your syllabus checklist.
          </p>

          {/* Quick Stats Bar (Total Curriculum Hours REMOVED as specified) */}
          <div className="sf-stats-bar">
            <div className="sf-stat-item">
              <span>📚 Active Courses:</span>
              <span className="sf-stat-number">{COURSES.length}</span>
            </div>
            <div className="sf-stat-item">
              <span>✅ Topics Completed:</span>
              <span className="sf-stat-number">{totalMasteredTopics}</span>
            </div>
          </div>
        </header>

        {/* Continue Learning Hero Section */}
        <ContinueLearningCard continueData={continueData} />

        {/* Available Courses Section with Filter Pills */}
        <section aria-label="Available Courses">
          <div className="sf-section-header-wrap">
            <h2 className="sf-section-title">My Courses</h2>

            {/* Category Filter Pills */}
            <div className="sf-filter-pills" role="tablist">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`sf-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Course Grid */}
          <div className="sf-courses-grid">
            {filteredCourses.map((course) => {
              const syllabusProg = getCourseSyllabusProgress(course.id);
              const fallbackProg =
                progressState.courses?.[course.id]?.progressPercent || 0;
              const progressPercent =
                syllabusProg.completed > 0 ? syllabusProg.percent : fallbackProg;

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  progressPercent={progressPercent}
                />
              );
            })}
          </div>
        </section>

        {/* Demo Helper Footer */}
        <footer className="sf-demo-footer">
          <div>
            <strong>Evaluation Tip:</strong> Progress and syllabus checklists are synchronized in <code>localStorage</code>.
          </div>
          <button
            className="sf-btn-reset-demo"
            onClick={handleResetDemo}
            title="Reset progress for live presentation"
          >
            Reset Demo Progress ↺
          </button>
        </footer>
      </main>
    </div>
  );
}