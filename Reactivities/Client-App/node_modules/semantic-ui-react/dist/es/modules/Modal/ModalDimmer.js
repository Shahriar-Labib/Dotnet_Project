import _extends from "@babel/runtime/helpers/esm/extends";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useClassNamesOnNode, useKeyOnly, useMergedRefs } from '../../lib';
/**
 * A modal has a dimmer.
 */

var ModalDimmer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var blurring = props.blurring,
      children = props.children,
      className = props.className,
      centered = props.centered,
      content = props.content,
      inverted = props.inverted,
      mountNode = props.mountNode,
      scrolling = props.scrolling;
  var elementRef = useMergedRefs(ref, React.useRef());
  var classes = cx('ui', useKeyOnly(inverted, 'inverted'), useKeyOnly(!centered, 'top aligned'), 'page modals dimmer transition visible active', className);
  var bodyClasses = cx('dimmable dimmed', useKeyOnly(blurring, 'blurring'), useKeyOnly(scrolling, 'scrolling'));
  var rest = getUnhandledProps(ModalDimmer, props);
  var ElementType = getElementType(ModalDimmer, props);
  useClassNamesOnNode(mountNode, bodyClasses);
  React.useEffect(function () {
    var _elementRef$current, _elementRef$current$s;

    (_elementRef$current = elementRef.current) == null ? void 0 : (_elementRef$current$s = _elementRef$current.style) == null ? void 0 : _elementRef$current$s.setProperty('display', 'flex', 'important');
  }, []);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: elementRef
  }), childrenUtils.isNil(children) ? content : children);
});
ModalDimmer.handledProps = ["as", "blurring", "centered", "children", "className", "content", "inverted", "mountNode", "scrolling"];
ModalDimmer.displayName = 'ModalDimmer';
ModalDimmer.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A dimmer can be blurred. */
  blurring: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A dimmer can center its contents in the viewport. */
  centered: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A dimmer can be inverted. */
  inverted: PropTypes.bool,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: PropTypes.any,

  /** A dimmer can make body scrollable. */
  scrolling: PropTypes.bool
} : {};
ModalDimmer.create = createShorthandFactory(ModalDimmer, function (content) {
  return {
    content: content
  };
});
export default ModalDimmer;