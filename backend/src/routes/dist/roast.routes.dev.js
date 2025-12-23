"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("../config/multer.js"));

var _roastController = require("../controllers/roast.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import multer from "multer";
// const upload = multer({ dest: "uploads/" });
var router = _express["default"].Router(); // POST /api/roast


router.post("/roast", _multer["default"].single("resume"), _roastController.roastResume);
router.get("/roast", function (req, res) {
  res.send("Roast API is alive. Use POST, not GET 😈");
});
var _default = router;
exports["default"] = _default;