"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _reactComponentEventListener = require("@fluentui/react-component-event-listener");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _SidebarPushable = _interopRequireDefault(require("./SidebarPushable"));

var _SidebarPusher = _interopRequireDefault(require("./SidebarPusher"));

/**
 * We use `animationTick` to understand when an animation should be scheduled.
 *
 * @param {Boolean} visible
 */
function useAnimationTick(visible) {
  var previousVisible = (0, _lib.usePrevious)(visible);
  var tickIncrement = !!visible === !!previousVisible ? 0 : 1;

  var animationTick = _react.default.useRef(0);

  var forceUpdate = (0, _lib.useForceUpdate)();
  var currentTick = animationTick.current + tickIncrement;

  var resetAnimationTick = _react.default.useCallback(function () {
    animationTick.current = 0;
    forceUpdate();
  }, []);

  _react.default.useEffect(function () {
    animationTick.current = currentTick;
  });

  return [currentTick, resetAnimationTick];
}
/**
 * A sidebar hides additional content beside a page.
 */


var Sidebar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var animation = props.animation,
      className = props.className,
      children = props.children,
      content = props.content,
      direction = props.direction,
      target = props.target,
      visible = props.visible,
      width = props.width;

  var _useAnimationTick = useAnimationTick(visible),
      animationTick = _useAnimationTick[0],
      resetAnimationTick = _useAnimationTick[1];

  var elementRef = (0, _lib.useMergedRefs)(ref, _react.default.useRef());

  var animationTimer = _react.default.useRef();

  var skipNextCallback = _react.default.useRef();

  var handleAnimationEnd = (0, _lib.useEventCallback)(function () {
    var callback = visible ? 'onShow' : 'onHidden';
    resetAnimationTick();
    (0, _invoke2.default)(props, callback, null, props);
  });
  var handleAnimationStart = (0, _lib.useEventCallback)(function () {
    var callback = visible ? 'onVisible' : 'onHide';
    clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(handleAnimationEnd, Sidebar.animationDuration);

    if (skipNextCallback.current) {
      skipNextCallback.current = false;
      return;
    }

    (0, _invoke2.default)(props, callback, null, props);
  });

  var handleDocumentClick = function handleDocumentClick(e) {
    if (!(0, _lib.doesNodeContainClick)(elementRef.current, e)) {
      skipNextCallback.current = true;
      (0, _invoke2.default)(props, 'onHide', e, (0, _extends2.default)({}, props, {
        visible: false
      }));
    }
  };

  (0, _lib.useIsomorphicLayoutEffect)(function () {
    handleAnimationStart();
  }, [animationTick]);

  _react.default.useEffect(function () {
    return function () {
      clearTimeout(animationTimer.current);
    };
  }, []);

  var classes = (0, _clsx.default)('ui', animation, direction, width, (0, _lib.useKeyOnly)(animationTick > 0, 'animating'), (0, _lib.useKeyOnly)(visible, 'visible'), 'sidebar', className);
  var rest = (0, _lib.getUnhandledProps)(Sidebar, props);
  var ElementType = (0, _lib.getElementType)(Sidebar, props);
  var targetProp = (0, _lib.isRefObject)(target) ? {
    targetRef: target
  } : {
    target: target
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: elementRef
  }), _lib.childrenUtils.isNil(children) ? content : children), visible && /*#__PURE__*/_react.default.createElement(_reactComponentEventListener.EventListener, (0, _extends2.default)({
    listener: handleDocumentClick,
    type: "click"
  }, targetProp)));
});

Sidebar.handledProps = ["animation", "as", "children", "className", "content", "direction", "onHidden", "onHide", "onShow", "onVisible", "target", "visible", "width"];
Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Animation style. */
  animation: _propTypes.default.oneOf(['overlay', 'push', 'scale down', 'uncover', 'slide out', 'slide along']),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Direction the sidebar should appear on. */
  direction: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide: _propTypes.default.func,

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden: _propTypes.default.func,

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow: _propTypes.default.func,

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible: _propTypes.default.func,

  /** A sidebar can handle clicks on the passed element. */
  target: _propTypes.default.oneOfType([_lib.customPropTypes.domNode, _lib.customPropTypes.refObject]),

  /** Controls whether or not the sidebar is visible on the page. */
  visible: _propTypes.default.bool,

  /** Sidebar width. */
  width: _propTypes.default.oneOf(['very thin', 'thin', 'wide', 'very wide'])
} : {};
Sidebar.defaultProps = {
  direction: 'left',
  target: _reactComponentEventListener.documentRef,
  visible: false
};
Sidebar.animationDuration = 500;
Sidebar.Pushable = _SidebarPushable.default;
Sidebar.Pusher = _SidebarPusher.default;
var _default = Sidebar;
exports.default = _default;