"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthentication;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthentication(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');
  const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
  const {
    sub
  } = decoded;
  request.user = {
    id: sub
  };
  return next();
}