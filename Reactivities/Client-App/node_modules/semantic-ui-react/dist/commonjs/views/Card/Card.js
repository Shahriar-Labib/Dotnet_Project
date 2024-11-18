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

var _Image = _interopRequireDefault(require("../../elements/Image"));

var _CardContent = _interopRequireDefault(require("./CardContent"));

var _CardDescription = _interopRequireDefault(require("./CardDescription"));

var _CardGroup = _interopRequireDefault(require("./CardGroup"));

var _CardHeader = _interopRequireDefault(require("./CardHeader"));

var _CardMeta = _interopRequireDefault(require("./CardMeta"));

/**
 * A card displays site content in a manner similar to a playing card.
 */
var Card = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var centered = props.centered,
      children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      description = props.description,
      extra = props.extra,
      fluid = props.fluid,
      header = props.header,
      href = props.href,
      image = props.image,
      link = props.link,
      meta = props.meta,
      onClick = props.onClick,
      raised = props.raised;
  var classes = (0, _clsx.default)('ui', color, (0, _lib.useKeyOnly)(centered, 'centered'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOnly)(raised, 'raised'), 'card', className);
  var rest = (0, _lib.getUnhandledProps)(Card, props);
  var ElementType = (0, _lib.getElementType)(Card, props, function () {
    if (onClick) {
      return 'a';
    }
  });
  var handleClick = (0, _lib.useEventCallback)(function (e) {
    (0, _invoke2.default)(props, 'onClick', e, props);
  });

  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      href: href,
      onClick: handleClick,
      ref: ref
    }), children);
  }

  if (!_lib.childrenUtils.isNil(content)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      href: href,
      onClick: handleClick,
      ref: ref
    }), content);
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    href: href,
    onClick: handleClick,
    ref: ref
  }), _Image.default.create(image, {
    autoGenerateKey: false,
    defaultProps: {
      ui: false,
      wrapped: true
    }
  }), (description || header || meta) && /*#__PURE__*/_react.default.createElement(_CardContent.default, {
    description: description,
    header: header,
    meta: meta
  }), extra && /*#__PURE__*/_react.default.createElement(_CardContent.default, {
    extra: true
  }, extra));
});

Card.handledProps = ["as", "centered", "children", "className", "color", "content", "description", "extra", "fluid", "header", "href", "image", "link", "meta", "onClick", "raised"];
Card.displayName = 'Card';
Card.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A Card can center itself inside its container. */
  centered: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A Card can be formatted to display different colors. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: _lib.customPropTypes.itemShorthand,

  /** Shorthand for primary content of CardContent. */
  extra: _lib.customPropTypes.contentShorthand,

  /** A Card can be formatted to take up the width of its container. */
  fluid: _propTypes.default.bool,

  /** Shorthand for CardHeader. */
  header: _lib.customPropTypes.itemShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: _propTypes.default.string,

  /** A card can contain an Image component. */
  image: _lib.customPropTypes.itemShorthand,

  /** A card can be formatted to link to other content. */
  link: _propTypes.default.bool,

  /** Shorthand for CardMeta. */
  meta: _lib.customPropTypes.itemShorthand,

  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** A Card can be formatted to raise above the page. */
  raised: _propTypes.default.bool
} : {};
Card.Content = _CardContent.default;
Card.Description = _CardDescription.default;
Card.Group = _CardGroup.default;
Card.Header = _CardHeader.default;
Card.Meta = _CardMeta.default;
var _default = Card;
exports.default = _default;