"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Image = _interopRequireDefault(require("../Image"));

var _ListContent = _interopRequireDefault(require("./ListContent"));

var _ListDescription = _interopRequireDefault(require("./ListDescription"));

var _ListHeader = _interopRequireDefault(require("./ListHeader"));

var _ListIcon = _interopRequireDefault(require("./ListIcon"));

/**
 * A list item can contain a set of items.
 */
var ListItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      disabled = props.disabled,
      header = props.header,
      icon = props.icon,
      image = props.image,
      value = props.value;
  var ElementType = (0, _lib.getElementType)(ListItem, props);
  var classes = (0, _clsx.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(ElementType !== 'li', 'item'), className);
  var rest = (0, _lib.getUnhandledProps)(ListItem, props);
  var handleClick = (0, _lib.useEventCallback)(function (e) {
    if (!disabled) {
      (0, _invoke2.default)(props, 'onClick', e, props);
    }
  });
  var valueProp = ElementType === 'li' ? {
    value: value
  } : {
    'data-value': value
  };

  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, valueProp, {
      role: "listitem"
    }, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), children);
  }

  var iconElement = _ListIcon.default.create(icon, {
    autoGenerateKey: false
  });

  var imageElement = _Image.default.create(image, {
    autoGenerateKey: false
  }); // See description of `content` prop for explanation about why this is necessary.


  if (! /*#__PURE__*/(0, _react.isValidElement)(content) && (0, _isPlainObject2.default)(content)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, valueProp, {
      role: "listitem"
    }, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), iconElement || imageElement, _ListContent.default.create(content, {
      autoGenerateKey: false,
      defaultProps: {
        header: header,
        description: description
      }
    }));
  }

  var headerElement = _ListHeader.default.create(header, {
    autoGenerateKey: false
  });

  var descriptionElement = _ListDescription.default.create(description, {
    autoGenerateKey: false
  });

  if (iconElement || imageElement) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, valueProp, {
      role: "listitem"
    }, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), iconElement || imageElement, (content || headerElement || descriptionElement) && /*#__PURE__*/_react.default.createElement(_ListContent.default, null, headerElement, descriptionElement, content));
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, valueProp, {
    role: "listitem"
  }, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), headerElement, descriptionElement, content);
});

ListItem.handledProps = ["active", "as", "children", "className", "content", "description", "disabled", "header", "icon", "image", "onClick", "value"];
ListItem.displayName = 'ListItem';
ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A list item can active. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /**
   * Shorthand for primary content.
   *
   * Heads up!
   *
   * This is handled slightly differently than the typical `content` prop since
   * the wrapping ListContent is not used when there's no icon or image.
   *
   * If you pass content as:
   * - an element/literal, it's treated as the sibling node to
   * header/description (whether wrapped in Item.Content or not).
   * - a props object, it forces the presence of Item.Content and passes those
   * props to it. If you pass a content prop within that props object, it
   * will be treated as the sibling node to header/description.
   */
  content: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ListDescription. */
  description: _lib.customPropTypes.itemShorthand,

  /** A list item can disabled. */
  disabled: _propTypes.default.bool,

  /** Shorthand for ListHeader. */
  header: _lib.customPropTypes.itemShorthand,

  /** Shorthand for ListIcon. */
  icon: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['image']), _lib.customPropTypes.itemShorthand]),

  /** Shorthand for Image. */
  image: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['icon']), _lib.customPropTypes.itemShorthand]),

  /** A ListItem can be clicked */
  onClick: _propTypes.default.func,

  /** A value for an ordered list. */
  value: _propTypes.default.string
} : {};
ListItem.create = (0, _lib.createShorthandFactory)(ListItem, function (content) {
  return {
    content: content
  };
});
var _default = ListItem;
exports.default = _default;