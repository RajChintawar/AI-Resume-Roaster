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
  var resumeText, ats, jobRole, client, prompt, response;
  return regeneratorRuntime.async(function generateRoast$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          resumeText = _ref.resumeText, ats = _ref.ats, jobRole = _ref.jobRole;
          client = getClient();
          prompt = "\nYou are a brutally honest technical recruiter.\n\nJob Role: ".concat(jobRole, "\nATS Score: ").concat(ats.score, "%\n\nMissing Keywords: ").concat(ats.missingKeywords.join(", ") || "None", "\n\nResume Content:\n\"\"\"\n").concat(resumeText.slice(0, 3000), "\n\"\"\"\n\nRules:\n- Be harsh but constructive\n- No personal insults\n- Focus on skills, experience, and clarity\n- Output ONLY valid JSON in this format:\n\n{\n  \"roast\": [\"Point 1\", \"Point 2\", \"Point 3\"],\n  \"summary\": \"One-line verdict\"\n}\n");
          _context.next = 5;
          return regeneratorRuntime.awrap(client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.7
          }));

        case 5:
          response = _context.sent;
          console.log("ENV KEY PRESENT:", !!process.env.OPENAI_API_KEY);
          return _context.abrupt("return", JSON.parse(response.choices[0].message.content));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.generateRoast = generateRoast;