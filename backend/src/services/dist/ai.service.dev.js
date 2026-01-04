"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRoast = void 0;

var _openai = _interopRequireDefault(require("openai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var openai;

var getClient = function getClient() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    openai = new _openai["default"]({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  return openai;
};

var generateRoast = function generateRoast(_ref) {
  var resumeText, _ref$ats, ats, _ref$jobRole, jobRole, _ref$jobDesc, jobDesc, client, roleContext, atsContext, jdContext, prompt, response;

  return regeneratorRuntime.async(function generateRoast$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          resumeText = _ref.resumeText, _ref$ats = _ref.ats, ats = _ref$ats === void 0 ? null : _ref$ats, _ref$jobRole = _ref.jobRole, jobRole = _ref$jobRole === void 0 ? "" : _ref$jobRole, _ref$jobDesc = _ref.jobDesc, jobDesc = _ref$jobDesc === void 0 ? "" : _ref$jobDesc;
          client = getClient(); // 🧠 Context building (THIS IS THE SMART PART)

          roleContext = jobRole ? "Target Job Role: ".concat(jobRole) : "No specific job role provided";
          atsContext = ats ? "\nATS Score: ".concat(ats.atsScore, "\nATS Verdict: ").concat(ats.verdict, "\n\nATS Flags:\n").concat(ats.flags.length > 0 ? ats.flags.map(function (f) {
            return "- ".concat(f.code, ": ").concat(f.message);
          }).join("\n") : "No major ATS issues detected.", "\n") : "\nNo ATS data provided.\nDo a general resume evaluation instead.\n";
          jdContext = jobDesc ? "Job Description was provided and used for analysis." : "No job description provided.";
          prompt = "\nYou are a brutally honest technical recruiter.\n\n".concat(roleContext, "\n").concat(jdContext, "\n").concat(atsContext, "\n\nResume Content:\n\"\"\"\n").concat(resumeText.slice(0, 1500), "\n\"\"\"\n\nRules:\nAct as an Indian recruiter for MNC's or startup.\nGive a clear verdict what is fault or mistake in the resume which would your chances to get rejected.\nIf rejected, list the TOP 3 reason in breif and to the point.\nGive advice for improvement check must be two or one page what is ideal and all.\n\n- Output ONLY valid JSON in this format:\n\n{\n  \"roast\": [\n    \"Point 1\",\n    \"Point 2\",\n    \"Point 3\"\n        \"Point 4\"\n\n  ],\n  \"summary\": \"One-line verdict\"\n}\n");
          _context.next = 8;
          return regeneratorRuntime.awrap(client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.7
          }));

        case 8:
          response = _context.sent;
          return _context.abrupt("return", JSON.parse(response.choices[0].message.content));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.generateRoast = generateRoast;