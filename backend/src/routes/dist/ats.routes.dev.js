"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _atsController = require("../controllers/ats.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/**
 * POST /api/ats-autopsy
 * Body:
 * {
 *   resumeText: string,
 *   targetRole: string
 * }
 */


router.post("/ats-autopsy", _atsController.atsAutopsy); // sanity check (optional but useful)

router.get("/ats-autopsy", function (req, res) {
  res.send("ATS Autopsy is alive ☠️ Use POST, not GET.");
});
var _default = router;
exports["default"] = _default;