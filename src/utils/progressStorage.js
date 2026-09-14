import { getCourseById } from "../data/coursesData";

const STORAGE_KEY = "studyflix_learning_progress_v1";

// Initial demo state matching the project requirements
const DEFAULT_INITIAL_STATE = {
  lastActiveCourseId: "java-programming",
  lastActiveEpisodeId: "java-ep-3",
  courses: {
    "java-programming": {
      completedEpisodes: ["java-ep-1", "java-ep-2"],
      lastEpisodeId: "java-ep-3"
    },
    "react-development": {
      completedEpisodes: ["react-ep-1"],
      lastEpisodeId: "react-ep-2"
    },
    "python-essentials": {
      completedEpisodes: [],
      lastEpisodeId: "py-ep-1"
    },
    "dsa": {
      completedEpisodes: [],
      lastEpisodeId: "dsa-ep-1"
    },
    "dbms": {
      completedEpisodes: [],
      lastEpisodeId: "db-ep-1"
    }
  }
};

/**
 * Loads learning progress from localStorage, or sets defaults.
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(DEFAULT_INITIAL_STATE);
      return DEFAULT_INITIAL_STATE;
    }
    const parsed = JSON.parse(raw);
    // Ensure all known courses exist in parsed state
    const merged = { ...DEFAULT_INITIAL_STATE, ...parsed };
    merged.courses = { ...DEFAULT_INITIAL_STATE.courses, ...(parsed.courses || {}) };
    return merged;
  } catch (err) {
    console.error("Error reading StudyFlix progress from localStorage:", err);
    return DEFAULT_INITIAL_STATE;
  }
}

/**
 * Saves current progress to localStorage.
 */
export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error writing StudyFlix progress to localStorage:", err);
  }
}

/**
 * Calculates percentage completion for a given course.
 */
export function getCourseProgressPercentage(course, completedIds = []) {
  if (!course || !course.episodes || course.episodes.length === 0) return 0;
  const validCompleted = completedIds.filter((id) =>
    course.episodes.some((ep) => ep.id === id)
  );
  return Math.round((validCompleted.length / course.episodes.length) * 100);
}

/**
 * Checks if an episode at index `index` is locked.
 * Sequential logic:
 * - Episode 0 (Episode 1) is always unlocked.
 * - Episode `i` is unlocked if Episode `i - 1` is completed.
 */
export function isEpisodeLocked(course, episodeIndex, completedIds = []) {
  if (episodeIndex === 0) return false;
  const previousEpisode = course.episodes[episodeIndex - 1];
  if (!previousEpisode) return false;
  return !completedIds.includes(previousEpisode.id);
}

/**
 * Finds the currently active episode for a course.
 * Defaults to the first incomplete and unlocked episode.
 */
export function getCurrentEpisodeForCourse(course, courseProgress) {
  if (!course || !course.episodes.length) return null;
  const completed = courseProgress?.completedEpisodes || [];
  
  // If user previously viewed a specific episode and it's unlocked, use it
  if (courseProgress?.lastEpisodeId) {
    const epIndex = course.episodes.findIndex((e) => e.id === courseProgress.lastEpisodeId);
    if (epIndex !== -1 && !isEpisodeLocked(course, epIndex, completed)) {
      return course.episodes[epIndex];
    }
  }

  // Otherwise, find the first incomplete unlocked episode
  for (let i = 0; i < course.episodes.length; i++) {
    if (!completed.includes(course.episodes[i].id)) {
      return course.episodes[i];
    }
  }

  // If all completed, return the last episode
  return course.episodes[course.episodes.length - 1];
}

/**
 * Marks an episode as completed or toggles its state.
 * Returns the fresh updated progress state.
 */
export function toggleEpisodeCompletion(courseId, episodeId) {
  const current = loadProgress();
  const course = getCourseById(courseId);
  if (!course) return current;

  const courseData = current.courses[courseId] || { completedEpisodes: [], lastEpisodeId: episodeId };
  const alreadyCompleted = courseData.completedEpisodes.includes(episodeId);

  let updatedCompleted;
  if (alreadyCompleted) {
    // Unmark complete
    updatedCompleted = courseData.completedEpisodes.filter((id) => id !== episodeId);
  } else {
    // Mark complete
    updatedCompleted = [...courseData.completedEpisodes, episodeId];
  }

  // Find next episode to advance to if we just completed
  let nextActiveEpisodeId = episodeId;
  if (!alreadyCompleted) {
    const currentIndex = course.episodes.findIndex((e) => e.id === episodeId);
    if (currentIndex !== -1 && currentIndex + 1 < course.episodes.length) {
      nextActiveEpisodeId = course.episodes[currentIndex + 1].id;
    }
  }

  const updatedState = {
    ...current,
    lastActiveCourseId: courseId,
    lastActiveEpisodeId: nextActiveEpisodeId,
    courses: {
      ...current.courses,
      [courseId]: {
        completedEpisodes: updatedCompleted,
        lastEpisodeId: nextActiveEpisodeId
      }
    }
  };

  saveProgress(updatedState);
  return updatedState;
}

/**
 * Updates the user's active course and active episode when navigating or playing.
 */
export function setActiveEpisode(courseId, episodeId) {
  const current = loadProgress();
  const courseData = current.courses[courseId] || { completedEpisodes: [], lastEpisodeId: episodeId };

  const updatedState = {
    ...current,
    lastActiveCourseId: courseId,
    lastActiveEpisodeId: episodeId,
    courses: {
      ...current.courses,
      [courseId]: {
        ...courseData,
        lastEpisodeId: episodeId
      }
    }
  };

  saveProgress(updatedState);
  return updatedState;
}

/**
 * Retrieves data for the "Continue Learning" banner on the Learning dashboard.
 */
export function getContinueLearningData(progressState) {
  const state = progressState || loadProgress();
  const activeCourseId = state.lastActiveCourseId || "java-programming";
  const course = getCourseById(activeCourseId);
  const courseData = state.courses[activeCourseId] || { completedEpisodes: [], lastEpisodeId: null };

  const currentEpisode = getCurrentEpisodeForCourse(course, courseData);
  const progressPercent = getCourseProgressPercentage(course, courseData.completedEpisodes);

  return {
    course,
    episode: currentEpisode || course.episodes[0],
    progressPercent,
    completedCount: courseData.completedEpisodes.length,
    totalEpisodes: course.episodes.length
  };
}

/**
 * Resets progress back to default initial state for college evaluation/demo.
 */
export function resetAllProgress() {
  saveProgress(DEFAULT_INITIAL_STATE);
  return DEFAULT_INITIAL_STATE;
}
