import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, doesNodeContainClick, getElementType, getUnhandledProps, useKeyOnly, useVerticalAlignProp, useIsomorphicLayoutEffect, useMergedRefs } from '../../lib';
/**
 * An inner element for a Dimmer.
 */

var DimmerInner = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      disabled = props.disabled,
      inverted = props.inverted,
      page = props.page,
      simple = props.simple,
      verticalAlign = props.verticalAlign;
  var containerRef = useMergedRefs(ref, React.useRef());
  var contentRef = React.useRef();
  useIsomorphicLayoutEffect(function () {
    var _containerRef$current;

    if (!((_containerRef$current = containerRef.current) == null ? void 0 : _containerRef$current.style)) {
      return;
    }

    if (active) {
      containerRef.current.style.setProperty('display', 'flex', 'important');
    } else {
      containerRef.current.style.removeProperty('display');
    }
  }, [active]);

  var handleClick = function handleClick(e) {
    _invoke(props, 'onClick', e, props);

    if (contentRef.current !== e.target && doesNodeContainClick(contentRef.current, e)) {
      return;
    }

    _invoke(props, 'onClickOutside', e, props);
  };

  var classes = cx('ui', useKeyOnly(active, 'active transition visible'), useKeyOnly(disabled, 'disabled'), useKeyOnly(inverted, 'inverted'), useKeyOnly(page, 'page'), useKeyOnly(simple, 'simple'), useVerticalAlignProp(verticalAlign), 'dimmer', className);
  var rest = getUnhandledProps(DimmerInner, props);
  var ElementType = getElementType(DimmerInner, props);
  var childrenContent = childrenUtils.isNil(children) ? content : children;
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: containerRef
  }), childrenContent && /*#__PURE__*/React.createElement("div", {
    className: "content",
    ref: contentRef
  }, childrenContent));
});
DimmerInner.handledProps = ["active", "as", "children", "className", "content", "disabled", "inverted", "onClick", "onClickOutside", "page", "simple", "verticalAlign"];
DimmerInner.displayName = 'DimmerInner';
DimmerInner.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An active dimmer will dim its parent container. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A disabled dimmer cannot be activated */
  disabled: PropTypes.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside: PropTypes.func,

  /** A dimmer can be formatted to have its colors inverted. */
  inverted: PropTypes.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: PropTypes.bool,

  /** A dimmer can be controlled with simple prop. */
  simple: PropTypes.bool,

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign: PropTypes.oneOf(['bottom', 'top'])
} : {};
export default DimmerInner;