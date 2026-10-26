import { JAVA_TIMESTAMPS, TOPIC_CATEGORIES as JAVA_TOPIC_CATEGORIES } from "./javaTimestamps";
import { REACT_TIMESTAMPS, REACT_TOPIC_CATEGORIES } from "./reactTimestamps";
import { PYTHON_TIMESTAMPS, PYTHON_TOPIC_CATEGORIES } from "./pythonTimestamps";
import { DSA_TIMESTAMPS, DSA_TOPIC_CATEGORIES } from "./dsaTimestamps";
import { DBMS_TIMESTAMPS, DBMS_TOPIC_CATEGORIES } from "./dbmsTimestamps";

export const COURSES = [
  {
    id: "java-programming",
    title: "Java Programming",
    category: "Programming",
    tagline: "Master Java from fundamentals to object-oriented programming.",
    description:
      "A comprehensive guide for college students covering Java syntax, OOP principles, methods, memory management, and practical coding patterns.",
    icon: "☕",
    badgeColor: "#ea580c",
    level: "Beginner to Intermediate",
    totalDuration: "11h 31m",
    videoOptions: [
      {
        id: "java-best-overall",
        badge: "🎯 Best Overall",
        label: "Best Overall",
        title: "Java Full Course for free ☕",
        instructor: "Bro Code",
        channel: "Bro Code",
        duration: "11h 31m",
        totalSeconds: 41462,
        rating: 4.9,
        views: "15M+ Views",
        difficulty: "Beginner to Advanced",
        youtubeId: "xTtL8E4LzTQ",
        youtubeUrl: "https://www.youtube.com/watch?v=xTtL8E4LzTQ",
        chaptersCount: 71,
        hasTimestamps: true,
        description:
          "Comprehensive deep-dive covering Java fundamentals, OOP, GUI/Games, and Multithreading. Packed with real-world examples and 71 structured chapters."
      },
      {
        id: "java-beginner-friendly",
        badge: "🌱 Beginner Friendly",
        label: "Beginner Friendly",
        title: "Java Tutorial for Beginners",
        instructor: "Mosh Hamedani",
        channel: "Programming with Mosh",
        duration: "2h 30m",
        totalSeconds: 9000,
        rating: 4.8,
        views: "9M+ Views",
        difficulty: "Beginner",
        youtubeId: "eIrMbAQSU34",
        youtubeUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34",
        chaptersCount: 18,
        hasTimestamps: false,
        description:
          "Step-by-step visual explanation with gentle learning curve covering Java syntax, variables, types, and foundational control logic."
      },
      {
        id: "java-hands-on-coding",
        badge: "💻 Hands-on Coding",
        label: "Hands-on Coding",
        title: "Java Full Course - Build 5 Real Projects",
        instructor: "freeCodeCamp",
        channel: "freeCodeCamp.org",
        duration: "9h 30m",
        totalSeconds: 34200,
        rating: 4.9,
        views: "7M+ Views",
        difficulty: "Intermediate",
        youtubeId: "grEKMHGYyns",
        youtubeUrl: "https://www.youtube.com/watch?v=grEKMHGYyns",
        chaptersCount: 35,
        hasTimestamps: false,
        description:
          "Practical, project-driven, live code-along approach building robust real-world applications and understanding production design patterns."
      }
    ],
    modules: [
      {
        id: "java-mod-1",
        number: 1,
        title: "Introduction to Java & JVM Architecture",
        duration: "12 min",
        description: "Understand bytecode, JVM, JRE, JDK, and write your first Hello World program.",
        topics: ["JDK Setup", "JVM Internal Architecture", "Bytecode vs Machine Code", "First Program"]
      },
      {
        id: "java-mod-2",
        number: 2,
        title: "Variables, Data Types & Operators",
        duration: "15 min",
        description: "Deep dive into primitive data types, reference types, type casting, and arithmetic operations.",
        topics: ["Primitives", "Type Casting", "Logical Operators", "Variable Scope"]
      },
      {
        id: "java-mod-3",
        number: 3,
        title: "Methods & Parameter Passing",
        duration: "18 min",
        description: "Learn how to define modular methods, return types, pass-by-value semantics, and recursion.",
        topics: ["Method Signatures", "Return Types", "Pass-by-Value", "Recursion Basics"]
      },
      {
        id: "java-mod-4",
        number: 4,
        title: "Object-Oriented Programming (OOP) Concepts",
        duration: "20 min",
        description: "Understand classes, objects, constructors, encapsulation, and access modifiers.",
        topics: ["Classes & Objects", "Constructors", "Encapsulation", "Getters and Setters"]
      },
      {
        id: "java-mod-5",
        number: 5,
        title: "Inheritance & Polymorphism",
        duration: "22 min",
        description: "Explore class hierarchies, the super keyword, method overriding, and dynamic method dispatch.",
        topics: ["extends Keyword", "Method Overriding", "Dynamic Dispatch", "abstract Classes"]
      },
      {
        id: "java-mod-6",
        number: 6,
        title: "Exception Handling & Collections Framework",
        duration: "18 min",
        description: "Handle runtime exceptions gracefully with try-catch blocks and manage data using ArrayList and HashMap.",
        topics: ["try-catch-finally", "Custom Exceptions", "ArrayList", "HashMap"]
      }
    ]
  },
  {
    id: "react-development",
    title: "React Development",
    category: "Web Dev",
    tagline: "Build dynamic, high-performance web applications with modern React.",
    description:
      "Learn modern frontend engineering using React 19, functional components, hooks, component design, and state management.",
    icon: "⚛️",
    badgeColor: "#0284c7",
    level: "Intermediate",
    totalDuration: "11h 55m",
    videoOptions: [
      {
        id: "react-best-overall",
        badge: "🎯 Best Overall",
        label: "Best Overall",
        title: "React 19 & Full Modern React Course",
        instructor: "Bob Ziroll",
        channel: "freeCodeCamp.org",
        duration: "11h 55m",
        totalSeconds: 42900,
        rating: 4.9,
        views: "6M+ Views",
        difficulty: "Beginner to Advanced",
        youtubeId: "bMknfKXIFA8",
        youtubeUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        chaptersCount: 36,
        hasTimestamps: true,
        description:
          "Comprehensive deep-dive covering modern React components, JSX, hooks, state management, routing, and deployment with 36 structured chapters."
      },
      {
        id: "react-beginner-friendly",
        badge: "🌱 Beginner Friendly",
        label: "Beginner Friendly",
        title: "React Tutorial for Beginners",
        instructor: "Mosh Hamedani",
        channel: "Programming with Mosh",
        duration: "1h 40m",
        totalSeconds: 6000,
        rating: 4.8,
        views: "4.5M+ Views",
        difficulty: "Beginner",
        youtubeId: "SqcY0GlETPk",
        youtubeUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        chaptersCount: 16,
        hasTimestamps: false,
        description:
          "Step-by-step visual explanation with gentle learning curve covering React components, props, state, and event handling."
      },
      {
        id: "react-hands-on-coding",
        badge: "💻 Hands-on Coding",
        label: "Hands-on Coding",
        title: "Full Stack React & Node Project Crash Course",
        instructor: "Brad Traversy",
        channel: "Traversy Media",
        duration: "4h 15m",
        totalSeconds: 15300,
        rating: 4.9,
        views: "2.8M+ Views",
        difficulty: "Intermediate",
        youtubeId: "w7ejDZ8SWv8",
        youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
        chaptersCount: 22,
        hasTimestamps: false,
        description:
          "Practical, project-driven, live code-along approach building full stack web applications with custom hooks and state management."
      }
    ],
    modules: [
      {
        id: "react-mod-1",
        number: 1,
        title: "JSX & Component Fundamentals",
        duration: "14 min",
        description: "Learn what JSX is, how React renders components, and build reusable UI elements.",
        topics: ["JSX Syntax", "Functional Components", "Virtual DOM", "Component Trees"]
      },
      {
        id: "react-mod-2",
        number: 2,
        title: "Props & State Management with useState",
        duration: "18 min",
        description: "Pass data down with props and make interfaces interactive using React's useState hook.",
        topics: ["Props Passing", "useState Hook", "State Immutability", "Event Handling"]
      },
      {
        id: "react-mod-3",
        number: 3,
        title: "Side Effects with useEffect & API Calls",
        duration: "20 min",
        description: "Handle side effects, lifecycle events, cleanup functions, and fetching mock APIs.",
        topics: ["useEffect Hook", "Dependency Array", "Cleanup Functions", "Async Fetching"]
      },
      {
        id: "react-mod-4",
        number: 4,
        title: "Lists, Keys & Conditional Rendering",
        duration: "16 min",
        description: "Render dynamic collections safely using map(), unique keys, and conditional operators.",
        topics: ["Array Mapping", "Key Prop Significance", "Ternary Rendering", "Short-Circuiting"]
      },
      {
        id: "react-mod-5",
        number: 5,
        title: "Routing with React Router v7",
        duration: "22 min",
        description: "Create single page application navigation with BrowserRouter, Routes, Route, and useParams.",
        topics: ["Route Definitions", "useNavigate", "useParams", "Active Links"]
      },
      {
        id: "react-mod-6",
        number: 6,
        title: "Building Component Systems & LocalStorage",
        duration: "20 min",
        description: "Organize reusable UI components, clean styling patterns, and persist state in localStorage.",
        topics: ["Custom Hooks", "localStorage Sync", "UI Component Libraries", "Performance"]
      }
    ]
  },
  {
    id: "python-essentials",
    title: "Python Essentials",
    category: "Programming",
    tagline: "Write clean, readable, and powerful Python programs with ease.",
    description:
      "Core Python fundamentals for problem-solving, scripting, data handling, and algorithmic thinking.",
    icon: "🐍",
    badgeColor: "#16a34a",
    level: "Beginner",
    totalDuration: "4h 26m",
    videoOptions: [
      {
        id: "python-best-overall",
        badge: "🎯 Best Overall",
        label: "Best Overall",
        title: "Python for Beginners - Full Course [4.5 Hours]",
        instructor: "Mike Dane",
        channel: "freeCodeCamp.org",
        duration: "4h 26m",
        totalSeconds: 15988,
        rating: 4.9,
        views: "42M+ Views",
        difficulty: "Beginner to Intermediate",
        youtubeId: "_uQrJ0TkZlc",
        youtubeUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        chaptersCount: 33,
        hasTimestamps: true,
        description:
          "Comprehensive deep-dive covering Python syntax, data structures, OOP, file handling, and algorithms with 33 structured chapters."
      },
      {
        id: "python-beginner-friendly",
        badge: "🌱 Beginner Friendly",
        label: "Beginner Friendly",
        title: "Python Tutorial for Beginners [1 Hour]",
        instructor: "Mosh Hamedani",
        channel: "Programming with Mosh",
        duration: "1h 00m",
        totalSeconds: 3600,
        rating: 4.9,
        views: "38M+ Views",
        difficulty: "Beginner",
        youtubeId: "kqtD5dpn9C8",
        youtubeUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
        chaptersCount: 14,
        hasTimestamps: false,
        description:
          "Step-by-step visual explanation with gentle learning curve covering variables, lists, if-statements, and loops."
      },
      {
        id: "python-hands-on-coding",
        badge: "💻 Hands-on Coding",
        label: "Hands-on Coding",
        title: "Build 12 Python Projects - Step-by-Step",
        instructor: "Kylie Ying",
        channel: "freeCodeCamp.org",
        duration: "3h 10m",
        totalSeconds: 11400,
        rating: 4.8,
        views: "5.5M+ Views",
        difficulty: "Hands-on Practical",
        youtubeId: "8ext9G7xspg",
        youtubeUrl: "https://www.youtube.com/watch?v=8ext9G7xspg",
        chaptersCount: 20,
        hasTimestamps: false,
        description:
          "Practical, project-driven, live code-along approach building 12 games and scripts including Mad Libs, Hangman, and Tic-Tac-Toe."
      }
    ],
    modules: [
      {
        id: "py-mod-1",
        number: 1,
        title: "Python Syntax, Variables & Types",
        duration: "12 min",
        description: "Python basics: dynamic typing, strings, formatted printing, and input/output.",
        topics: ["Dynamic Typing", "String Methods", "f-strings", "Type Conversion"]
      },
      {
        id: "py-mod-2",
        number: 2,
        title: "Control Flow & Loops",
        duration: "16 min",
        description: "Control program logic with if/elif/else statements, for loops, and while loops.",
        topics: ["Conditionals", "for in range()", "while loops", "break & continue"]
      },
      {
        id: "py-mod-3",
        number: 3,
        title: "Lists, Tuples, Dictionaries & Sets",
        duration: "22 min",
        description: "Master Python's built-in collections and list comprehensions for clean data handling.",
        topics: ["List Slicing", "Dictionary Methods", "List Comprehensions", "Sets"]
      },
      {
        id: "py-mod-4",
        number: 4,
        title: "Functions, *args & Lambdas",
        duration: "18 min",
        description: "Write reusable functions, default parameters, variable arguments, and lambda expressions.",
        topics: ["def Syntax", "Arbitrary Arguments", "Lambda Functions", "Docstrings"]
      },
      {
        id: "py-mod-5",
        number: 5,
        title: "File Handling & Modules",
        duration: "22 min",
        description: "Read and write text and JSON files safely with context managers and organize modules.",
        topics: ["with open()", "JSON Parsing", "Module Imports", "Virtual Environments"]
      }
    ]
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms (DSA)",
    category: "Core CS",
    tagline: "Build strong problem-solving skills for technical interviews and exams.",
    description:
      "Essential college syllabus covering asymptotic complexity, foundational linear structures, and non-linear data structures.",
    icon: "⚡",
    badgeColor: "#9333ea",
    level: "Intermediate",
    totalDuration: "9h 05m",
    videoOptions: [
      {
        id: "dsa-best-overall",
        badge: "🎯 Best Overall",
        label: "Best Overall",
        title: "Data Structures Easy to Advanced Course - Full Tutorial",
        instructor: "William Fiset",
        channel: "freeCodeCamp.org",
        duration: "9h 05m",
        totalSeconds: 32700,
        rating: 4.9,
        views: "8.2M+ Views",
        difficulty: "Comprehensive",
        youtubeId: "RBSGKlAvoiM",
        youtubeUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
        chaptersCount: 34,
        hasTimestamps: true,
        description:
          "Comprehensive deep-dive covering Big-O, arrays, linked lists, trees, graphs, and dynamic programming with 34 structured chapters."
      },
      {
        id: "dsa-beginner-friendly",
        badge: "🌱 Beginner Friendly",
        label: "Beginner Friendly",
        title: "Data Structures & Algorithms in 15 Minutes",
        instructor: "Jeff Delaney",
        channel: "Fireship",
        duration: "1h 15m",
        totalSeconds: 4500,
        rating: 4.9,
        views: "3.5M+ Views",
        difficulty: "Visual Beginner",
        youtubeId: "zg9ih6SVACc",
        youtubeUrl: "https://www.youtube.com/watch?v=zg9ih6SVACc",
        chaptersCount: 15,
        hasTimestamps: false,
        description:
          "Step-by-step visual explanation with gentle learning curve illustrating core data structures and algorithmic trade-offs."
      },
      {
        id: "dsa-hands-on-coding",
        badge: "💻 Hands-on Coding",
        label: "Hands-on Coding",
        title: "Algorithms and Data Structures in Python / C++",
        instructor: "Navdeep Singh",
        channel: "NeetCode",
        duration: "5h 45m",
        totalSeconds: 20700,
        rating: 4.9,
        views: "4.1M+ Views",
        difficulty: "Interview Coding",
        youtubeId: "BBpAmxU_NQo",
        youtubeUrl: "https://www.youtube.com/watch?v=BBpAmxU_NQo",
        chaptersCount: 30,
        hasTimestamps: false,
        description:
          "Practical, project-driven, live code-along approach solving essential LeetCode coding patterns and interview questions."
      }
    ],
    modules: [
      {
        id: "dsa-mod-1",
        number: 1,
        title: "Time & Space Complexity (Big-O)",
        duration: "15 min",
        description: "Analyze code efficiency using asymptotic notations: Big-O, Big-Omega, and Big-Theta.",
        topics: ["Big-O Notation", "Time Analysis", "Space Complexity", "Common Complexities"]
      },
      {
        id: "dsa-mod-2",
        number: 2,
        title: "Arrays & Two-Pointer Techniques",
        duration: "20 min",
        description: "Master sliding window, two-pointer algorithms, and prefix sums on arrays.",
        topics: ["Two Pointers", "Sliding Window", "Subarrays", "Prefix Sum"]
      },
      {
        id: "dsa-mod-3",
        number: 3,
        title: "Singly & Doubly Linked Lists",
        duration: "22 min",
        description: "Pointers, node structures, insertion, deletion, and reversing a linked list.",
        topics: ["Node Pointer Logic", "Traversal", "Reversal Algorithm", "Cycle Detection"]
      },
      {
        id: "dsa-mod-4",
        number: 4,
        title: "Stacks, Queues & Monotonic Stacks",
        duration: "20 min",
        description: "LIFO vs FIFO principles, queue implementations, and parenthetical validation.",
        topics: ["LIFO / FIFO", "Valid Parentheses", "Circular Queues", "Next Greater Element"]
      },
      {
        id: "dsa-mod-5",
        number: 5,
        title: "Binary Trees & BST Traversals",
        duration: "25 min",
        description: "Tree terminology, recursive traversals (Inorder, Preorder, Postorder), and BST search.",
        topics: ["Tree Properties", "DFS Traversals", "BFS / Level Order", "BST Validation"]
      },
      {
        id: "dsa-mod-6",
        number: 6,
        title: "Introduction to Dynamic Programming",
        duration: "28 min",
        description: "Memoization vs Tabulation, overlapping subproblems, and classic 0/1 knapsack intuition.",
        topics: ["Memoization", "Tabulation", "Fibonacci Optimization", "Knapsack Basics"]
      }
    ]
  },
  {
    id: "dbms",
    title: "Database Management Systems (DBMS)",
    category: "Database",
    tagline: "Understand relational databases, SQL querying, and transaction safety.",
    description:
      "Core college curriculum covering database design, relational algebra, SQL DDL/DML, normalization, and ACID properties.",
    icon: "🗄️",
    badgeColor: "#059669",
    level: "Beginner to Intermediate",
    totalDuration: "4h 20m",
    videoOptions: [
      {
        id: "dbms-best-overall",
        badge: "🎯 Best Overall",
        label: "Best Overall",
        title: "Database Systems & SQL - Full University Course",
        instructor: "Mike Dane",
        channel: "freeCodeCamp.org",
        duration: "4h 20m",
        totalSeconds: 15600,
        rating: 4.9,
        views: "6.8M+ Views",
        difficulty: "University Level",
        youtubeId: "HXV3zeQKqGY",
        youtubeUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        chaptersCount: 25,
        hasTimestamps: true,
        description:
          "Comprehensive deep-dive covering relational databases, ER design, DDL/DML, Normalization (1NF-BCNF), and ACID transactions with 25 structured chapters."
      },
      {
        id: "dbms-beginner-friendly",
        badge: "🌱 Beginner Friendly",
        label: "Beginner Friendly",
        title: "SQL Tutorial for Beginners",
        instructor: "Mosh Hamedani",
        channel: "Programming with Mosh",
        duration: "1h 10m",
        totalSeconds: 4200,
        rating: 4.8,
        views: "5.1M+ Views",
        difficulty: "Beginner",
        youtubeId: "7S_tz1z_5bA",
        youtubeUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        chaptersCount: 15,
        hasTimestamps: false,
        description:
          "Step-by-step visual explanation with gentle learning curve covering SELECT queries, filters, joins, and table creation."
      },
      {
        id: "dbms-hands-on-coding",
        badge: "💻 Hands-on Coding",
        label: "Hands-on Coding",
        title: "PostgreSQL / MySQL Hands-On Practice",
        instructor: "Nelson Djalo",
        channel: "Amigoscode",
        duration: "3h 40m",
        totalSeconds: 13200,
        rating: 4.8,
        views: "2.3M+ Views",
        difficulty: "Hands-on Practical",
        youtubeId: "qw--VYLpxG4",
        youtubeUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4",
        chaptersCount: 24,
        hasTimestamps: false,
        description:
          "Practical, project-driven, live code-along approach writing complex queries, joins, indexes, and database schemas."
      }
    ],
    modules: [
      {
        id: "db-mod-1",
        number: 1,
        title: "Relational Model & ER Diagrams",
        duration: "16 min",
        description: "Entity-Relationship modeling, entities, attributes, primary keys, and foreign keys.",
        topics: ["ER Diagrams", "Primary & Foreign Keys", "Relational Schemas", "Cardinality"]
      },
      {
        id: "db-mod-2",
        number: 2,
        title: "SQL Fundamentals: DDL & DML",
        duration: "20 min",
        description: "Write SELECT queries, filtering with WHERE, GROUP BY, HAVING, and aggregations.",
        topics: ["CREATE / ALTER / DROP", "SELECT Queries", "GROUP BY & HAVING", "Aggregate Functions"]
      },
      {
        id: "db-mod-3",
        number: 3,
        title: "SQL Joins & Subqueries",
        duration: "22 min",
        description: "INNER, LEFT, RIGHT, and FULL OUTER joins, along with correlated subqueries.",
        topics: ["INNER JOIN", "OUTER JOINs", "Self Joins", "Correlated Subqueries"]
      },
      {
        id: "db-mod-4",
        number: 4,
        title: "Database Normalization (1NF, 2NF, 3NF, BCNF)",
        duration: "24 min",
        description: "Eliminate functional dependencies and insertion/deletion anomalies through normalization.",
        topics: ["Functional Dependencies", "1NF & 2NF", "3NF & BCNF", "Decomposition"]
      },
      {
        id: "db-mod-5",
        number: 5,
        title: "Transactions, ACID Properties & Concurrency",
        duration: "18 min",
        description: "Understand Atomicity, Consistency, Isolation, Durability, and transaction locking mechanisms.",
        topics: ["ACID Properties", "Transaction Schedules", "Serializability", "Deadlocks"]
      }
    ]
  }
];

