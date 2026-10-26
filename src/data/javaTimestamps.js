/**
 * All 71 Interactive Chapters & Timestamps for Bro Code's Java Course
 * Video ID: xTtL8E4LzTQ
 */

export function timeToSeconds(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

export const TOPIC_CATEGORIES = [
  { id: "all", label: "All Topics (71)", min: 1, max: 71 },
  { id: "basics", label: "Basics & Logic (#1 - #20)", min: 1, max: 20 },
  { id: "loops", label: "Loops & Methods (#21 - #30)", min: 21, max: 30 },
  { id: "arrays", label: "Arrays & Games (#31 - #38)", min: 31, max: 38 },
  { id: "oop", label: "OOP Mastery (#39 - #56)", min: 39, max: 56 },
  { id: "advanced", label: "Advanced & Projects (#57 - #71)", min: 57, max: 71 }
];

const RAW_TIMESTAMPS = [
  { id: 1, time: "00:00:00", title: "introduction to java" },
  { id: 2, time: "00:10:58", title: "variables" },
  { id: 3, time: "00:31:30", title: "user input" },
  { id: 4, time: "00:47:25", title: "mad libs game" },
  { id: 5, time: "00:54:08", title: "arithmetic" },
  { id: 6, time: "01:02:29", title: "shopping cart program" },
  { id: 7, time: "01:09:00", title: "if statements" },
  { id: 8, time: "01:22:28", title: "random numbers" },
  { id: 9, time: "01:27:28", title: "math class" },
  { id: 10, time: "01:42:37", title: "printf" },
  { id: 11, time: "01:56:14", title: "compound interest calculator" },
  { id: 12, time: "02:03:47", title: "nested if statements" },
  { id: 13, time: "02:10:20", title: "string methods" },
  { id: 14, time: "02:18:55", title: "substrings" },
  { id: 15, time: "02:27:00", title: "weight converter" },
  { id: 16, time: "02:35:19", title: "ternary operator" },
  { id: 17, time: "02:41:10", title: "temperature converter" },
  { id: 18, time: "02:49:05", title: "enhanced switches" },
  { id: 19, time: "02:57:42", title: "calculator program 🖩" },
  { id: 20, time: "03:09:58", title: "logical operators" },
  { id: 21, time: "03:21:23", title: "while loops" },
  { id: 22, time: "03:33:47", title: "number guessing game" },
  { id: 23, time: "03:43:33", title: "for loops" },
  { id: 24, time: "03:53:33", title: "break & continue" },
  { id: 25, time: "03:55:45", title: "nested loops" },
  { id: 26, time: "04:04:27", title: "methods" },
  { id: 27, time: "04:19:51", title: "overloaded methods" },
  { id: 28, time: "04:25:59", title: "variable scope" },
  { id: 29, time: "04:30:57", title: "banking program" },
  { id: 30, time: "04:51:26", title: "dice roller program" },
  { id: 31, time: "05:03:26", title: "arrays" },
  { id: 32, time: "05:12:35", title: "enter user input into an array" },
  { id: 33, time: "05:20:38", title: "search an array" },
  { id: 34, time: "05:28:07", title: "varargs" },
  { id: 35, time: "05:34:36", title: "2d arrays" },
  { id: 36, time: "05:44:13", title: "quiz game" },
  { id: 37, time: "05:59:14", title: "rock paper scissors" },
  { id: 38, time: "06:15:02", title: "slot machine" },
  { id: 39, time: "06:41:47", title: "object-oriented programming" },
  { id: 40, time: "06:51:38", title: "constructors" },
  { id: 41, time: "07:01:45", title: "overloaded constructors" },
  { id: 42, time: "07:08:22", title: "array of objects" },
  { id: 43, time: "07:14:07", title: "static" },
  { id: 44, time: "07:22:04", title: "inheritance" },
  { id: 45, time: "07:31:09", title: "super" },
  { id: 46, time: "07:41:37", title: "method overriding" },
  { id: 47, time: "07:46:08", title: "tostring method" },
  { id: 48, time: "07:51:58", title: "abstraction" },
  { id: 49, time: "08:01:30", title: "interfaces" },
  { id: 50, time: "08:07:44", title: "polymorphism" },
  { id: 51, time: "08:14:27", title: "runtime polymorphism" },
  { id: 52, time: "08:19:35", title: "getters and setters" },
  { id: 53, time: "08:29:39", title: "aggregation" },
  { id: 54, time: "08:39:02", title: "composition" },
  { id: 55, time: "08:45:17", title: "wrapper classes" },
  { id: 56, time: "08:55:51", title: "arraylists" },
  { id: 57, time: "09:05:29", title: "exception handling" },
  { id: 58, time: "09:13:28", title: "write files" },
  { id: 59, time: "09:21:58", title: "read files" },
  { id: 60, time: "09:28:50", title: "music player" },
  { id: 61, time: "09:43:10", title: "hangman game" },
  { id: 62, time: "10:11:42", title: "dates & times" },
  { id: 63, time: "10:20:24", title: "anonymous classes" },
  { id: 64, time: "10:25:23", title: "timertasks" },
  { id: 65, time: "10:31:45", title: "countdown timer" },
  { id: 66, time: "10:38:16", title: "generics" },
  { id: 67, time: "10:52:09", title: "hashmaps" },
  { id: 68, time: "11:02:38", title: "enums" },
  { id: 69, time: "11:12:45", title: "threading" },
  { id: 70, time: "11:23:04", title: "multithreading" },
  { id: 71, time: "11:31:02", title: "alarm clock" }
];

export const JAVA_TIMESTAMPS = RAW_TIMESTAMPS.map((item) => {
  const sec = timeToSeconds(item.time);
  let categoryId = "basics";
  let categoryLabel = "Basics & Logic";

  if (item.id >= 1 && item.id <= 20) {
    categoryId = "basics";
    categoryLabel = "Basics & Logic";
  } else if (item.id >= 21 && item.id <= 30) {
    categoryId = "loops";
    categoryLabel = "Loops & Methods";
  } else if (item.id >= 31 && item.id <= 38) {
    categoryId = "arrays";
    categoryLabel = "Arrays & Games";
  } else if (item.id >= 39 && item.id <= 56) {
    categoryId = "oop";
    categoryLabel = "OOP Mastery";
  } else {
    categoryId = "advanced";
    categoryLabel = "Advanced & Projects";
  }

  return {
    ...item,
    seconds: sec,
    categoryId,
    categoryLabel,
    youtubeUrl: `https://www.youtube.com/watch?v=xTtL8E4LzTQ&t=${sec}s`
  };
});
