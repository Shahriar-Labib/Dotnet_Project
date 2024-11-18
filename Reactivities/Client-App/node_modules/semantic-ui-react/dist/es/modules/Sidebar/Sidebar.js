import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import { EventListener, documentRef } from '@fluentui/react-component-event-listener';
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, doesNodeContainClick, getUnhandledProps, getElementType, isRefObject, useKeyOnly, useIsomorphicLayoutEffect, useEventCallback, useForceUpdate, useMergedRefs, usePrevious } from '../../lib';
import SidebarPushable from './SidebarPushable';
import SidebarPusher from './SidebarPusher';
/**
 * We use `animationTick` to understand when an animation should be scheduled.
 *
 * @param {Boolean} visible
 */

function useAnimationTick(visible) {
  var previousVisible = usePrevious(visible);
  var tickIncrement = !!visible === !!previousVisible ? 0 : 1;
  var animationTick = React.useRef(0);
  var forceUpdate = useForceUpdate();
  var currentTick = animationTick.current + tickIncrement;
  var resetAnimationTick = React.useCallback(function () {
    animationTick.current = 0;
    forceUpdate();
  }, []);
  React.useEffect(function () {
    animationTick.current = currentTick;
  });
  return [currentTick, resetAnimationTick];
}
/**
 * A sidebar hides additional content beside a page.
 */


var Sidebar = /*#__PURE__*/React.forwardRef(function (props, ref) {
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

  var elementRef = useMergedRefs(ref, React.useRef());
  var animationTimer = React.useRef();
  var skipNextCallback = React.useRef();
  var handleAnimationEnd = useEventCallback(function () {
    var callback = visible ? 'onShow' : 'onHidden';
    resetAnimationTick();

    _invoke(props, callback, null, props);
  });
  var handleAnimationStart = useEventCallback(function () {
    var callback = visible ? 'onVisible' : 'onHide';
    clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(handleAnimationEnd, Sidebar.animationDuration);

    if (skipNextCallback.current) {
      skipNextCallback.current = false;
      return;
    }

    _invoke(props, callback, null, props);
  });

  var handleDocumentClick = function handleDocumentClick(e) {
    if (!doesNodeContainClick(elementRef.current, e)) {
      skipNextCallback.current = true;

      _invoke(props, 'onHide', e, _extends({}, props, {
        visible: false
      }));
    }
  };

  useIsomorphicLayoutEffect(function () {
    handleAnimationStart();
  }, [animationTick]);
  React.useEffect(function () {
    return function () {
      clearTimeout(animationTimer.current);
    };
  }, []);
  var classes = cx('ui', animation, direction, width, useKeyOnly(animationTick > 0, 'animating'), useKeyOnly(visible, 'visible'), 'sidebar', className);
  var rest = getUnhandledProps(Sidebar, props);
  var ElementType = getElementType(Sidebar, props);
  var targetProp = isRefObject(target) ? {
    targetRef: target
  } : {
    target: target
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: elementRef
  }), childrenUtils.isNil(children) ? content : children), visible && /*#__PURE__*/React.createElement(EventListener, _extends({
    listener: handleDocumentClick,
    type: "click"
  }, targetProp)));
});
Sidebar.handledProps = ["animation", "as", "children", "className", "content", "direction", "onHidden", "onHide", "onShow", "onVisible", "target", "visible", "width"];
Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Animation style. */
  animation: PropTypes.oneOf(['overlay', 'push', 'scale down', 'uncover', 'slide out', 'slide along']),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Direction the sidebar should appear on. */
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide: PropTypes.func,

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden: PropTypes.func,

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow: PropTypes.func,

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible: PropTypes.func,

  /** A sidebar can handle clicks on the passed element. */
  target: PropTypes.oneOfType([customPropTypes.domNode, customPropTypes.refObject]),

  /** Controls whether or not the sidebar is visible on the page. */
  visible: PropTypes.bool,

  /** Sidebar width. */
  width: PropTypes.oneOf(['very thin', 'thin', 'wide', 'very wide'])
} : {};
Sidebar.defaultProps = {
  direction: 'left',
  target: documentRef,
  visible: false
};
Sidebar.animationDuration = 500;
Sidebar.Pushable = SidebarPushable;
Sidebar.Pusher = SidebarPusher;
export default Sidebar;