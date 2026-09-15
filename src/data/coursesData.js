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
    totalDuration: "1h 45m",
    episodes: [
      {
        id: "java-ep-1",
        number: 1,
        title: "Introduction to Java & JVM Architecture",
        duration: "12 min",
        description: "Understand bytecode, JVM, JRE, JDK, and write your first Hello World program.",
        topics: ["JDK Setup", "JVM Internal Architecture", "Bytecode vs Machine Code", "First Program"]
      },
      {
        id: "java-ep-2",
        number: 2,
        title: "Variables, Data Types & Operators",
        duration: "15 min",
        description: "Deep dive into primitive data types, reference types, type casting, and arithmetic operations.",
        topics: ["Primitives", "Type Casting", "Logical Operators", "Variable Scope"]
      },
      {
        id: "java-ep-3",
        number: 3,
        title: "Methods & Parameter Passing",
        duration: "18 min",
        description: "Learn how to define modular methods, return types, pass-by-value semantics, and recursion.",
        topics: ["Method Signatures", "Return Types", "Pass-by-Value", "Recursion Basics"]
      },
      {
        id: "java-ep-4",
        number: 4,
        title: "Object-Oriented Programming (OOP) Concepts",
        duration: "20 min",
        description: "Understand classes, objects, constructors, encapsulation, and access modifiers.",
        topics: ["Classes & Objects", "Constructors", "Encapsulation", "Getters and Setters"]
      },
      {
        id: "java-ep-5",
        number: 5,
        title: "Inheritance & Polymorphism",
        duration: "22 min",
        description: "Explore class hierarchies, the super keyword, method overriding, and dynamic method dispatch.",
        topics: ["extends Keyword", "Method Overriding", "Dynamic Dispatch", "abstract Classes"]
      },
      {
        id: "java-ep-6",
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
    totalDuration: "1h 50m",
    episodes: [
      {
        id: "react-ep-1",
        number: 1,
        title: "JSX & Component Fundamentals",
        duration: "14 min",
        description: "Learn what JSX is, how React renders components, and build reusable UI elements.",
        topics: ["JSX Syntax", "Functional Components", "Virtual DOM", "Component Trees"]
      },
      {
        id: "react-ep-2",
        number: 2,
        title: "Props & State Management with useState",
        duration: "18 min",
        description: "Pass data down with props and make interfaces interactive using React's useState hook.",
        topics: ["Props Passing", "useState Hook", "State Immutability", "Event Handling"]
      },
      {
        id: "react-ep-3",
        number: 3,
        title: "Side Effects with useEffect & API Calls",
        duration: "20 min",
        description: "Handle side effects, lifecycle events, cleanup functions, and fetching mock APIs.",
        topics: ["useEffect Hook", "Dependency Array", "Cleanup Functions", "Async Fetching"]
      },
      {
        id: "react-ep-4",
        number: 4,
        title: "Lists, Keys & Conditional Rendering",
        duration: "16 min",
        description: "Render dynamic collections safely using map(), unique keys, and conditional operators.",
        topics: ["Array Mapping", "Key Prop Significance", "Ternary Rendering", "Short-Circuiting"]
      },
      {
        id: "react-ep-5",
        number: 5,
        title: "Routing with React Router v7",
        duration: "22 min",
        description: "Create single page application navigation with BrowserRouter, Routes, Route, and useParams.",
        topics: ["Route Definitions", "useNavigate", "useParams", "Active Links"]
      },
      {
        id: "react-ep-6",
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
    totalDuration: "1h 30m",
    episodes: [
      {
        id: "py-ep-1",
        number: 1,
        title: "Python Syntax, Variables & Types",
        duration: "12 min",
        description: "Python basics: dynamic typing, strings, formatted printing, and input/output.",
        topics: ["Dynamic Typing", "String Methods", "f-strings", "Type Conversion"]
      },
      {
        id: "py-ep-2",
        number: 2,
        title: "Control Flow & Loops",
        duration: "16 min",
        description: "Control program logic with if/elif/else statements, for loops, and while loops.",
        topics: ["Conditionals", "for in range()", "while loops", "break & continue"]
      },
      {
        id: "py-ep-3",
        number: 3,
        title: "Lists, Tuples, Dictionaries & Sets",
        duration: "22 min",
        description: "Master Python's built-in collections and list comprehensions for clean data handling.",
        topics: ["List Slicing", "Dictionary Methods", "List Comprehensions", "Sets"]
      },
      {
        id: "py-ep-4",
        number: 4,
        title: "Functions, *args & Lambdas",
        duration: "18 min",
        description: "Write reusable functions, default parameters, variable arguments, and lambda expressions.",
        topics: ["def Syntax", "Arbitrary Arguments", "Lambda Functions", "Docstrings"]
      },
      {
        id: "py-ep-5",
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
    totalDuration: "2h 10m",
    episodes: [
      {
        id: "dsa-ep-1",
        number: 1,
        title: "Time & Space Complexity (Big-O)",
        duration: "15 min",
        description: "Analyze code efficiency using asymptotic notations: Big-O, Big-Omega, and Big-Theta.",
        topics: ["Big-O Notation", "Time Analysis", "Space Complexity", "Common Complexities"]
      },
      {
        id: "dsa-ep-2",
        number: 2,
        title: "Arrays & Two-Pointer Techniques",
        duration: "20 min",
        description: "Master sliding window, two-pointer algorithms, and prefix sums on arrays.",
        topics: ["Two Pointers", "Sliding Window", "Subarrays", "Prefix Sum"]
      },
      {
        id: "dsa-ep-3",
        number: 3,
        title: "Singly & Doubly Linked Lists",
        duration: "22 min",
        description: "Pointers, node structures, insertion, deletion, and reversing a linked list.",
        topics: ["Node Pointer Logic", "Traversal", "Reversal Algorithm", "Cycle Detection"]
      },
      {
        id: "dsa-ep-4",
        number: 4,
        title: "Stacks, Queues & Monotonic Stacks",
        duration: "20 min",
        description: "LIFO vs FIFO principles, queue implementations, and parenthetical validation.",
        topics: ["LIFO / FIFO", "Valid Parentheses", "Circular Queues", "Next Greater Element"]
      },
      {
        id: "dsa-ep-5",
        number: 5,
        title: "Binary Trees & BST Traversals",
        duration: "25 min",
        description: "Tree terminology, recursive traversals (Inorder, Preorder, Postorder), and BST search.",
        topics: ["Tree Properties", "DFS Traversals", "BFS / Level Order", "BST Validation"]
      },
      {
        id: "dsa-ep-6",
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
    totalDuration: "1h 40m",
    episodes: [
      {
        id: "db-ep-1",
        number: 1,
        title: "Relational Model & ER Diagrams",
        duration: "16 min",
        description: "Entity-Relationship modeling, entities, attributes, primary keys, and foreign keys.",
        topics: ["ER Diagrams", "Primary & Foreign Keys", "Relational Schemas", "Cardinality"]
      },
      {
        id: "db-ep-2",
        number: 2,
        title: "SQL Fundamentals: DDL & DML",
        duration: "20 min",
        description: "Write SELECT queries, filtering with WHERE, GROUP BY, HAVING, and aggregations.",
        topics: ["CREATE / ALTER / DROP", "SELECT Queries", "GROUP BY & HAVING", "Aggregate Functions"]
      },
      {
        id: "db-ep-3",
        number: 3,
        title: "SQL Joins & Subqueries",
        duration: "22 min",
        description: "INNER, LEFT, RIGHT, and FULL OUTER joins, along with correlated subqueries.",
        topics: ["INNER JOIN", "OUTER JOINs", "Self Joins", "Correlated Subqueries"]
      },
      {
        id: "db-ep-4",
        number: 4,
        title: "Database Normalization (1NF, 2NF, 3NF, BCNF)",
        duration: "24 min",
        description: "Eliminate functional dependencies and insertion/deletion anomalies through normalization.",
        topics: ["Functional Dependencies", "1NF & 2NF", "3NF & BCNF", "Decomposition"]
      },
      {
        id: "db-ep-5",
        number: 5,
        title: "Transactions, ACID Properties & Concurrency",
        duration: "18 min",
        description: "Understand Atomicity, Consistency, Isolation, Durability, and transaction locking mechanisms.",
        topics: ["ACID Properties", "Transaction Schedules", "Serializability", "Deadlocks"]
      }
    ]
  }
];

export const ALL_CATEGORIES = ["All", "Programming", "Web Dev", "Core CS", "Database"];

export function getCourseById(courseId) {
  if (!courseId) return COURSES[0];
  const found = COURSES.find((c) => c.id === courseId);
  return found || COURSES[0];
}
