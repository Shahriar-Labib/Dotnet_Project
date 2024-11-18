"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * A title sub-component for Accordion component.
 */
var AccordionTitle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = (0, _clsx.default)((0, _lib.useKeyOnly)(active, 'active'), 'title', className);
  var rest = (0, _lib.getUnhandledProps)(AccordionTitle, props);
  var ElementType = (0, _lib.getElementType)(AccordionTitle, props);
  var iconValue = (0, _isNil2.default)(icon) ? 'dropdown' : icon;
  var handleClick = (0, _lib.useEventCallback)(function (e) {
    (0, _invoke2.default)(props, 'onClick', e, props);
  });

  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), children);
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), _Icon.default.create(iconValue, {
    autoGenerateKey: false
  }), content);
});

AccordionTitle.handledProps = ["active", "as", "children", "className", "content", "icon", "index", "onClick"];
AccordionTitle.displayName = 'AccordionTitle';
AccordionTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Whether or not the title is in the open state. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for Icon. */
  icon: _lib.customPropTypes.itemShorthand,

  /** AccordionTitle index inside Accordion. */
  index: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func
} : {};
AccordionTitle.create = (0, _lib.createShorthandFactory)(AccordionTitle, function (content) {
  return {
    content: content
  };
});
var _default = AccordionTitle;
exports.default = _default;