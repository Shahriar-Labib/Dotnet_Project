import _extends from "@babel/runtime/helpers/esm/extends";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps } from '../../lib';
/**
 * A dropdown menu can contain dividers to separate related content.
 */

var DropdownDivider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className;
  var classes = cx('divider', className);
  var rest = getUnhandledProps(DropdownDivider, props);
  var ElementType = getElementType(DropdownDivider, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }));
});
DropdownDivider.handledProps = ["as", "className"];
DropdownDivider.displayName = 'DropdownDivider';
DropdownDivider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string
} : {};
export default DropdownDivider;