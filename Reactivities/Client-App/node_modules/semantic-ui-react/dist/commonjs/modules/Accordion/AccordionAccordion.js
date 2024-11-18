"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _AccordionPanel = _interopRequireDefault(require("./AccordionPanel"));

/**
 * @param {Boolean} exclusive
 * @param {Number} activeIndex
 * @param {Number} itemIndex
 */
function isIndexActive(exclusive, activeIndex, itemIndex) {
  return exclusive ? activeIndex === itemIndex : (0, _includes2.default)(activeIndex, itemIndex);
}
/**
 * @param {Boolean} exclusive
 * @param {Number} activeIndex
 * @param {Number} itemIndex
 */


function computeNewIndex(exclusive, activeIndex, itemIndex) {
  if (exclusive) {
    return itemIndex === activeIndex ? -1 : itemIndex;
  } // check to see if index is in array, and remove it, if not then add it


  if ((0, _includes2.default)(activeIndex, itemIndex)) {
    return (0, _without2.default)(activeIndex, itemIndex);
  }

  return [].concat(activeIndex, [itemIndex]);
}
/**
 * An Accordion can contain sub-accordions.
 */


var AccordionAccordion = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      exclusive = props.exclusive,
      panels = props.panels;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: function initialState() {
      return exclusive ? -1 : [];
    }
  }),
      activeIndex = _useAutoControlledVal[0],
      setActiveIndex = _useAutoControlledVal[1];

  var classes = (0, _clsx.default)('accordion', className);
  var rest = (0, _lib.getUnhandledProps)(AccordionAccordion, props);
  var ElementType = (0, _lib.getElementType)(AccordionAccordion, props);
  var handleTitleClick = (0, _lib.useEventCallback)(function (e, titleProps) {
    var index = titleProps.index;
    setActiveIndex(computeNewIndex(exclusive, activeIndex, index));
    (0, _invoke2.default)(props, 'onTitleClick', e, titleProps);
  });

  if (process.env.NODE_ENV !== 'production') {
    _react.default.useEffect(function () {
      /* eslint-disable no-console */
      if (exclusive && typeof activeIndex !== 'number') {
        console.error('`activeIndex` must be a number if `exclusive` is true');
      } else if (!exclusive && !(0, _isArray2.default)(activeIndex)) {
        console.error('`activeIndex` must be an array if `exclusive` is false');
      }
      /* eslint-enable no-console */

    }, [exclusive, activeIndex]);
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), _lib.childrenUtils.isNil(children) ? (0, _map2.default)(panels, function (panel, index) {
    return _AccordionPanel.default.create(panel, {
      defaultProps: {
        active: isIndexActive(exclusive, activeIndex, index),
        index: index,
        onTitleClick: handleTitleClick
      }
    });
  }) : children);
});

AccordionAccordion.handledProps = ["activeIndex", "as", "children", "className", "defaultActiveIndex", "exclusive", "onTitleClick", "panels"];
AccordionAccordion.defaultProps = {
  exclusive: true
};
AccordionAccordion.displayName = 'AccordionAccordion';
AccordionAccordion.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Index of the currently active panel. */
  activeIndex: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number])]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number])]),

  /** Only allow one panel open at a time. */
  exclusive: _propTypes.default.bool,

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func]),

  /** Shorthand array of props for Accordion. */
  panels: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.arrayOf(_propTypes.default.shape({
    content: _lib.customPropTypes.itemShorthand,
    title: _lib.customPropTypes.itemShorthand
  }))])
} : {};
AccordionAccordion.create = (0, _lib.createShorthandFactory)(AccordionAccordion, function (content) {
  return {
    content: content
  };
});
var _default = AccordionAccordion;
exports.default = _default;