// Alias course.episodes to course.modules for complete backwards compatibility
COURSES.forEach((course) => {
  course.episodes = course.modules;
});

export const ALL_CATEGORIES = ["All", "Programming", "Web Dev", "Core CS", "Database"];

export function getCourseById(courseId) {
  if (!courseId) return COURSES[0];
  const found = COURSES.find((c) => c.id === courseId);
  return found || COURSES[0];
}

/**
 * Returns the exactly 3 curated video options for any course
 */
export function getCourseVideoOptions(courseId) {
  const course = getCourseById(courseId);
  return course?.videoOptions || [];
}

/**
 * Retrieves the currently active video option based on course & selectedOptionId
 */
export function getCourseVideo(course, selectedOptionId) {
  if (!course) return null;
  const options = course.videoOptions || [];
  if (!options.length) return null;
  if (!selectedOptionId) return options[0];
  const found = options.find((opt) => opt.id === selectedOptionId);
  return found || options[0];
}

/**
 * Returns interactive chapters and timestamps for ANY courseId.
 */
export function getCourseTimestamps(courseId) {
  switch (courseId) {
    case "java-programming":
      return JAVA_TIMESTAMPS;
    case "react-development":
      return REACT_TIMESTAMPS;
    case "python-essentials":
      return PYTHON_TIMESTAMPS;
    case "dsa":
      return DSA_TIMESTAMPS;
    case "dbms":
      return DBMS_TIMESTAMPS;
    default:
      return [];
  }
}

/**
 * Returns topic range categories for ANY courseId.
 */
export function getCourseTimestampCategories(courseId) {
  switch (courseId) {
    case "java-programming":
      return JAVA_TOPIC_CATEGORIES;
    case "react-development":
      return REACT_TOPIC_CATEGORIES;
    case "python-essentials":
      return PYTHON_TOPIC_CATEGORIES;
    case "dsa":
      return DSA_TOPIC_CATEGORIES;
    case "dbms":
      return DBMS_TOPIC_CATEGORIES;
    default:
      return [{ id: "all", label: "All Topics", min: 1, max: 100 }];
  }
}
