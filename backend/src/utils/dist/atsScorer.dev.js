"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateATSScore = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 1️⃣ helper FIRST
var extractKeywords = function extractKeywords(text) {
  var stopWords = ["and", "or", "the", "with", "to", "for", "of", "a", "in", "on", "is", "are", "as", "by", "this", "that", "an"];
  var words = text.replace(/[^a-zA-Z ]/g, " ").split(" ").map(function (w) {
    return w.trim();
  }).filter(function (w) {
    return w.length > 2;
  });

  var keywords = _toConsumableArray(new Set(words.filter(function (w) {
    return !stopWords.includes(w);
  })));

  return keywords;
}; // 2️⃣ main function AFTER


var calculateATSScore = function calculateATSScore(resumeText, jobDesc) {
  var resume = resumeText.toLowerCase();
  var jd = jobDesc.toLowerCase();
  var keywords = extractKeywords(jd);
  var matched = [];
  var missing = [];
  keywords.forEach(function (word) {
    if (resume.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });
  var score = Math.round(matched.length / keywords.length * 100);
  return {
    score: score,
    matchedKeywords: matched,
    missingKeywords: missing,
    totalKeywords: keywords.length
  };
};

exports.calculateATSScore = calculateATSScore;