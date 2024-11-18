import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _map from "lodash-es/map";
import _get from "lodash-es/get";
import _invoke from "lodash-es/invoke";
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps, useAutoControlledValue } from '../../lib';
import Grid from '../../collections/Grid/Grid';
import GridColumn from '../../collections/Grid/GridColumn';
import Menu from '../../collections/Menu/Menu';
import TabPane from './TabPane';
/**
 * A Tab is a hidden section of content activated by a Menu.
 * @see Menu
 * @see Segment
 */

var Tab = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var grid = props.grid,
      menu = props.menu,
      panes = props.panes,
      menuPosition = props.menuPosition,
      renderActiveOnly = props.renderActiveOnly;

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: 0
  }),
      activeIndex = _useAutoControlledVal[0],
      setActiveIndex = _useAutoControlledVal[1];

  var handleItemClick = function handleItemClick(e, _ref) {
    var index = _ref.index;

    _invoke(props, 'onTabChange', e, _extends({}, props, {
      activeIndex: index
    }));

    setActiveIndex(index);
  };

  var renderItems = function renderItems() {
    if (renderActiveOnly) {
      return _invoke(_get(panes, "[" + activeIndex + "]"), 'render', props);
    }

    return _map(panes, function (_ref2, index) {
      var pane = _ref2.pane;
      return TabPane.create(pane, {
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

    return Menu.create(menu, {
      autoGenerateKey: false,
      overrideProps: {
        items: _map(panes, 'menuItem'),
        onItemClick: handleItemClick,
        activeIndex: activeIndex
      }
    });
  };

  var renderVertical = function renderVertical(menuElement) {
    var paneWidth = grid.paneWidth,
        tabWidth = grid.tabWidth,
        gridProps = _objectWithoutPropertiesLoose(grid, ["paneWidth", "tabWidth"]);

    var position = menuPosition || menuElement.props.tabular === 'right' && 'right' || 'left';
    return /*#__PURE__*/React.createElement(Grid, gridProps, position === 'left' && GridColumn.create({
      width: tabWidth,
      children: menuElement
    }, {
      autoGenerateKey: false
    }), GridColumn.create({
      width: paneWidth,
      children: renderItems(),
      stretched: true
    }, {
      autoGenerateKey: false
    }), position === 'right' && GridColumn.create({
      width: tabWidth,
      children: menuElement
    }, {
      autoGenerateKey: false
    }));
  };

  renderVertical.handledProps = [];
  var menuElement = renderMenu();
  var rest = getUnhandledProps(Tab, props);
  var ElementType = getElementType(Tab, props);

  if (menuElement.props.vertical) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      ref: ref
    }), renderVertical(menuElement));
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    ref: ref
  }), menuElement.props.attached !== 'bottom' && menuElement, renderItems(), menuElement.props.attached === 'bottom' && menuElement);
});
Tab.handledProps = ["activeIndex", "as", "defaultActiveIndex", "grid", "menu", "menuPosition", "onTabChange", "panes", "renderActiveOnly"];
Tab.displayName = 'Tab';
Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The initial activeIndex. */
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Index of the currently active tab. */
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Shorthand props for the Menu.
   * tabular, if true, will derive final value from `menuPosition`, otherwise set 'left' or 'right' explicitly.
   */
  menu: PropTypes.object,

  /** Align vertical menu */
  menuPosition: PropTypes.oneOf(['left', 'right']),

  /** Shorthand props for the Grid. Only applicable to vertical menus. */
  grid: PropTypes.object,

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed new activeIndex.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   */
  onTabChange: PropTypes.func,

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * { menuItem: 'Home', render: () => <Tab.Pane /> }
   * or
   * { menuItem: 'Home', pane: 'Welcome' }
   */
  panes: PropTypes.arrayOf(PropTypes.shape({
    menuItem: customPropTypes.itemShorthand,
    pane: customPropTypes.itemShorthand,
    render: PropTypes.func
  })),

  /** A Tab can render only active pane. */
  renderActiveOnly: PropTypes.bool
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
Tab.Pane = TabPane;
export default Tab;