import _extends from "@babel/runtime/helpers/esm/extends";
import _isNil from "lodash-es/isNil";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getUnhandledProps, getElementType } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * A divider sub-component for Breadcrumb component.
 */

var BreadcrumbDivider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = cx('divider', className);
  var rest = getUnhandledProps(BreadcrumbDivider, props);
  var ElementType = getElementType(BreadcrumbDivider, props);

  if (!_isNil(icon)) {
    return Icon.create(icon, {
      defaultProps: _extends({}, rest, {
        className: classes
      }),
      autoGenerateKey: false,
      ref: ref
    });
  }

  if (!_isNil(content)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      ref: ref
    }), content);
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), childrenUtils.isNil(children) ? '/' : children);
});
BreadcrumbDivider.handledProps = ["as", "children", "className", "content", "icon"];
BreadcrumbDivider.displayName = 'BreadcrumbDivider';
BreadcrumbDivider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon: customPropTypes.itemShorthand
} : {};
BreadcrumbDivider.create = createShorthandFactory(BreadcrumbDivider, function (icon) {
  return {
    icon: icon
  };
});
export default BreadcrumbDivider;