import { timeToSeconds } from "./javaTimestamps";

export const PYTHON_TOPIC_CATEGORIES = [
  { id: "all", label: "All Topics (33)", min: 1, max: 33 },
  { id: "basics", label: "Basics & Variables (#1 - #10)", min: 1, max: 10 },
  { id: "data_structures", label: "Collections & Lists (#11 - #19)", min: 11, max: 19 },
  { id: "control_flow", label: "Loops & Functions (#20 - #26)", min: 20, max: 26 },
  { id: "advanced", label: "Files & OOP (#27 - #33)", min: 27, max: 33 }
];

const RAW_PYTHON_TIMESTAMPS = [
  { id: 1, time: "00:00:00", title: "Introduction to Python & Setup" },
  { id: 2, time: "00:05:03", title: "Windows & Mac Installation" },
  { id: 3, time: "00:08:36", title: "Setup & Hello World Program" },
  { id: 4, time: "00:14:43", title: "Drawing a Shape & Program Flow" },
  { id: 5, time: "00:19:59", title: "Variables & Primitive Data Types" },
  { id: 6, time: "00:31:27", title: "Working with Strings & String Methods" },
  { id: 7, time: "00:40:32", title: "Working with Numbers & Math Functions" },
  { id: 8, time: "00:48:26", title: "Getting User Input with input()" },
  { id: 9, time: "00:53:42", title: "Building a Basic Calculator" },
  { id: 10, time: "00:58:27", title: "Mad Libs Game Project" },
  { id: 11, time: "01:03:10", title: "Lists Fundamentals" },
  { id: 12, time: "01:10:44", title: "List Functions & Mutability" },
  { id: 13, time: "01:18:57", title: "Tuples & Immutable Sequences" },
  { id: 14, time: "01:24:15", title: "Functions with def Syntax" },
  { id: 15, time: "01:34:11", title: "Return Statement & Output" },
  { id: 16, time: "01:40:06", title: "If Statements & Boolean Logic" },
  { id: 17, time: "01:54:07", title: "If Statements & Comparisons" },
  { id: 18, time: "02:00:37", title: "Building a Better Calculator" },
  { id: 19, time: "02:07:17", title: "Dictionaries & Key-Value Lookups" },
  { id: 20, time: "02:14:13", title: "While Loop Fundamentals" },
  { id: 21, time: "02:20:21", title: "Building a Guessing Game" },
  { id: 22, time: "02:32:44", title: "For Loops & Iteration" },
  { id: 23, time: "02:41:20", title: "Exponent Function with For Loops" },
  { id: 24, time: "02:47:13", title: "2D Lists & Nested Loops" },
  { id: 25, time: "02:52:41", title: "Build a Basic Translator" },
  { id: 26, time: "03:00:18", title: "Comments in Python" },
  { id: 27, time: "03:04:17", title: "Try / Except Exception Handling" },
  { id: 28, time: "03:12:41", title: "Reading Files from Disk" },
  { id: 29, time: "03:21:26", title: "Writing & Appending to Files" },
  { id: 30, time: "03:28:18", title: "Modules & Pip Package Manager" },
  { id: 31, time: "03:43:56", title: "Classes & Objects (OOP)" },
  { id: 32, time: "03:57:37", title: "Building a Multiple Choice Quiz Game" },
  { id: 33, time: "04:08:28", title: "Object Functions, Inheritance & Super" }
];

export const PYTHON_TIMESTAMPS = RAW_PYTHON_TIMESTAMPS.map((item) => {
  const sec = timeToSeconds(item.time);
  let categoryId = "basics";
  let categoryLabel = "Basics & Variables";

  if (item.id <= 10) {
    categoryId = "basics";
    categoryLabel = "Basics & Variables";
  } else if (item.id <= 19) {
    categoryId = "data_structures";
    categoryLabel = "Collections & Lists";
  } else if (item.id <= 26) {
    categoryId = "control_flow";
    categoryLabel = "Loops & Functions";
  } else {
    categoryId = "advanced";
    categoryLabel = "Files & OOP";
  }

  return {
    ...item,
    seconds: sec,
    categoryId,
    categoryLabel,
    youtubeUrl: `https://www.youtube.com/watch?v=_uQrJ0TkZlc&t=${sec}s`
  };
});
