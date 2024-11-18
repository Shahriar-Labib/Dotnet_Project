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
 * An inner element for a Dimmer.
 */
var DimmerInner = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      disabled = props.disabled,
      inverted = props.inverted,
      page = props.page,
      simple = props.simple,
      verticalAlign = props.verticalAlign;
  var containerRef = (0, _lib.useMergedRefs)(ref, _react.default.useRef());

  var contentRef = _react.default.useRef();

  (0, _lib.useIsomorphicLayoutEffect)(function () {
    var _containerRef$current;

    if (!((_containerRef$current = containerRef.current) == null ? void 0 : _containerRef$current.style)) {
      return;
    }

    if (active) {
      containerRef.current.style.setProperty('display', 'flex', 'important');
    } else {
      containerRef.current.style.removeProperty('display');
    }
  }, [active]);

  var handleClick = function handleClick(e) {
    (0, _invoke2.default)(props, 'onClick', e, props);

    if (contentRef.current !== e.target && (0, _lib.doesNodeContainClick)(contentRef.current, e)) {
      return;
    }

    (0, _invoke2.default)(props, 'onClickOutside', e, props);
  };

  var classes = (0, _clsx.default)('ui', (0, _lib.useKeyOnly)(active, 'active transition visible'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(page, 'page'), (0, _lib.useKeyOnly)(simple, 'simple'), (0, _lib.useVerticalAlignProp)(verticalAlign), 'dimmer', className);
  var rest = (0, _lib.getUnhandledProps)(DimmerInner, props);
  var ElementType = (0, _lib.getElementType)(DimmerInner, props);
  var childrenContent = _lib.childrenUtils.isNil(children) ? content : children;
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: containerRef
  }), childrenContent && /*#__PURE__*/_react.default.createElement("div", {
    className: "content",
    ref: contentRef
  }, childrenContent));
});

DimmerInner.handledProps = ["active", "as", "children", "className", "content", "disabled", "inverted", "onClick", "onClickOutside", "page", "simple", "verticalAlign"];
DimmerInner.displayName = 'DimmerInner';
DimmerInner.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** An active dimmer will dim its parent container. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A disabled dimmer cannot be activated */
  disabled: _propTypes.default.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside: _propTypes.default.func,

  /** A dimmer can be formatted to have its colors inverted. */
  inverted: _propTypes.default.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: _propTypes.default.bool,

  /** A dimmer can be controlled with simple prop. */
  simple: _propTypes.default.bool,

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign: _propTypes.default.oneOf(['bottom', 'top'])
} : {};
var _default = DimmerInner;
exports.default = _default;