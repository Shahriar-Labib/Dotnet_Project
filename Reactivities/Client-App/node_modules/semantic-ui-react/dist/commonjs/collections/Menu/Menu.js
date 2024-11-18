"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _MenuHeader = _interopRequireDefault(require("./MenuHeader"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuMenu = _interopRequireDefault(require("./MenuMenu"));

/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */
var Menu = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var attached = props.attached,
      borderless = props.borderless,
      children = props.children,
      className = props.className,
      color = props.color,
      compact = props.compact,
      fixed = props.fixed,
      floated = props.floated,
      fluid = props.fluid,
      icon = props.icon,
      inverted = props.inverted,
      items = props.items,
      pagination = props.pagination,
      pointing = props.pointing,
      secondary = props.secondary,
      size = props.size,
      stackable = props.stackable,
      tabular = props.tabular,
      text = props.text,
      vertical = props.vertical,
      widths = props.widths;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: -1
  }),
      activeIndex = _useAutoControlledVal[0],
      setActiveIndex = _useAutoControlledVal[1];

  var classes = (0, _clsx.default)('ui', color, size, (0, _lib.useKeyOnly)(borderless, 'borderless'), (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(pagination, 'pagination'), (0, _lib.useKeyOnly)(pointing, 'pointing'), (0, _lib.useKeyOnly)(secondary, 'secondary'), (0, _lib.useKeyOnly)(stackable, 'stackable'), (0, _lib.useKeyOnly)(text, 'text'), (0, _lib.useKeyOnly)(vertical, 'vertical'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), (0, _lib.useKeyOrValueAndKey)(floated, 'floated'), (0, _lib.useKeyOrValueAndKey)(icon, 'icon'), (0, _lib.useKeyOrValueAndKey)(tabular, 'tabular'), (0, _lib.useValueAndKey)(fixed, 'fixed'), (0, _lib.useWidthProp)(widths, 'item'), className, 'menu');
  var rest = (0, _lib.getUnhandledProps)(Menu, props);
  var ElementType = (0, _lib.getElementType)(Menu, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      ref: ref
    }), children);
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), (0, _map2.default)(items, function (item, index) {
    return _MenuItem.default.create(item, {
      defaultProps: {
        active: parseInt(activeIndex, 10) === index,
        index: index
      },
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onClick: function onClick(e, itemProps) {
            var itemIndex = itemProps.index;
            setActiveIndex(itemIndex);
            (0, _invoke2.default)(predefinedProps, 'onClick', e, itemProps);
            (0, _invoke2.default)(props, 'onItemClick', e, itemProps);
          }
        };
      }
    });
  }));
});

Menu.handledProps = ["activeIndex", "as", "attached", "borderless", "children", "className", "color", "compact", "defaultActiveIndex", "fixed", "floated", "fluid", "icon", "inverted", "items", "onItemClick", "pagination", "pointing", "secondary", "size", "stackable", "tabular", "text", "vertical", "widths"];
Menu.displayName = 'Menu';
Menu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Index of the currently active item. */
  activeIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A menu may be attached to other content segments. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top', 'bottom'])]),

  /** A menu item or menu can have no borders. */
  borderless: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Additional colors can be specified. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** A menu can take up only the space necessary to fit its content. */
  compact: _propTypes.default.bool,

  /** Initial activeIndex value. */
  defaultActiveIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A menu can be fixed to a side of its context. */
  fixed: _propTypes.default.oneOf(['left', 'right', 'bottom', 'top']),

  /** A menu can be floated. */
  floated: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['right'])]),

  /** A vertical menu may take the size of its container. */
  fluid: _propTypes.default.bool,

  /** A menu may have just icons (bool) or labeled icons. */
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['labeled'])]),

  /** A menu may have its colors inverted to show greater contrast. */
  inverted: _propTypes.default.bool,

  /** Shorthand array of props for Menu. */
  items: _lib.customPropTypes.collectionShorthand,

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func]),

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination: _propTypes.default.bool,

  /** A menu can point to show its relationship to nearby content. */
  pointing: _propTypes.default.bool,

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary: _propTypes.default.bool,

  /** A menu can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium', 'big')),

  /** A menu can stack at mobile resolutions. */
  stackable: _propTypes.default.bool,

  /** A menu can be formatted to show tabs of information. */
  tabular: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['right'])]),

  /** A menu can be formatted for text content. */
  text: _propTypes.default.bool,

  /** A vertical menu displays elements vertically. */
  vertical: _propTypes.default.bool,

  /** A menu can have its items divided evenly. */
  widths: _propTypes.default.oneOf(_lib.SUI.WIDTHS)
} : {};
Menu.Header = _MenuHeader.default;
Menu.Item = _MenuItem.default;
Menu.Menu = _MenuMenu.default;
Menu.create = (0, _lib.createShorthandFactory)(Menu, function (items) {
  return {
    items: items
  };
});
var _default = Menu;
exports.default = _default;