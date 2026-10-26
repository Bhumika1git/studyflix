import { timeToSeconds } from "./javaTimestamps";

export const REACT_TOPIC_CATEGORIES = [
  { id: "all", label: "All Topics (36)", min: 1, max: 36 },
  { id: "basics", label: "React Basics & JSX (#1 - #10)", min: 1, max: 10 },
  { id: "forms", label: "Form Handling & Inputs (#11 - #18)", min: 11, max: 18 },
  { id: "async", label: "Effects & Async State (#19 - #25)", min: 19, max: 25 },
  { id: "context_redux", label: "Context API & State Architecture (#26 - #36)", min: 26, max: 36 }
];

const RAW_REACT_TIMESTAMPS = [
  { id: 1, time: "00:00:00", title: "Introduction to React & Mental Model" },
  { id: 2, time: "00:15:20", title: "Why React & Virtual DOM Architecture" },
  { id: 3, time: "00:32:45", title: "Setting up Vite & React Project" },
  { id: 4, time: "00:48:10", title: "JSX Syntax & Component Rules" },
  { id: 5, time: "01:05:30", title: "Functional Components & UI Tree" },
  { id: 6, time: "01:24:15", title: "Component Tree Architecture" },
  { id: 7, time: "01:42:00", title: "CSS Styling & Modular Design" },
  { id: 8, time: "02:01:20", title: "Props Fundamentals & Passing Data" },
  { id: 9, time: "02:22:45", title: "Destructuring Props & Default Values" },
  { id: 10, time: "02:40:10", title: "Passing Components as Children" },
  { id: 11, time: "03:00:30", title: "Handling User Events in React" },
  { id: 12, time: "03:22:15", title: "Introduction to useState Hook" },
  { id: 13, time: "03:45:00", title: "State vs Props: When to Use What" },
  { id: 14, time: "04:08:20", title: "State Immutability & Object Updates" },
  { id: 15, time: "04:31:40", title: "Working with Arrays in State" },
  { id: 16, time: "04:55:00", title: "Form Handling in React: Controlled Components" },
  { id: 17, time: "05:18:30", title: "Validation Strategies & Error Feedback" },
  { id: 18, time: "05:42:15", title: "Reusable Input Components Architecture" },
  { id: 19, time: "06:05:00", title: "Side Effects & Introduction to useEffect" },
  { id: 20, time: "06:28:40", title: "useEffect Dependency Array Rules" },
  { id: 21, time: "06:52:10", title: "Cleanup Functions & Memory Leak Prevention" },
  { id: 22, time: "07:15:30", title: "Async State and Loading/Error Handling" },
  { id: 23, time: "07:40:00", title: "Fetching API Data with Custom Async Hooks" },
  { id: 24, time: "08:04:20", title: "Error Boundaries & Fallback UI" },
  { id: 25, time: "08:28:45", title: "LocalStorage Sync with React State" },
  { id: 26, time: "08:52:10", title: "State Architecture in React Apps" },
  { id: 27, time: "09:15:30", title: "Global vs Local State: Architecture Decisions" },
  { id: 28, time: "09:38:00", title: "Context API: Provider Pattern & Setup" },
  { id: 29, time: "10:01:20", title: "Consuming Context with useContext Hook" },
  { id: 30, time: "10:24:45", title: "Intro to Redux Toolkit or Zustand" },
  { id: 31, time: "10:48:00", title: "Zustand & Redux Store Architecture" },
  { id: 32, time: "11:05:30", title: "Mini Project: Shopping Cart or Dashboard Setup" },
  { id: 33, time: "11:20:15", title: "Mini Project: Shopping Cart State & Calculations" },
  { id: 34, time: "11:34:40", title: "Routing Integration with React Router v7" },
  { id: 35, time: "11:46:10", title: "useParams & useNavigate for Dashboard Views" },
  { id: 36, time: "11:54:30", title: "Production Build, Testing & Deployment" }
];

export const REACT_TIMESTAMPS = RAW_REACT_TIMESTAMPS.map((item) => {
  const sec = timeToSeconds(item.time);
  let categoryId = "basics";
  let categoryLabel = "React Basics & JSX";

  if (item.id <= 10) {
    categoryId = "basics";
    categoryLabel = "React Basics & JSX";
  } else if (item.id <= 18) {
    categoryId = "forms";
    categoryLabel = "Form Handling & Inputs";
  } else if (item.id <= 25) {
    categoryId = "async";
    categoryLabel = "Effects & Async State";
  } else {
    categoryId = "context_redux";
    categoryLabel = "Context API & State Architecture";
  }

  return {
    ...item,
    seconds: sec,
    categoryId,
    categoryLabel,
    youtubeUrl: `https://www.youtube.com/watch?v=bMknfKXIFA8&t=${sec}s`
  };
});
