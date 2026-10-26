import { getCourseById, COURSES } from "../data/coursesData";

const STORAGE_KEY = "studyflix_learning_progress_v1";

// Initial demo state matching the project requirements
const DEFAULT_INITIAL_STATE = {
  lastActiveCourseId: "java-programming",
  lastActiveOptionId: "java-best-overall",
  courses: {
    "java-programming": {
      completedEpisodes: ["java-mod-1", "java-mod-2"],
      progressPercent: 35
    },
    "react-development": {
      completedEpisodes: ["react-mod-1"],
      progressPercent: 20
    },
    "python-essentials": {
      completedEpisodes: [],
      progressPercent: 0
    },
    "dsa": {
      completedEpisodes: [],
      progressPercent: 0
    },
    "dbms": {
      completedEpisodes: [],
      progressPercent: 0
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
  if (!course) return 0;
  const mods = course.modules || course.episodes || [];
  if (!mods.length) return 0;
  const validCompleted = completedIds.filter((id) =>
    mods.some((ep) => ep.id === id)
  );
  return Math.round((validCompleted.length / mods.length) * 100);
}

/**
 * Checks if an episode/module at index `index` is locked.
 */
export function isEpisodeLocked(course, episodeIndex, completedIds = []) {
  if (episodeIndex === 0) return false;
  const mods = course.modules || course.episodes || [];
  const previousEpisode = mods[episodeIndex - 1];
  if (!previousEpisode) return false;
  return !completedIds.includes(previousEpisode.id);
}

/**
 * Finds the currently active episode for a course.
 */
export function getCurrentEpisodeForCourse(course, courseProgress) {
  if (!course) return null;
  const mods = course.modules || course.episodes || [];
  if (!mods.length) return null;
  const completed = courseProgress?.completedEpisodes || [];

  if (courseProgress?.lastEpisodeId) {
    const epIndex = mods.findIndex((e) => e.id === courseProgress.lastEpisodeId);
    if (epIndex !== -1 && !isEpisodeLocked(course, epIndex, completed)) {
      return mods[epIndex];
    }
  }

  for (let i = 0; i < mods.length; i++) {
    if (!completed.includes(mods[i].id)) {
      return mods[i];
    }
  }

  return mods[mods.length - 1];
}

/**
 * Toggles completion of an episode / module.
 */
export function toggleEpisodeCompletion(courseId, episodeId) {
  const current = loadProgress();
  const course = getCourseById(courseId);
  if (!course) return current;

  const courseData = current.courses[courseId] || { completedEpisodes: [], lastEpisodeId: episodeId };
  const alreadyCompleted = courseData.completedEpisodes.includes(episodeId);

  let updatedCompleted;
  if (alreadyCompleted) {
    updatedCompleted = courseData.completedEpisodes.filter((id) => id !== episodeId);
  } else {
    updatedCompleted = [...courseData.completedEpisodes, episodeId];
  }

  const mods = course.modules || course.episodes || [];
  let nextActiveEpisodeId = episodeId;
  if (!alreadyCompleted) {
    const currentIndex = mods.findIndex((e) => e.id === episodeId);
    if (currentIndex !== -1 && currentIndex + 1 < mods.length) {
      nextActiveEpisodeId = mods[currentIndex + 1].id;
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
 * Updates the user's active course.
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
 * Reads syllabus checklist progress for a course from localStorage.
 */
export function getCourseSyllabusProgress(courseId) {
  try {
    const raw = localStorage.getItem(`studyflix_syllabus_${courseId}`);
    const checkedMap = raw ? JSON.parse(raw) : {};
    const course = getCourseById(courseId);
    if (!course || !course.modules) return { completed: 0, total: 0, percent: 0 };
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
    return { completed, total, percent };
  } catch {
    return { completed: 0, total: 0, percent: 0 };
  }
}

/**
 * Retrieves data for the "Continue Learning" banner on the Learning dashboard.
 */
export function getContinueLearningData(progressState) {
  const state = progressState || loadProgress();
  const activeCourseId = state.lastActiveCourseId || "java-programming";
  const course = getCourseById(activeCourseId);
  const syllabusProgress = getCourseSyllabusProgress(activeCourseId);

  const courseData = state.courses[activeCourseId] || { completedEpisodes: [] };
  const fallbackPercent = getCourseProgressPercentage(course, courseData.completedEpisodes);
  const progressPercent =
    syllabusProgress.total > 0 && syllabusProgress.completed > 0
      ? syllabusProgress.percent
      : fallbackPercent;

  return {
    course,
    progressPercent,
    completedTopics: syllabusProgress.completed,
    totalTopics: syllabusProgress.total || 24,
    activeTrack: course.videoOptions?.[0]?.badge || "🎯 Best Overall Track"
  };
}

/**
 * Resets progress back to default initial state for college evaluation/demo.
 */
export function resetAllProgress() {
  saveProgress(DEFAULT_INITIAL_STATE);
  COURSES.forEach((c) => {
    try {
      localStorage.removeItem(`studyflix_syllabus_${c.id}`);
    } catch (e) {
      console.error(e);
    }
  });
  return DEFAULT_INITIAL_STATE;
}
