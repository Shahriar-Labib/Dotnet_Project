import _extends from "@babel/runtime/helpers/esm/extends";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A pushable sub-component for Sidebar.
 */

var SidebarPusher = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
      dimmed = props.dimmed,
      children = props.children,
      content = props.content;
  var classes = cx('pusher', useKeyOnly(dimmed, 'dimmed'), className);
  var rest = getUnhandledProps(SidebarPusher, props);
  var ElementType = getElementType(SidebarPusher, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), childrenUtils.isNil(children) ? content : children);
});
SidebarPusher.handledProps = ["as", "children", "className", "content", "dimmed"];
SidebarPusher.displayName = 'SidebarPusher';
SidebarPusher.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool
} : {};
export default SidebarPusher;