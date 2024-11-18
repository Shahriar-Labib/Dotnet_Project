import _extends from "@babel/runtime/helpers/esm/extends";
import _map from "lodash-es/map";
import _isArray from "lodash-es/isArray";
import _invoke from "lodash-es/invoke";
import _without from "lodash-es/without";
import _includes from "lodash-es/includes";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useAutoControlledValue, useEventCallback } from '../../lib';
import AccordionPanel from './AccordionPanel';
/**
 * @param {Boolean} exclusive
 * @param {Number} activeIndex
 * @param {Number} itemIndex
 */

function isIndexActive(exclusive, activeIndex, itemIndex) {
  return exclusive ? activeIndex === itemIndex : _includes(activeIndex, itemIndex);
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


  if (_includes(activeIndex, itemIndex)) {
    return _without(activeIndex, itemIndex);
  }

  return [].concat(activeIndex, [itemIndex]);
}
/**
 * An Accordion can contain sub-accordions.
 */


var AccordionAccordion = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      exclusive = props.exclusive,
      panels = props.panels;

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: function initialState() {
      return exclusive ? -1 : [];
    }
  }),
      activeIndex = _useAutoControlledVal[0],
      setActiveIndex = _useAutoControlledVal[1];

  var classes = cx('accordion', className);
  var rest = getUnhandledProps(AccordionAccordion, props);
  var ElementType = getElementType(AccordionAccordion, props);
  var handleTitleClick = useEventCallback(function (e, titleProps) {
    var index = titleProps.index;
    setActiveIndex(computeNewIndex(exclusive, activeIndex, index));

    _invoke(props, 'onTitleClick', e, titleProps);
  });

  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(function () {
      /* eslint-disable no-console */
      if (exclusive && typeof activeIndex !== 'number') {
        console.error('`activeIndex` must be a number if `exclusive` is true');
      } else if (!exclusive && !_isArray(activeIndex)) {
        console.error('`activeIndex` must be an array if `exclusive` is false');
      }
      /* eslint-enable no-console */

    }, [exclusive, activeIndex]);
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), childrenUtils.isNil(children) ? _map(panels, function (panel, index) {
    return AccordionPanel.create(panel, {
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
  as: PropTypes.elementType,

  /** Index of the currently active panel. */
  activeIndex: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Initial activeIndex value. */
  defaultActiveIndex: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])]),

  /** Only allow one panel open at a time. */
  exclusive: PropTypes.bool,

  /**
   * Called when a panel title is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),

  /** Shorthand array of props for Accordion. */
  panels: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.arrayOf(PropTypes.shape({
    content: customPropTypes.itemShorthand,
    title: customPropTypes.itemShorthand
  }))])
} : {};
AccordionAccordion.create = createShorthandFactory(AccordionAccordion, function (content) {
  return {
    content: content
  };
});
export default AccordionAccordion;