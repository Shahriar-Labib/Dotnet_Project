import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getUnhandledProps, getElementType, useKeyOnly, useEventCallback } from '../../lib';
/**
 * A section sub-component for Breadcrumb component.
 */

var BreadcrumbSection = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      href = props.href,
      link = props.link,
      onClick = props.onClick;
  var classes = cx(useKeyOnly(active, 'active'), 'section', className);
  var rest = getUnhandledProps(BreadcrumbSection, props);
  var ElementType = getElementType(BreadcrumbSection, props, function () {
    if (link || onClick) return 'a';
  });
  var handleClick = useEventCallback(function (e) {
    return _invoke(props, 'onClick', e, props);
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    href: href,
    onClick: handleClick,
    ref: ref
  }), childrenUtils.isNil(children) ? content : children);
});
BreadcrumbSection.handledProps = ["active", "as", "children", "className", "content", "href", "link", "onClick"];
BreadcrumbSection.displayName = 'BreadcrumbSection';
BreadcrumbSection.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Style as the currently active section. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: customPropTypes.every([customPropTypes.disallow(['link']), PropTypes.string]),

  /** Render as an `a` tag instead of a `div`. */
  link: customPropTypes.every([customPropTypes.disallow(['href']), PropTypes.bool]),

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func
} : {};
BreadcrumbSection.create = createShorthandFactory(BreadcrumbSection, function (content) {
  return {
    content: content,
    link: true
  };
});
export default BreadcrumbSection;