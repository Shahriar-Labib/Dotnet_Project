import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { createHTMLImage, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib'; // Note: You technically only need the 'content' wrapper when there's an
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
  return [image && /*#__PURE__*/React.createElement("div", {
    key: "image",
    className: "image"
  }, createHTMLImage(image, {
    autoGenerateKey: false
  })), /*#__PURE__*/React.createElement("div", {
    key: "content",
    className: "content"
  }, price && /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, price), title && /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "description"
  }, description))];
};

defaultRenderer.handledProps = [];
var SearchResult = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      className = props.className,
      renderer = props.renderer;

  var handleClick = function handleClick(e) {
    _invoke(props, 'onClick', e, props);
  };

  var classes = cx(useKeyOnly(active, 'active'), 'result', className);
  var rest = getUnhandledProps(SearchResult, props);
  var ElementType = getElementType(SearchResult, props); // Note: You technically only need the 'content' wrapper when there's an
  // image. However, optionally wrapping it makes this function a lot more
  // complicated and harder to read. Since always wrapping it doesn't affect
  // the style in any way let's just do that.

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), renderer(props));
});
SearchResult.handledProps = ["active", "as", "className", "content", "description", "id", "image", "onClick", "price", "renderer", "title"];
SearchResult.displayName = 'SearchResult';
SearchResult.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The item currently selected by keyboard shortcut. */
  active: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Additional text with less emphasis. */
  description: PropTypes.string,

  /** A unique identifier. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Add an image to the item. */
  image: PropTypes.string,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** Customized text for price. */
  price: PropTypes.string,

  /**
   * Renders the result contents.
   *
   * @param {object} props - The SearchResult props object.
   * @returns {*} - Renderable result contents.
   */
  renderer: PropTypes.func,

  /** Display title. */
  title: PropTypes.string.isRequired
} : {};
SearchResult.defaultProps = {
  renderer: defaultRenderer
};
export default SearchResult;