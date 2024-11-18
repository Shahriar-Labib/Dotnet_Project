"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A section sub-component for Breadcrumb component.
 */
var BreadcrumbSection = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      href = props.href,
      link = props.link,
      onClick = props.onClick;
  var classes = (0, _clsx.default)((0, _lib.useKeyOnly)(active, 'active'), 'section', className);
  var rest = (0, _lib.getUnhandledProps)(BreadcrumbSection, props);
  var ElementType = (0, _lib.getElementType)(BreadcrumbSection, props, function () {
    if (link || onClick) return 'a';
  });
  var handleClick = (0, _lib.useEventCallback)(function (e) {
    return (0, _invoke2.default)(props, 'onClick', e, props);
  });
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    href: href,
    onClick: handleClick,
    ref: ref
  }), _lib.childrenUtils.isNil(children) ? content : children);
});

BreadcrumbSection.handledProps = ["active", "as", "children", "className", "content", "href", "link", "onClick"];
BreadcrumbSection.displayName = 'BreadcrumbSection';
BreadcrumbSection.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Style as the currently active section. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['link']), _propTypes.default.string]),

  /** Render as an `a` tag instead of a `div`. */
  link: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['href']), _propTypes.default.bool]),

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func
} : {};
BreadcrumbSection.create = (0, _lib.createShorthandFactory)(BreadcrumbSection, function (content) {
  return {
    content: content,
    link: true
  };
});
var _default = BreadcrumbSection;
exports.default = _default;