"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = useEventCallback;

var React = _interopRequireWildcard(require("react"));

var _useIsomorphicLayoutEffect = _interopRequireDefault(require("./useIsomorphicLayoutEffect"));

/**
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 * Modified `useCallback` that can be used when dependencies change too frequently. Can occur when:
 * e.g. user props are depedencies which could change on every render
 * e.g. volatile values (i.e. useState/useDispatch) are dependencies which could change frequently
 *
 * This should not be used often, but can be a useful re-render optimization since the callback is
 * a ref and will not be invalidated between rerenders.
 *
 * @param {Function} fn The callback function that will be used
 */
function useEventCallback(fn) {
  var callbackRef = React.useRef(function () {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Cannot call an event handler while rendering...');
    }
  });
  (0, _useIsomorphicLayoutEffect.default)(function () {
    callbackRef.current = fn;
  }, [fn]);
  return React.useCallback(function () {
    var callback = callbackRef.current;
    return callback.apply(void 0, arguments);
  }, [callbackRef]);
}