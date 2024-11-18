import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _isNil from "lodash-es/isNil";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly, useEventCallback } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * A title sub-component for Accordion component.
 */

var AccordionTitle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = cx(useKeyOnly(active, 'active'), 'title', className);
  var rest = getUnhandledProps(AccordionTitle, props);
  var ElementType = getElementType(AccordionTitle, props);
  var iconValue = _isNil(icon) ? 'dropdown' : icon;
  var handleClick = useEventCallback(function (e) {
    _invoke(props, 'onClick', e, props);
  });

  if (!childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), children);
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), Icon.create(iconValue, {
    autoGenerateKey: false
  }), content);
});
AccordionTitle.handledProps = ["active", "as", "children", "className", "content", "icon", "index", "onClick"];
AccordionTitle.displayName = 'AccordionTitle';
AccordionTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Whether or not the title is in the open state. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** AccordionTitle index inside Accordion. */
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func
} : {};
AccordionTitle.create = createShorthandFactory(AccordionTitle, function (content) {
  return {
    content: content
  };
});
export default AccordionTitle;