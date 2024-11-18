import _extends from "@babel/runtime/helpers/esm/extends";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthand, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import FeedDate from './FeedDate';
import FeedUser from './FeedUser';
/**
 * A feed can contain a summary.
 */

var FeedSummary = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      content = props.content,
      date = props.date,
      user = props.user;
  var classes = cx('summary', className);
  var rest = getUnhandledProps(FeedSummary, props);
  var ElementType = getElementType(FeedSummary, props);

  if (!childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      ref: ref
    }), children);
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), createShorthand(FeedUser, function (val) {
    return {
      content: val
    };
  }, user, {
    autoGenerateKey: false
  }), content && ' ', content, content && ' ', createShorthand(FeedDate, function (val) {
    return {
      content: val
    };
  }, date, {
    autoGenerateKey: false
  }));
});
FeedSummary.handledProps = ["as", "children", "className", "content", "date", "user"];
FeedSummary.displayName = 'FeedSummary';
FeedSummary.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for FeedDate. */
  date: customPropTypes.itemShorthand,

  /** Shorthand for FeedUser. */
  user: customPropTypes.itemShorthand
} : {};
export default FeedSummary;