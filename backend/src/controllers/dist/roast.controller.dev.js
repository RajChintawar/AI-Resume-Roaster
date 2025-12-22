"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roastResume = void 0;

var _resumeParser = require("../services/resumeParser.js");

var _atsScorer = require("../utils/atsScorer.js");

var _aiService = require("../services/ai.service.js");

var roastResume = function roastResume(req, res) {
  var _req$body, jobRole, jobDesc, file, resumeText, atsResult, aiResult;

  return regeneratorRuntime.async(function roastResume$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, jobRole = _req$body.jobRole, jobDesc = _req$body.jobDesc;
          file = req.file;

          if (!(!file || !jobRole || !jobDesc)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Resume, job role, and job description are required"
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _resumeParser.parseResume)(file.path));

        case 7:
          resumeText = _context.sent;
          atsResult = (0, _atsScorer.calculateATSScore)(resumeText, jobDesc);
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _aiService.generateRoast)({
            resumeText: resumeText,
            ats: atsResult,
            jobRole: jobRole
          }));

        case 11:
          aiResult = _context.sent;
          res.json({
            message: "Resume roasted successfully 😈",
            ats: atsResult,
            roast: aiResult.roast,
            summary: aiResult.summary
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.roastResume = roastResume;