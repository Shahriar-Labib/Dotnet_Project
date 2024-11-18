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

// Note: You technically only need the 'content' wrapper when there's an
// image. However, optionally wrapping it makes this function a lot more
// complicated and harder to read. Since always wrapping it doesn't affect
// the style in any way let's just do that.
//
// Note: To avoid requiring a wrapping div, we return an array here so to
// prevent rendering issues each node needs a unique key.
var defaultRenderer = function defaultRenderer(_ref) {
  var image = _ref.image,
      price = _ref.price,
      title = _ref.title,
      description = _ref.description;
  return [image && /*#__PURE__*/_react.default.createElement("div", {
    key: "image",
    className: "image"
  }, (0, _lib.createHTMLImage)(image, {
    autoGenerateKey: false
  })), /*#__PURE__*/_react.default.createElement("div", {
    key: "content",
    className: "content"
  }, price && /*#__PURE__*/_react.default.createElement("div", {
    className: "price"
  }, price), title && /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, title), description && /*#__PURE__*/_react.default.createElement("div", {
    className: "description"
  }, description))];
};

defaultRenderer.handledProps = [];

var SearchResult = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      className = props.className,
      renderer = props.renderer;

  var handleClick = function handleClick(e) {
    (0, _invoke2.default)(props, 'onClick', e, props);
  };

  var classes = (0, _clsx.default)((0, _lib.useKeyOnly)(active, 'active'), 'result', className);
  var rest = (0, _lib.getUnhandledProps)(SearchResult, props);
  var ElementType = (0, _lib.getElementType)(SearchResult, props); // Note: You technically only need the 'content' wrapper when there's an
  // image. However, optionally wrapping it makes this function a lot more
  // complicated and harder to read. Since always wrapping it doesn't affect
  // the style in any way let's just do that.

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), renderer(props));
});

SearchResult.handledProps = ["active", "as", "className", "content", "description", "id", "image", "onClick", "price", "renderer", "title"];
SearchResult.displayName = 'SearchResult';
SearchResult.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** The item currently selected by keyboard shortcut. */
  active: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Additional text with less emphasis. */
  description: _propTypes.default.string,

  /** A unique identifier. */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Add an image to the item. */
  image: _propTypes.default.string,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** Customized text for price. */
  price: _propTypes.default.string,

  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable result contents.
   */
  renderer: _propTypes.default.func,

  /** Display title. */
  title: _propTypes.default.string.isRequired
} : {};
SearchResult.defaultProps = {
  renderer: defaultRenderer
};
var _default = SearchResult;
exports.default = _default;