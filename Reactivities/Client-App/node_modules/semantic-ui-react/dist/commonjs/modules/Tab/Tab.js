"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Grid = _interopRequireDefault(require("../../collections/Grid/Grid"));

var _GridColumn = _interopRequireDefault(require("../../collections/Grid/GridColumn"));

var _Menu = _interopRequireDefault(require("../../collections/Menu/Menu"));

var _TabPane = _interopRequireDefault(require("./TabPane"));

/**
 * A Tab is a hidden section of content activated by a Menu.
 * @see Menu
 * @see Segment
 */
var Tab = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var grid = props.grid,
      menu = props.menu,
      panes = props.panes,
      menuPosition = props.menuPosition,
      renderActiveOnly = props.renderActiveOnly;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: 0
  }),
      activeIndex = _useAutoControlledVal[0],
      setActiveIndex = _useAutoControlledVal[1];

  var handleItemClick = function handleItemClick(e, _ref) {
    var index = _ref.index;
    (0, _invoke2.default)(props, 'onTabChange', e, (0, _extends2.default)({}, props, {
      activeIndex: index
    }));
    setActiveIndex(index);
  };

  var renderItems = function renderItems() {
    if (renderActiveOnly) {
      return (0, _invoke2.default)((0, _get2.default)(panes, "[" + activeIndex + "]"), 'render', props);
    }

    return (0, _map2.default)(panes, function (_ref2, index) {
      var pane = _ref2.pane;
      return _TabPane.default.create(pane, {
        overrideProps: {
          active: index === activeIndex
        }
      });
    });
  };

  var renderMenu = function renderMenu() {
    if (menu.tabular === true && menuPosition === 'right') {
      menu.tabular = 'right';
    }

    return _Menu.default.create(menu, {
      autoGenerateKey: false,
      overrideProps: {
        items: (0, _map2.default)(panes, 'menuItem'),
        onItemClick: handleItemClick,
        activeIndex: activeIndex
      }
    });
  };

  var renderVertical = function renderVertical(menuElement) {
    var paneWidth = grid.paneWidth,
        tabWidth = grid.tabWidth,
        gridProps = (0, _objectWithoutPropertiesLoose2.default)(grid, ["paneWidth", "tabWidth"]);
    var position = menuPosition || menuElement.props.tabular === 'right' && 'right' || 'left';
    return /*#__PURE__*/_react.default.createElement(_Grid.default, gridProps, position === 'left' && _GridColumn.default.create({
      width: tabWidth,
      children: menuElement
    }, {
      autoGenerateKey: false
    }), _GridColumn.default.create({
      width: paneWidth,
      children: renderItems(),
      stretched: true
    }, {
      autoGenerateKey: false
    }), position === 'right' && _GridColumn.default.create({
      width: tabWidth,
      children: menuElement
    }, {
      autoGenerateKey: false
    }));
  };

  renderVertical.handledProps = [];
  var menuElement = renderMenu();
  var rest = (0, _lib.getUnhandledProps)(Tab, props);
  var ElementType = (0, _lib.getElementType)(Tab, props);

  if (menuElement.props.vertical) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      ref: ref
    }), renderVertical(menuElement));
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    ref: ref
  }), menuElement.props.attached !== 'bottom' && menuElement, renderItems(), menuElement.props.attached === 'bottom' && menuElement);
});

Tab.handledProps = ["activeIndex", "as", "defaultActiveIndex", "grid", "menu", "menuPosition", "onTabChange", "panes", "renderActiveOnly"];
Tab.displayName = 'Tab';
Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** The initial activeIndex. */
  defaultActiveIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Index of the currently active tab. */
  activeIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Shorthand props for the Menu.
   * tabular, if true, will derive final value from `menuPosition`, otherwise set 'left' or 'right' explicitly.
   */
  menu: _propTypes.default.object,

  /** Align vertical menu */
  menuPosition: _propTypes.default.oneOf(['left', 'right']),

  /** Shorthand props for the Grid. Only applicable to vertical menus. */
  grid: _propTypes.default.object,

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed new activeIndex.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   */
  onTabChange: _propTypes.default.func,

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * { menuItem: 'Home', render: () => <Tab.Pane /> }
   * or
   * { menuItem: 'Home', pane: 'Welcome' }
   */
  panes: _propTypes.default.arrayOf(_propTypes.default.shape({
    menuItem: _lib.customPropTypes.itemShorthand,
    pane: _lib.customPropTypes.itemShorthand,
    render: _propTypes.default.func
  })),

  /** A Tab can render only active pane. */
  renderActiveOnly: _propTypes.default.bool
} : {};
Tab.autoControlledProps = ['activeIndex'];
Tab.defaultProps = {
  grid: {
    paneWidth: 12,
    tabWidth: 4
  },
  menu: {
    attached: true,
    tabular: true
  },
  renderActiveOnly: true
};
Tab.Pane = _TabPane.default;
var _default = Tab;
exports.default = _default;