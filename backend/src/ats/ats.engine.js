import {
  VERDICT_THRESHOLDS,
  STRUCTURE_RULES,
  ROLE_KEYWORDS,
  KEYWORD_MATCH_RULES,
  PROJECT_RULES,
  SKILLS_RULES,
  GENERIC_PHRASES,
  ACTION_VERBS,
  BUZZWORD_RULES
} from "./ats.rules.js";

// ==============================
// Helpers
// ==============================
const normalize = (text) => text.toLowerCase();

const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;

const countKeywordMatches = (text, keywords) =>
  keywords.filter((k) => text.includes(k)).length;

const containsAny = (text, list) =>
  list.some((item) => text.includes(item));

const extractSection = (text, section) => {
  const regex = new RegExp(`${section}[\\s\\S]*?(?=\\n[A-Z]|$)`, "i");
  const match = text.match(regex);
  return match ? match[0] : null;
};

// ==============================
// ATS AUTOPSY ENGINE
// ==============================
export const runATSAutopsy = ({ resumeText, targetRole }) => {
  let score = 100;
  const flags = [];

  const text = normalize(resumeText);
  const totalWords = wordCount(text);

  // ------------------------------
  // 1️⃣ STRUCTURE CHECKS
  // ------------------------------
  STRUCTURE_RULES.forEach((rule) => {
    if (rule.section && !text.includes(rule.section)) {
      score -= rule.penalty;
      flags.push({
        severity: rule.severity,
        code: rule.code,
        message: rule.message
      });
    }

    if (rule.minWords && totalWords < rule.minWords) {
      score -= rule.penalty;
      flags.push({
        severity: rule.severity,
        code: rule.code,
        message: rule.message
      });
    }

    if (rule.maxWords && totalWords > rule.maxWords) {
      score -= rule.penalty;
      flags.push({
        severity: rule.severity,
        code: rule.code,
        message: rule.message
      });
    }
  });

  // ------------------------------
  // 2️⃣ ROLE KEYWORD MATCH
  // ------------------------------
  const keywords = ROLE_KEYWORDS[targetRole] || [];
  if (keywords.length > 0) {
    const matched = countKeywordMatches(text, keywords);
    const matchPercent = (matched / keywords.length) * 100;

    if (matchPercent < KEYWORD_MATCH_RULES.LOW_MATCH.minPercentage || matchPercent < 40) {
      score -= KEYWORD_MATCH_RULES.LOW_MATCH.penalty;
      flags.push({
        severity: KEYWORD_MATCH_RULES.LOW_MATCH.severity,
        code: KEYWORD_MATCH_RULES.LOW_MATCH.code,
        message: KEYWORD_MATCH_RULES.LOW_MATCH.message
      });
    } else if (matchPercent < KEYWORD_MATCH_RULES.MEDIUM_MATCH.minPercentage) {
      score -= KEYWORD_MATCH_RULES.MEDIUM_MATCH.penalty;
      flags.push({
        severity: KEYWORD_MATCH_RULES.MEDIUM_MATCH.severity,
        code: KEYWORD_MATCH_RULES.MEDIUM_MATCH.code,
        message: KEYWORD_MATCH_RULES.MEDIUM_MATCH.message
      });
    }
  }

  // ------------------------------
  // 3️⃣ PROJECT QUALITY CHECKS
  // ------------------------------
  const projectSection = extractSection(text, "projects");

  if (projectSection) {
    const hasNumbers = /\d+/.test(projectSection);
    if (!hasNumbers) {
      const rule = PROJECT_RULES.find(r => r.code === "NO_METRICS");
      score -= rule.penalty;
      flags.push(rule);
    }

    const projectWordCount = wordCount(projectSection);
    if (projectWordCount < PROJECT_RULES.find(r => r.code === "WEAK_PROJECT_DESC").minWords) {
      const rule = PROJECT_RULES.find(r => r.code === "WEAK_PROJECT_DESC");
      score -= rule.penalty;
      flags.push(rule);
    }

    const projectCount = projectSection.split("\n").filter(l => l.trim()).length;
    if (projectCount > PROJECT_RULES.find(r => r.code === "TOO_MANY_PROJECTS").maxProjects) {
      const rule = PROJECT_RULES.find(r => r.code === "TOO_MANY_PROJECTS");
      score -= rule.penalty;
      flags.push(rule);
    }
  }

  // ------------------------------
  // 4️⃣ SKILLS SANITY CHECKS
  // ------------------------------
  const skillsSection = extractSection(text, "skills");

  if (skillsSection) {
    const skills = skillsSection.split(/,|\n/).map(s => s.trim()).filter(Boolean);

    if (skills.length > SKILLS_RULES.find(r => r.code === "TOO_MANY_SKILLS").maxSkills) {
      const rule = SKILLS_RULES.find(r => r.code === "TOO_MANY_SKILLS");
      score -= rule.penalty;
      flags.push(rule);
    }

    if (skills.length < SKILLS_RULES.find(r => r.code === "TOO_FEW_SKILLS").minSkills) {
      const rule = SKILLS_RULES.find(r => r.code === "TOO_FEW_SKILLS");
      score -= rule.penalty;
      flags.push(rule);
    }

    const hasTechSkill = ROLE_KEYWORDS[targetRole]?.some(k =>
      skillsSection.includes(k)
    );

    if (!hasTechSkill) {
      const rule = SKILLS_RULES.find(r => r.code === "ONLY_SOFT_SKILLS");
      score -= rule.penalty;
      flags.push(rule);
    }
  }

  // ------------------------------
  // 5️⃣ BUZZWORD & ACTION VERBS
  // ------------------------------
  if (containsAny(text, GENERIC_PHRASES)) {
    const rule = BUZZWORD_RULES.find(r => r.code === "GENERIC_PHRASES");
    score -= rule.penalty;
    flags.push(rule);
  }

  if (!containsAny(text, ACTION_VERBS)) {
    const rule = BUZZWORD_RULES.find(r => r.code === "NO_ACTION_VERBS");
    score -= rule.penalty;
    flags.push(rule);
  }

  // ------------------------------
  // FINAL VERDICT
  // ------------------------------
  score = Math.max(score, 0);

  const verdict =
    score >= VERDICT_THRESHOLDS.PASS
      ? "PASS"
      : score >= VERDICT_THRESHOLDS.RISK
      ? "RISK"
      : "FAIL";

  return {
    atsScore: score,
    verdict,
    flags
  };
};
