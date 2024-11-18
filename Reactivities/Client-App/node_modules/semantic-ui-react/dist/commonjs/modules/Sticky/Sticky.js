"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * Sticky content stays fixed to the browser viewport while another column of content is visible on the page.
 */
var Sticky = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _stickyRect$current;

  var active = props.active,
      bottomOffset = props.bottomOffset,
      children = props.children,
      className = props.className,
      context = props.context,
      offset = props.offset,
      scrollContext = props.scrollContext,
      styleElement = props.styleElement;

  var _React$useState = _react.default.useState(false),
      sticky = _React$useState[0],
      setSticky = _React$useState[1];

  var _React$useState2 = _react.default.useState(),
      bound = _React$useState2[0],
      setBound = _React$useState2[1];

  var _React$useState3 = _react.default.useState(),
      bottom = _React$useState3[0],
      setBottom = _React$useState3[1];

  var _React$useState4 = _react.default.useState(),
      pushing = _React$useState4[0],
      setPushing = _React$useState4[1];

  var _React$useState5 = _react.default.useState(),
      top = _React$useState5[0],
      setTop = _React$useState5[1];

  var stickyRef = _react.default.useRef();

  var triggerRef = _react.default.useRef();

  var triggerRect = _react.default.useRef();

  var contextRect = _react.default.useRef();

  var stickyRect = _react.default.useRef();

  var frameId = _react.default.useRef();

  var ticking = _react.default.useRef(); // ----------------------------------------
  // Helpers
  // ----------------------------------------


  var assignRects = function assignRects() {
    var contextNode = (0, _lib.isRefObject)(context) ? context.current : context || document.body;
    triggerRect.current = triggerRef.current.getBoundingClientRect();
    contextRect.current = contextNode.getBoundingClientRect();
    stickyRect.current = stickyRef.current.getBoundingClientRect();
  };

  var computeStyle = function computeStyle() {
    if (!sticky) {
      return styleElement;
    }

    return (0, _extends2.default)({
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
    (0, _invoke2.default)(props, 'onStick', e, props);
  };

  var setUnsticked = function setUnsticked(e, newBound) {
    setBound(newBound);
    setSticky(false);
    (0, _invoke2.default)(props, 'onUnstick', e, props);
  };

  var stickToContextBottom = function stickToContextBottom(e) {
    setSticked(e, true);
    togglePushing(true);
    (0, _invoke2.default)(props, 'onBottom', e, props);
  };

  var stickToContextTop = function stickToContextTop(e) {
    setUnsticked(e, false);
    togglePushing(false);
    (0, _invoke2.default)(props, 'onTop', e, props);
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

  var handleUpdate = (0, _lib.useEventCallback)(function (e) {
    if (!ticking.current) {
      ticking.current = true;
      frameId.current = requestAnimationFrame(function () {
        return update(e);
      });
    }
  }); // ----------------------------------------
  // State control
  // ----------------------------------------

  (0, _lib.useIsomorphicLayoutEffect)(function () {
    if (!active) {
      setSticky(false);
    }
  }, [active]); // ----------------------------------------
  // Effects
  // ----------------------------------------

  (0, _lib.useIsomorphicLayoutEffect)(function () {
    if (active) {
      handleUpdate();
    }
  }, [active]);

  _react.default.useEffect(function () {
    return function () {
      cancelAnimationFrame(frameId.current);
    };
  }, []); // ----------------------------------------
  // Document events
  // ----------------------------------------


  _react.default.useEffect(function () {
    var scrollContextNode = (0, _lib.isRefObject)(scrollContext) ? scrollContext.current : scrollContext;

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


  var rest = (0, _lib.getUnhandledProps)(Sticky, props);
  var ElementType = (0, _lib.getElementType)(Sticky, props);
  var containerClasses = (0, _clsx.default)(sticky && 'ui', sticky && 'stuck-container', sticky && (bound ? 'bound-container' : 'fixed-container'), className);
  var elementClasses = (0, _clsx.default)('ui', sticky && (bound ? 'bound bottom' : 'fixed'), sticky && !bound && (bottom === null ? 'top' : 'bottom'), 'sticky');
  var triggerStyles = sticky ? {
    height: (_stickyRect$current = stickyRect.current) == null ? void 0 : _stickyRect$current.height
  } : {};
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: containerClasses,
    ref: ref
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: triggerRef,
    style: triggerStyles
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: elementClasses,
    ref: stickyRef,
    style: computeStyle()
  }, children));
});

Sticky.handledProps = ["active", "as", "bottomOffset", "children", "className", "context", "offset", "onBottom", "onStick", "onTop", "onUnstick", "pushing", "scrollContext", "styleElement"];
Sticky.displayName = 'Sticky';
Sticky.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A Sticky can be active. */
  active: _propTypes.default.bool,

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset: _propTypes.default.number,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Context which sticky element should stick to. */
  context: _propTypes.default.oneOfType([_lib.customPropTypes.domNode, _lib.customPropTypes.refObject]),

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset: _propTypes.default.number,

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom: _propTypes.default.func,

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick: _propTypes.default.func,

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop: _propTypes.default.func,

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick: _propTypes.default.func,

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing: _propTypes.default.bool,

  /** Context which sticky should attach onscroll events. */
  scrollContext: _propTypes.default.oneOfType([_lib.customPropTypes.domNode, _lib.customPropTypes.refObject]),

  /** Custom style for sticky element. */
  styleElement: _propTypes.default.object
} : {};
Sticky.defaultProps = {
  active: true,
  bottomOffset: 0,
  offset: 0,
  scrollContext: (0, _lib.isBrowser)() ? window : null
};
var _default = Sticky;
exports.default = _default;