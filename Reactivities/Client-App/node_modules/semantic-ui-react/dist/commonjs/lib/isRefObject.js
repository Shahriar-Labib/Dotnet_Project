"use strict";

exports.__esModule = true;
exports.default = isRefObject;

/** Checks that the passed object is a valid React ref object. */
function isRefObject(ref) {
  // https://github.com/facebook/react/blob/v16.8.2/packages/react-reconciler/src/ReactFiberCommitWork.js#L665
  // eslint-disable-next-line no-prototype-builtins
  return ref !== null && typeof ref === 'object' && ref.hasOwnProperty('current');
}