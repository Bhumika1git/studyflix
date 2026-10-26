import { timeToSeconds } from "./javaTimestamps";

export const DBMS_TOPIC_CATEGORIES = [
  { id: "all", label: "All Topics (25)", min: 1, max: 25 },
  { id: "fundamentals", label: "DB Concepts & Tables (#1 - #7)", min: 1, max: 7 },
  { id: "sql_basic", label: "SQL DDL & Queries (#8 - #14)", min: 8, max: 14 },
  { id: "sql_advanced", label: "Aggregates & Joins (#15 - #20)", min: 15, max: 20 },
  { id: "design", label: "Normalization & ACID (#21 - #25)", min: 21, max: 25 }
];

const RAW_DBMS_TIMESTAMPS = [
  { id: 1, time: "00:00:00", title: "What is a Database? Relational vs Non-Relational" },
  { id: 2, time: "00:07:34", title: "Database Management Systems (DBMS) Architecture" },
  { id: 3, time: "00:15:20", title: "Tables, Rows, Columns & Keys" },
  { id: 4, time: "00:24:10", title: "Primary Keys, Foreign Keys & Candidate Keys" },
  { id: 5, time: "00:33:45", title: "Entity-Relationship (ER) Modeling Basics" },
  { id: 6, time: "00:44:20", title: "ER Diagrams: Entities, Attributes & Cardinality" },
  { id: 7, time: "00:55:10", title: "Converting ER Diagrams to Relational Schemas" },
  { id: 8, time: "01:05:40", title: "Introduction to SQL & DDL vs DML vs DCL" },
  { id: 9, time: "01:16:30", title: "CREATE TABLE, Constraints & Data Types" },
  { id: 10, time: "01:28:15", title: "ALTER TABLE, DROP TABLE & TRUNCATE" },
  { id: 11, time: "01:38:50", title: "INSERT INTO & Inserting Sample Records" },
  { id: 12, time: "01:49:20", title: "Basic SELECT Queries & Aliasing" },
  { id: 13, time: "02:00:45", title: "Filtering Data with WHERE, AND, OR, NOT" },
  { id: 14, time: "02:12:10", title: "Pattern Matching with LIKE & Wildcards" },
  { id: 15, time: "02:22:30", title: "Aggregate Functions: COUNT, SUM, AVG, MIN, MAX" },
  { id: 16, time: "02:34:15", title: "GROUP BY & HAVING Clauses" },
  { id: 17, time: "02:46:00", title: "Understanding Table Relationships & Foreign Keys" },
  { id: 18, time: "02:58:20", title: "INNER JOIN: Syntax & Mechanics" },
  { id: 19, time: "03:10:15", title: "LEFT JOIN, RIGHT JOIN & FULL OUTER JOIN" },
  { id: 20, time: "03:22:40", title: "Nested Subqueries & Correlated Subqueries" },
  { id: 21, time: "03:34:10", title: "Database Normalization: Overview & Anomalies" },
  { id: 22, time: "03:45:30", title: "1NF, 2NF, 3NF & Boyce-Codd Normal Form (BCNF)" },
  { id: 23, time: "03:57:15", title: "Transactions & ACID Properties Explained" },
  { id: 24, time: "04:09:20", title: "Concurrency Control, Dirty Reads & Deadlocks" },
  { id: 25, time: "04:18:10", title: "Database Indexing, B-Trees & Query Optimization" }
];

export const DBMS_TIMESTAMPS = RAW_DBMS_TIMESTAMPS.map((item) => {
  const sec = timeToSeconds(item.time);
  let categoryId = "fundamentals";
  let categoryLabel = "DB Concepts & Tables";

  if (item.id <= 7) {
    categoryId = "fundamentals";
    categoryLabel = "DB Concepts & Tables";
  } else if (item.id <= 14) {
    categoryId = "sql_basic";
    categoryLabel = "SQL DDL & Queries";
  } else if (item.id <= 20) {
    categoryId = "sql_advanced";
    categoryLabel = "Aggregates & Joins";
  } else {
    categoryId = "design";
    categoryLabel = "Normalization & ACID";
  }

  return {
    ...item,
    seconds: sec,
    categoryId,
    categoryLabel,
    youtubeUrl: `https://www.youtube.com/watch?v=HXV3zeQKqGY&t=${sec}s`
  };
});
