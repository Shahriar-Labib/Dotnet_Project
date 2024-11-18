"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _startCase2 = _interopRequireDefault(require("lodash/startCase"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * A menu can contain an item.
 */
var MenuItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      disabled = props.disabled,
      fitted = props.fitted,
      header = props.header,
      icon = props.icon,
      link = props.link,
      name = props.name,
      onClick = props.onClick,
      position = props.position;
  var classes = (0, _clsx.default)(color, position, (0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(icon === true || icon && !(name || content), 'icon'), (0, _lib.useKeyOnly)(header, 'header'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOrValueAndKey)(fitted, 'fitted'), 'item', className);
  var ElementType = (0, _lib.getElementType)(MenuItem, props, function () {
    if (onClick) return 'a';
  });
  var rest = (0, _lib.getUnhandledProps)(MenuItem, props);
  var handleClick = (0, _lib.useEventCallback)(function (e) {
    if (!disabled) {
      (0, _invoke2.default)(props, 'onClick', e, props);
    }
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
  }), _Icon.default.create(icon, {
    autoGenerateKey: false
  }), _lib.childrenUtils.isNil(content) ? (0, _startCase2.default)(name) : content);
});

MenuItem.handledProps = ["active", "as", "children", "className", "color", "content", "disabled", "fitted", "header", "icon", "index", "link", "name", "onClick", "position"];
MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A menu item can be active. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Additional colors can be specified. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A menu item can be disabled. */
  disabled: _propTypes.default.bool,

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['horizontally', 'vertically'])]),

  /** A menu item may include a header or may itself be a header. */
  header: _propTypes.default.bool,

  /** MenuItem can be only icon. */
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.itemShorthand]),

  /** MenuItem index inside Menu. */
  index: _propTypes.default.number,

  /** A menu item can be link. */
  link: _propTypes.default.bool,

  /** Internal name of the MenuItem. */
  name: _propTypes.default.string,

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** A menu item can take left or right position. */
  position: _propTypes.default.oneOf(['left', 'right'])
} : {};
MenuItem.create = (0, _lib.createShorthandFactory)(MenuItem, function (val) {
  return {
    content: val,
    name: val
  };
});
var _default = MenuItem;
exports.default = _default;