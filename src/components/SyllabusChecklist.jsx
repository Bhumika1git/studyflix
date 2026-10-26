import { useState, useEffect, useMemo } from "react";
import { getCourseById } from "../data/coursesData";

export default function SyllabusChecklist({ courseId }) {
  const course = getCourseById(courseId);
  const storageKey = `studyflix_syllabus_${courseId}`;

  // Load checked topics from localStorage
  const [checkedMap, setCheckedMap] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track collapsed state per module ID
  const [collapsedMap, setCollapsedMap] = useState({});

  // When courseId changes, re-read localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`studyflix_syllabus_${courseId}`);
      setCheckedMap(saved ? JSON.parse(saved) : {});
    } catch {
      setCheckedMap({});
    }
  }, [courseId]);

  // Persist checked state to localStorage
  const handleToggleTopic = (topicKey) => {
    setCheckedMap((prev) => {
      const updated = { ...prev, [topicKey]: !prev[topicKey] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to save syllabus checklist progress:", err);
      }
      return updated;
    });
  };

  const handleToggleModuleCollapse = (moduleId) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleMarkAll = () => {
    const updated = {};
    course.modules?.forEach((mod) => {
      mod.topics?.forEach((t) => {
        updated[`${mod.id}-${t}`] = true;
      });
    });
    setCheckedMap(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAll = () => {
    setCheckedMap({});
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error(e);
    }
  };

  // Compute overall syllabus topic counts
  const { totalTopics, completedCount, progressPercent } = useMemo(() => {
    if (!course?.modules) return { totalTopics: 0, completedCount: 0, progressPercent: 0 };
    let total = 0;
    let completed = 0;

    course.modules.forEach((mod) => {
      (mod.topics || []).forEach((topic) => {
        total += 1;
        if (checkedMap[`${mod.id}-${topic}`]) {
          completed += 1;
        }
      });
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalTopics: total, completedCount: completed, progressPercent: percent };
  }, [course, checkedMap]);

  return (
    <aside className="sf-syllabus-section" aria-label="Course Syllabus Checklist">
      {/* Syllabus Header with Live Counter and Progress Bar */}
      <div className="sf-syllabus-header-card">
        <div className="sf-syllabus-header-top">
          <div>
            <span className="sf-syllabus-pill-badge">Course Syllabus</span>
            <h3 className="sf-syllabus-main-title">Interactive Checklist</h3>
          </div>
          <div className="sf-syllabus-percentage-badge">
            {progressPercent}%
          </div>
        </div>

        <div className="sf-syllabus-count-row">
          <span>{completedCount} of {totalTopics} Topics Completed</span>
          {completedCount === totalTopics && totalTopics > 0 && (
            <span className="sf-syllabus-complete-tag">🎉 All Completed!</span>
          )}
        </div>

        <div className="sf-progress-track sf-syllabus-progress-track">
          <div
            className="sf-progress-fill"
            style={{
              width: `${progressPercent}%`,
              background: progressPercent === 100
                ? "linear-gradient(90deg, #10b981, #059669)"
                : "linear-gradient(90deg, #ea580c, #f97316)"
            }}
          ></div>
        </div>

        <div className="sf-syllabus-quick-actions">
          <button
            type="button"
            className="sf-syllabus-quick-btn"
            onClick={handleMarkAll}
            title="Mark all topics in this course as done"
          >
            Mark All Done
          </button>
          <span className="sf-dot-sep">•</span>
          <button
            type="button"
            className="sf-syllabus-quick-btn"
            onClick={handleClearAll}
            title="Reset syllabus checklist for this course"
          >
            Clear Checklist
          </button>
        </div>
      </div>

      {/* Modules List with Collapsible Sections */}
      <div className="sf-syllabus-modules-list">
        {course.modules?.map((mod) => {
          const isCollapsed = Boolean(collapsedMap[mod.id]);
          const modTotal = mod.topics?.length || 0;
          const modCompleted = (mod.topics || []).filter(
            (t) => checkedMap[`${mod.id}-${t}`]
          ).length;
          const isModuleDone = modTotal > 0 && modCompleted === modTotal;

          return (
            <div
              key={mod.id}
              className={`sf-syllabus-module-card ${isModuleDone ? "mod-done" : ""}`}
            >
              {/* Collapsible Header */}
              <button
                type="button"
                className="sf-syllabus-module-toggle"
                onClick={() => handleToggleModuleCollapse(mod.id)}
                aria-expanded={!isCollapsed}
              >
                <div className="sf-syllabus-mod-title-wrap">
                  <div className="sf-mod-number-badge">
                    {isModuleDone ? "✓" : `M${mod.number}`}
                  </div>
                  <div className="sf-mod-heading-group">
                    <span className="sf-mod-title">{mod.title}</span>
                    <span className="sf-mod-meta">
                      {mod.duration} • {modCompleted}/{modTotal} Topics
                    </span>
                  </div>
                </div>

                <div className="sf-mod-chevron">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              {/* Topics Checklist within Module */}
              {!isCollapsed && (
                <div className="sf-syllabus-topics-container">
                  {mod.topics?.map((topic, idx) => {
                    const topicKey = `${mod.id}-${topic}`;
                    const isChecked = Boolean(checkedMap[topicKey]);

                    return (
                      <label
                        key={idx}
                        className={`sf-syllabus-topic-item ${isChecked ? "topic-checked" : ""}`}
                      >
                        <input
                          type="checkbox"
                          className="sf-topic-native-checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTopic(topicKey)}
                        />
                        <span className="sf-topic-custom-checkbox">
                          {isChecked && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </span>
                        <span className="sf-topic-label-text">{topic}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
