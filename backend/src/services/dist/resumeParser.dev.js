"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResume = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mammoth = _interopRequireDefault(require("mammoth"));

var pdfjs = _interopRequireWildcard(require("pdfjs-dist/legacy/build/pdf.mjs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parseResume = function parseResume(filePath) {
  var ext, data, pdf, text, i, page, content, result;
  return regeneratorRuntime.async(function parseResume$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ext = _path["default"].extname(filePath).toLowerCase(); // PDF parsing

          if (!(ext === ".pdf")) {
            _context.next = 20;
            break;
          }

          data = new Uint8Array(_fs["default"].readFileSync(filePath));
          _context.next = 5;
          return regeneratorRuntime.awrap(pdfjs.getDocument({
            data: data
          }).promise);

        case 5:
          pdf = _context.sent;
          text = "";
          i = 1;

        case 8:
          if (!(i <= pdf.numPages)) {
            _context.next = 19;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(pdf.getPage(i));

        case 11:
          page = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(page.getTextContent());

        case 14:
          content = _context.sent;
          text += content.items.map(function (item) {
            return item.str;
          }).join(" ");

        case 16:
          i++;
          _context.next = 8;
          break;

        case 19:
          return _context.abrupt("return", text);

        case 20:
          if (!(ext === ".doc" || ext === ".docx")) {
            _context.next = 25;
            break;
          }

          _context.next = 23;
          return regeneratorRuntime.awrap(_mammoth["default"].extractRawText({
            path: filePath
          }));

        case 23:
          result = _context.sent;
          return _context.abrupt("return", result.value);

        case 25:
          throw new Error("Unsupported file format");

        case 26:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.parseResume = parseResume;