import _extends from "@babel/runtime/helpers/esm/extends";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * A feed can contain a like element.
 */

var FeedLike = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = cx('like', className);
  var rest = getUnhandledProps(FeedLike, props);
  var ElementType = getElementType(FeedLike, props);

  if (!childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      ref: ref
    }), children);
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), Icon.create(icon, {
    autoGenerateKey: false
  }), content);
});
FeedLike.handledProps = ["as", "children", "className", "content", "icon"];
FeedLike.defaultProps = {
  as: 'a'
};
FeedLike.displayName = 'FeedLike';
FeedLike.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for icon. Mutually exclusive with children. */
  icon: customPropTypes.itemShorthand
} : {};
export default FeedLike;