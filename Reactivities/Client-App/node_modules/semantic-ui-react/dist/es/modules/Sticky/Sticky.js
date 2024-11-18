import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps, isRefObject, isBrowser, useEventCallback, useIsomorphicLayoutEffect } from '../../lib';
/**
 * Sticky content stays fixed to the browser viewport while another column of content is visible on the page.
 */

var Sticky = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _stickyRect$current;

  var active = props.active,
      bottomOffset = props.bottomOffset,
      children = props.children,
      className = props.className,
      context = props.context,
      offset = props.offset,
      scrollContext = props.scrollContext,
      styleElement = props.styleElement;

  var _React$useState = React.useState(false),
      sticky = _React$useState[0],
      setSticky = _React$useState[1];

  var _React$useState2 = React.useState(),
      bound = _React$useState2[0],
      setBound = _React$useState2[1];

  var _React$useState3 = React.useState(),
      bottom = _React$useState3[0],
      setBottom = _React$useState3[1];

  var _React$useState4 = React.useState(),
      pushing = _React$useState4[0],
      setPushing = _React$useState4[1];

  var _React$useState5 = React.useState(),
      top = _React$useState5[0],
      setTop = _React$useState5[1];

  var stickyRef = React.useRef();
  var triggerRef = React.useRef();
  var triggerRect = React.useRef();
  var contextRect = React.useRef();
  var stickyRect = React.useRef();
  var frameId = React.useRef();
  var ticking = React.useRef(); // ----------------------------------------
  // Helpers
  // ----------------------------------------

  var assignRects = function assignRects() {
    var contextNode = isRefObject(context) ? context.current : context || document.body;
    triggerRect.current = triggerRef.current.getBoundingClientRect();
    contextRect.current = contextNode.getBoundingClientRect();
    stickyRect.current = stickyRef.current.getBoundingClientRect();
  };

  var computeStyle = function computeStyle() {
    if (!sticky) {
      return styleElement;
    }

    return _extends({
      bottom: bound ? 0 : bottom,
      top: bound ? undefined : top,
      width: triggerRect.current.width
    }, styleElement);
  }; // Return true when the component reached the bottom of the context


  var didReachContextBottom = function didReachContextBottom() {
    return stickyRect.current.height + offset >= contextRect.current.bottom;
  }; // Return true when the component reached the starting point


  var didReachStartingPoint = function didReachStartingPoint() {
    return stickyRect.current.top <= triggerRect.current.top;
  }; // Return true when the top of the screen overpasses the Sticky component


  var didTouchScreenTop = function didTouchScreenTop() {
    return triggerRect.current.top < offset;
  }; // Return true when the bottom of the screen overpasses the Sticky component


  var didTouchScreenBottom = function didTouchScreenBottom() {
    return contextRect.current.bottom + bottomOffset > window.innerHeight;
  }; // Return true if the height of the component is higher than the window


  var isOversized = function isOversized() {
    return stickyRect.current.height > window.innerHeight;
  }; // ----------------------------------------
  // Stick helpers
  // ----------------------------------------
  // If true, the component will stick to the bottom of the screen instead of the top


  var togglePushing = function togglePushing(value) {
    if (props.pushing) {
      setPushing(value);
    }
  };

  var setSticked = function setSticked(e, newBound) {
    setBound(newBound);
    setSticky(true);

    _invoke(props, 'onStick', e, props);
  };

  var setUnsticked = function setUnsticked(e, newBound) {
    setBound(newBound);
    setSticky(false);

    _invoke(props, 'onUnstick', e, props);
  };

  var stickToContextBottom = function stickToContextBottom(e) {
    setSticked(e, true);
    togglePushing(true);

    _invoke(props, 'onBottom', e, props);
  };

  var stickToContextTop = function stickToContextTop(e) {
    setUnsticked(e, false);
    togglePushing(false);

    _invoke(props, 'onTop', e, props);
  };

  var stickToScreenBottom = function stickToScreenBottom(e) {
    setSticked(e, false);
    setBottom(bottomOffset);
    setTop(null);
  };

  var stickToScreenTop = function stickToScreenTop(e) {
    setSticked(e, false);
    setBottom(null);
    setTop(offset);
  }; // ----------------------------------------
  // Handlers
  // ----------------------------------------


  var update = function update(e) {
    ticking.current = false;
    assignRects();

    if (pushing) {
      if (didReachStartingPoint()) {
        stickToContextTop(e);
        return;
      }

      if (didTouchScreenBottom()) {
        stickToScreenBottom(e);
        return;
      }

      stickToContextBottom(e);
      return;
    }

    if (isOversized()) {
      if (contextRect.current.top > 0) {
        stickToContextTop(e);
        return;
      }

      if (contextRect.current.bottom < window.innerHeight) {
        stickToContextBottom(e);
        return;
      }
    }

    if (didTouchScreenTop()) {
      if (didReachContextBottom()) {
        stickToContextBottom(e);
        return;
      }

      stickToScreenTop(e);
      return;
    }

    stickToContextTop(e);
  };

  var handleUpdate = useEventCallback(function (e) {
    if (!ticking.current) {
      ticking.current = true;
      frameId.current = requestAnimationFrame(function () {
        return update(e);
      });
    }
  }); // ----------------------------------------
  // State control
  // ----------------------------------------

  useIsomorphicLayoutEffect(function () {
    if (!active) {
      setSticky(false);
    }
  }, [active]); // ----------------------------------------
  // Effects
  // ----------------------------------------

  useIsomorphicLayoutEffect(function () {
    if (active) {
      handleUpdate();
    }
  }, [active]);
  React.useEffect(function () {
    return function () {
      cancelAnimationFrame(frameId.current);
    };
  }, []); // ----------------------------------------
  // Document events
  // ----------------------------------------

  React.useEffect(function () {
    var scrollContextNode = isRefObject(scrollContext) ? scrollContext.current : scrollContext;

    if (active && scrollContextNode) {
      scrollContextNode == null ? void 0 : scrollContextNode.addEventListener('resize', handleUpdate);
      scrollContextNode == null ? void 0 : scrollContextNode.addEventListener('scroll', handleUpdate);
    }

    return function () {
      scrollContextNode == null ? void 0 : scrollContextNode.removeEventListener('resize', handleUpdate);
      scrollContextNode == null ? void 0 : scrollContextNode.removeEventListener('scroll', handleUpdate);
    };
  }, [active, scrollContext]); // ----------------------------------------
  // Render
  // ----------------------------------------

  var rest = getUnhandledProps(Sticky, props);
  var ElementType = getElementType(Sticky, props);
  var containerClasses = cx(sticky && 'ui', sticky && 'stuck-container', sticky && (bound ? 'bound-container' : 'fixed-container'), className);
  var elementClasses = cx('ui', sticky && (bound ? 'bound bottom' : 'fixed'), sticky && !bound && (bottom === null ? 'top' : 'bottom'), 'sticky');
  var triggerStyles = sticky ? {
    height: (_stickyRect$current = stickyRect.current) == null ? void 0 : _stickyRect$current.height
  } : {};
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: containerClasses,
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    ref: triggerRef,
    style: triggerStyles
  }), /*#__PURE__*/React.createElement("div", {
    className: elementClasses,
    ref: stickyRef,
    style: computeStyle()
  }, children));
});
Sticky.handledProps = ["active", "as", "bottomOffset", "children", "className", "context", "offset", "onBottom", "onStick", "onTop", "onUnstick", "pushing", "scrollContext", "styleElement"];
Sticky.displayName = 'Sticky';
Sticky.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A Sticky can be active. */
  active: PropTypes.bool,

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset: PropTypes.number,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Context which sticky element should stick to. */
  context: PropTypes.oneOfType([customPropTypes.domNode, customPropTypes.refObject]),

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset: PropTypes.number,

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom: PropTypes.func,

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick: PropTypes.func,

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop: PropTypes.func,

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick: PropTypes.func,

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing: PropTypes.bool,

  /** Context which sticky should attach onscroll events. */
  scrollContext: PropTypes.oneOfType([customPropTypes.domNode, customPropTypes.refObject]),

  /** Custom style for sticky element. */
  styleElement: PropTypes.object
} : {};
Sticky.defaultProps = {
  active: true,
  bottomOffset: 0,
  offset: 0,
  scrollContext: isBrowser() ? window : null
};
export default Sticky;