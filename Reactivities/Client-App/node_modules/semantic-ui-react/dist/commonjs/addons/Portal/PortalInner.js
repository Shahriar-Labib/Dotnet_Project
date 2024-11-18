"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _lib = require("../../lib");

var _usePortalElement = _interopRequireDefault(require("./usePortalElement"));

/**
 * An inner component that allows you to render children outside their parent.
 */
var PortalInner = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var handleMount = (0, _lib.useEventCallback)(function () {
    return (0, _invoke2.default)(props, 'onMount', null, props);
  });
  var handleUnmount = (0, _lib.useEventCallback)(function () {
    return (0, _invoke2.default)(props, 'onUnmount', null, props);
  });
  var element = (0, _usePortalElement.default)(props.children, ref);

  _react.default.useEffect(function () {
    handleMount();
    return function () {
      handleUnmount();
    };
  }, []);

  if (!(0, _lib.isBrowser)()) {
    return null;
  }

  return /*#__PURE__*/(0, _reactDom.createPortal)(element, props.mountNode || document.body);
});

PortalInner.handledProps = ["children", "mountNode", "onMount", "onUnmount"];
PortalInner.displayName = 'PortalInner';
PortalInner.propTypes = {
  /** Primary content. */
  children: _propTypes.default.node.isRequired,

  /** The node where the portal should mount. */
  mountNode: _propTypes.default.any,

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: _propTypes.default.func,

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: _propTypes.default.func
};
var _default = PortalInner;
exports.default = _default;