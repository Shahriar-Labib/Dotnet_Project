"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.setRef = setRef;
exports.default = useMergedRefs;

var React = _interopRequireWildcard(require("react"));

/**
 * Assigns a value to a React ref.
 *
 * @param {React.Ref} ref
 * @param {HTMLElement} value
 */
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
}
/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs.
 *
 * @param {React.Ref} refA
 * @param {React.Ref} refB
 *
 * @return {React.Ref} A function with an attached "current" prop, so that it can be treated like a React.RefObject.
 */


function useMergedRefs(refA, refB) {
  var mergedCallback = React.useCallback(function (value) {
    // Update the "current" prop hanging on the function.
    mergedCallback.current = value;
    setRef(refA, value);
    setRef(refB, value);
  }, [refA, refB]);
  return mergedCallback;
}