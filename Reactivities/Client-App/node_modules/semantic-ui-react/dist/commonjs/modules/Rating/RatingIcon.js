"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * An internal icon sub-component for Rating component
 */
var RatingIcon = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      className = props.className,
      selected = props.selected;
  var classes = (0, _clsx.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(selected, 'selected'), 'icon', className);
  var rest = (0, _lib.getUnhandledProps)(RatingIcon, props);
  var ElementType = (0, _lib.getElementType)(RatingIcon, props);

  var handleClick = function handleClick(e) {
    (0, _invoke2.default)(props, 'onClick', e, props);
  };

  var handleKeyUp = function handleKeyUp(e) {
    (0, _invoke2.default)(props, 'onKeyUp', e, props);

    switch (_keyboardKey.default.getCode(e)) {
      case _keyboardKey.default.Enter:
      case _keyboardKey.default.Spacebar:
        e.preventDefault();
        (0, _invoke2.default)(props, 'onClick', e, props);
        break;

      default:
    }
  };

  var handleMouseEnter = function handleMouseEnter(e) {
    (0, _invoke2.default)(props, 'onMouseEnter', e, props);
  };

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({
    role: "radio"
  }, rest, {
    className: classes,
    onClick: handleClick,
    onKeyUp: handleKeyUp,
    onMouseEnter: handleMouseEnter,
    ref: ref
  }));
});

RatingIcon.handledProps = ["active", "as", "className", "index", "onClick", "onKeyUp", "onMouseEnter", "selected"];
RatingIcon.displayName = 'RatingIcon';
RatingIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Indicates activity of an icon. */
  active: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** An index of icon inside Rating. */
  index: _propTypes.default.number,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter: _propTypes.default.func,

  /** Indicates selection of an icon. */
  selected: _propTypes.default.bool
} : {};
RatingIcon.defaultProps = {
  as: 'i'
};
var _default = RatingIcon;
exports.default = _default;