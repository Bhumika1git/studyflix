import { timeToSeconds } from "./javaTimestamps";

export const DSA_TOPIC_CATEGORIES = [
  { id: "all", label: "All Topics (34)", min: 1, max: 34 },
  { id: "complexity", label: "Complexity & Arrays (#1 - #8)", min: 1, max: 8 },
  { id: "linear", label: "Lists, Stacks & Queues (#9 - #16)", min: 9, max: 16 },
  { id: "trees", label: "Binary Trees & Heaps (#17 - #25)", min: 17, max: 25 },
  { id: "advanced", label: "Hash Tables, Graphs & DP (#26 - #34)", min: 26, max: 34 }
];

const RAW_DSA_TIMESTAMPS = [
  { id: 1, time: "00:00:00", title: "Abstract Data Types vs Data Structures" },
  { id: 2, time: "00:04:36", title: "Introduction to Big-O Notation" },
  { id: 3, time: "00:18:22", title: "Big-O Analysis & Common Complexities" },
  { id: 4, time: "00:32:10", title: "Static vs Dynamic Arrays" },
  { id: 5, time: "00:44:18", title: "Dynamic Array Implementation & Resize" },
  { id: 6, time: "00:58:30", title: "Two Pointers Technique on Arrays" },
  { id: 7, time: "01:14:45", title: "Sliding Window Algorithm Pattern" },
  { id: 8, time: "01:31:20", title: "Prefix Sums & Range Sum Queries" },
  { id: 9, time: "01:46:50", title: "Singly Linked List Architecture" },
  { id: 10, time: "02:03:15", title: "Doubly Linked List Implementation" },
  { id: 11, time: "02:21:40", title: "Reversing a Linked List & Cycle Detection" },
  { id: 12, time: "02:40:10", title: "Stack ADT & LIFO Mechanics" },
  { id: 13, time: "02:56:30", title: "Stack Implementation & Valid Parentheses" },
  { id: 14, time: "03:14:20", title: "Queue ADT & FIFO Mechanics" },
  { id: 15, time: "03:32:00", title: "Circular Queue & Deque" },
  { id: 16, time: "03:49:15", title: "Priority Queue & Min/Max Heaps" },
  { id: 17, time: "04:08:40", title: "Heap Insertion & Bubble Up" },
  { id: 18, time: "04:26:10", title: "Heap Extraction & Bubble Down" },
  { id: 19, time: "04:44:30", title: "Introduction to Binary Trees" },
  { id: 20, time: "05:02:15", title: "Binary Search Tree (BST) Properties" },
  { id: 21, time: "05:21:00", title: "BST Insertion, Search & Removal" },
  { id: 22, time: "05:40:25", title: "Tree Traversals: Inorder, Preorder, Postorder" },
  { id: 23, time: "06:01:10", title: "Breadth-First Search (Level Order)" },
  { id: 24, time: "06:19:40", title: "AVL Trees & Self-Balancing Rotations" },
  { id: 25, time: "06:38:20", title: "Red-Black Trees Overview" },
  { id: 26, time: "06:55:10", title: "Hash Tables & Hash Functions" },
  { id: 27, time: "07:12:30", title: "Collision Resolution: Separate Chaining & Open Addressing" },
  { id: 28, time: "07:29:45", title: "Graph Theory Fundamentals & Representations" },
  { id: 29, time: "07:46:10", title: "Depth First Search (DFS) on Graphs" },
  { id: 30, time: "08:02:40", title: "Breadth First Search (BFS) on Graphs" },
  { id: 31, time: "08:18:20", title: "Dijkstra's Shortest Path Algorithm" },
  { id: 32, time: "08:34:15", title: "Topological Sort & DAGs" },
  { id: 33, time: "08:48:30", title: "Introduction to Dynamic Programming: Memoization" },
  { id: 34, time: "09:01:20", title: "Tabulation vs Memoization: 0/1 Knapsack" }
];

export const DSA_TIMESTAMPS = RAW_DSA_TIMESTAMPS.map((item) => {
  const sec = timeToSeconds(item.time);
  let categoryId = "complexity";
  let categoryLabel = "Complexity & Arrays";

  if (item.id <= 8) {
    categoryId = "complexity";
    categoryLabel = "Complexity & Arrays";
  } else if (item.id <= 16) {
    categoryId = "linear";
    categoryLabel = "Lists, Stacks & Queues";
  } else if (item.id <= 25) {
    categoryId = "trees";
    categoryLabel = "Binary Trees & Heaps";
  } else {
    categoryId = "advanced";
    categoryLabel = "Hash Tables, Graphs & DP";
  }

  return {
    ...item,
    seconds: sec,
    categoryId,
    categoryLabel,
    youtubeUrl: `https://www.youtube.com/watch?v=RBSGKlAvoiM&t=${sec}s`
  };
});
