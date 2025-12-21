// 1️⃣ helper FIRST
const extractKeywords = (text) => {
  const stopWords = [
    "and", "or", "the", "with", "to", "for", "of",
    "a", "in", "on", "is", "are", "as", "by",
    "this", "that", "an"
  ];

  const words = text
    .replace(/[^a-zA-Z ]/g, " ")
    .split(" ")
    .map(w => w.trim())
    .filter(w => w.length > 2);

  const keywords = [
    ...new Set(words.filter(w => !stopWords.includes(w)))
  ];

  return keywords;
};

// 2️⃣ main function AFTER
export const calculateATSScore = (resumeText, jobDesc) => {
  const resume = resumeText.toLowerCase();
  const jd = jobDesc.toLowerCase();

  const keywords = extractKeywords(jd);

  let matched = [];
  let missing = [];

  keywords.forEach((word) => {
    if (resume.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const score = Math.round(
    (matched.length / keywords.length) * 100
  );

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    totalKeywords: keywords.length,
  };
};
