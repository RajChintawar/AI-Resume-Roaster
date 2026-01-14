"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.atsOnly = void 0;

var _resumeParser = require("../services/resumeParser.js");

var _atsEngine = require("../ats/ats.engine.js");

var atsOnly = function atsOnly(req, res) {
  var jobRole, file, resumeText, atsResult;
  return regeneratorRuntime.async(function atsOnly$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          jobRole = req.body.jobRole;
          file = req.file;

          if (file) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Resume file is required"
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _resumeParser.parseResume)(file.path));

        case 7:
          resumeText = _context.sent;
          // 2️⃣ Run ATS Autopsy (fast)
          atsResult = (0, _atsEngine.runATSAutopsy)({
            resumeText: resumeText,
            targetRole: jobRole || "Frontend Developer"
          }); // 3️⃣ Respond immediately

          res.json({
            message: "ATS Autopsy completed ☠️",
            ats: atsResult,
            resumeText: resumeText // IMPORTANT: used later for AI roast

          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("ATS ONLY ERROR:", _context.t0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.atsOnly = atsOnly;