"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = useForceUpdate;

var React = _interopRequireWildcard(require("react"));

/**
 * Returns a callback that causes force render of a component.
 */
function useForceUpdate() {
  return React.useReducer(function (x) {
    return x + 1;
  }, 0)[1];
}