"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _atsRoutes = _interopRequireDefault(require("./routes/ats.routes.js"));

var _roastRoutes = _interopRequireDefault(require("./routes/roast.routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json()); // routes

app.use("/api", _atsRoutes["default"]);
app.use("/api", _roastRoutes["default"]); // health check

app.get("/", function (req, res) {
  res.send("Backend alive. Ready to roast resumes 🔥");
}); // 🔴 Multer / body parsing error handler

app.use(function (err, req, res, next) {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }

  next();
});
var _default = app;
exports["default"] = _default;