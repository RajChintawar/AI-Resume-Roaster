"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.atsAutopsy = void 0;

var _atsEngine = require("../ats/ats.engine.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var atsAutopsy = function atsAutopsy(req, res) {
  try {
    var _req$body = req.body,
        resumeText = _req$body.resumeText,
        targetRole = _req$body.targetRole; // 1️⃣ Input validation (minimal, not dramatic)

    if (!resumeText || typeof resumeText !== "string") {
      return res.status(400).json({
        error: "resumeText is required and must be a string"
      });
    }

    if (!targetRole || typeof targetRole !== "string") {
      return res.status(400).json({
        error: "targetRole is required and must be a string"
      });
    } // 2️⃣ Run ATS Autopsy (the judge)


    var result = (0, _atsEngine.runATSAutopsy)({
      resumeText: resumeText,
      targetRole: targetRole
    }); // 3️⃣ Send response

    return res.json(_objectSpread({
      message: "ATS Autopsy completed ☠️"
    }, result));
  } catch (err) {
    console.error("ATS AUTOPSY ERROR:", err);
    return res.status(500).json({
      error: "ATS engine failed. Resume survived longer than expected."
    });
  }
};

exports.atsAutopsy = atsAutopsy;