"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BUZZWORD_RULES = exports.ACTION_VERBS = exports.GENERIC_PHRASES = exports.SKILLS_RULES = exports.PROJECT_RULES = exports.KEYWORD_MATCH_RULES = exports.ROLE_KEYWORDS = exports.STRUCTURE_RULES = exports.VERDICT_THRESHOLDS = void 0;
// ATS Autopsy – Rules & Weights
// Cold. Deterministic. No feelings.
// ==============================
// Verdict Thresholds
// ==============================
var VERDICT_THRESHOLDS = {
  PASS: 75,
  RISK: 50
}; // ==============================
// Structural Rules
// ==============================

exports.VERDICT_THRESHOLDS = VERDICT_THRESHOLDS;
var STRUCTURE_RULES = [{
  code: "MISSING_SKILLS",
  section: "skills",
  penalty: 20,
  severity: "critical",
  message: "Skills section not detected"
}, {
  code: "MISSING_PROJECTS",
  section: "projects",
  penalty: 15,
  severity: "critical",
  message: "Projects section not detected"
}, {
  code: "MISSING_EDUCATION",
  section: "education",
  penalty: 10,
  severity: "medium",
  message: "Education section not detected"
}, {
  code: "TOO_SHORT",
  minWords: 250,
  penalty: 10,
  severity: "medium",
  message: "Resume content is too short for ATS screening"
}, {
  code: "TOO_LONG",
  maxWords: 1200,
  penalty: 5,
  severity: "low",
  message: "Resume content is too long and may be truncated by ATS"
}]; // ==============================
// Role-Based Keywords
// ==============================

exports.STRUCTURE_RULES = STRUCTURE_RULES;
var ROLE_KEYWORDS = {
  "Frontend Developer": ["react", "javascript", "html", "css", "frontend", "ui", "redux", "responsive"],
  "Backend Developer": ["node", "express", "api", "database", "backend", "sql", "mongodb"],
  "Full Stack Developer": ["react", "node", "express", "api", "database", "javascript", "frontend", "backend"]
}; // ==============================
// Keyword Match Rules
// ==============================

exports.ROLE_KEYWORDS = ROLE_KEYWORDS;
var KEYWORD_MATCH_RULES = {
  HIGH_MATCH: {
    minPercentage: 70,
    penalty: 0
  },
  MEDIUM_MATCH: {
    minPercentage: 40,
    penalty: 15,
    severity: "medium",
    code: "LOW_KEYWORD_MATCH",
    message: "Moderate match for role-specific keywords"
  },
  LOW_MATCH: {
    penalty: 25,
    severity: "critical",
    code: "VERY_LOW_KEYWORD_MATCH",
    message: "Low match for role-specific keywords"
  }
}; // ==============================
// Project Quality Rules
// ==============================

exports.KEYWORD_MATCH_RULES = KEYWORD_MATCH_RULES;
var PROJECT_RULES = [{
  code: "NO_METRICS",
  penalty: 10,
  severity: "medium",
  message: "Projects lack measurable impact (numbers, %, scale)"
}, {
  code: "WEAK_PROJECT_DESC",
  minWords: 15,
  penalty: 8,
  severity: "medium",
  message: "Project descriptions are too shallow"
}, {
  code: "TOO_MANY_PROJECTS",
  maxProjects: 6,
  penalty: 5,
  severity: "low",
  message: "Too many projects listed — ATS prefers relevance"
}]; // ==============================
// Skills Section Sanity Rules
// ==============================

exports.PROJECT_RULES = PROJECT_RULES;
var SKILLS_RULES = [{
  code: "TOO_MANY_SKILLS",
  maxSkills: 20,
  penalty: 8,
  severity: "medium",
  message: "Too many skills listed — looks unfocused to ATS"
}, {
  code: "TOO_FEW_SKILLS",
  minSkills: 5,
  penalty: 5,
  severity: "low",
  message: "Too few skills listed for effective screening"
}, {
  code: "ONLY_SOFT_SKILLS",
  penalty: 15,
  severity: "critical",
  message: "Skills section lacks technical keywords"
}]; // ==============================
// Generic / Buzzword Detection
// ==============================

exports.SKILLS_RULES = SKILLS_RULES;
var GENERIC_PHRASES = ["hardworking", "passionate", "quick learner", "self motivated", "team player"];
exports.GENERIC_PHRASES = GENERIC_PHRASES;
var ACTION_VERBS = ["built", "developed", "implemented", "designed", "created", "optimized"];
exports.ACTION_VERBS = ACTION_VERBS;
var BUZZWORD_RULES = [{
  code: "GENERIC_PHRASES",
  penalty: 5,
  severity: "low",
  message: "Resume contains generic, low-signal phrases"
}, {
  code: "NO_ACTION_VERBS",
  penalty: 5,
  severity: "low",
  message: "Lack of strong action verbs in experience/projects"
}];
exports.BUZZWORD_RULES = BUZZWORD_RULES;