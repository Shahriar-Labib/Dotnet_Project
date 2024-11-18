import _extends from "@babel/runtime/helpers/esm/extends";
import _values from "lodash-es/values";
import _get from "lodash-es/get";
import _forEach from "lodash-es/forEach";
import _mapValues from "lodash-es/mapValues";
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps, SUI, useEventCallback, useForceUpdate } from '../../lib';
import { getChildMapping, mergeChildMappings } from './utils/childMapping';
import wrapChild from './utils/wrapChild';

/**
 * Wraps all children elements with proper callbacks and props.
 *
 * @param {React.ReactNode} children
 * @param {Stream} animation
 * @param {Number|String|Object} duration
 * @param {Boolean} directional
 *
 * @return {Object}
 */
function useWrappedChildren(children, animation, duration, directional) {
  var forceUpdate = useForceUpdate();
  var previousChildren = React.useRef();
  var wrappedChildren;
  React.useEffect(function () {
    previousChildren.current = wrappedChildren;
  });
  var handleChildHide = useEventCallback(function (nothing, childProps) {
    var reactKey = childProps.reactKey;
    delete previousChildren.current[reactKey];
    forceUpdate();
  }); // A short circuit for an initial render as there will be no `prevMapping`

  if (typeof previousChildren.current === 'undefined') {
    wrappedChildren = _mapValues(getChildMapping(children), function (child) {
      return wrapChild(child, handleChildHide, {
        animation: animation,
        duration: duration,
        directional: directional
      });
    });
  } else {
    var nextMapping = getChildMapping(children);
    wrappedChildren = mergeChildMappings(previousChildren.current, nextMapping);

    _forEach(wrappedChildren, function (child, key) {
      var hasPrev = previousChildren.current[key];
      var hasNext = nextMapping[key];
      var prevChild = previousChildren.current[key];
      var isLeaving = !_get(prevChild, 'props.visible'); // Heads up!
      // An item is new (entering), it will be picked from `nextChildren`, so it should be wrapped

      if (hasNext && (!hasPrev || isLeaving)) {
        wrappedChildren[key] = wrapChild(child, handleChildHide, {
          animation: animation,
          duration: duration,
          directional: directional,
          transitionOnMount: true
        });
        return;
      } // Heads up!
      // An item is old (exiting), it will be picked from `prevChildren`, so it has been already
      // wrapped, so should be only updated


      if (!hasNext && hasPrev && !isLeaving) {
        wrappedChildren[key] = /*#__PURE__*/React.cloneElement(prevChild, {
          visible: false
        });
        return;
      } // Heads up!
      // An item item hasn't changed transition states, but it will be picked from `nextChildren`,
      // so we should wrap it again


      var _prevChild$props = prevChild.props,
          visible = _prevChild$props.visible,
          transitionOnMount = _prevChild$props.transitionOnMount;
      wrappedChildren[key] = wrapChild(child, handleChildHide, {
        animation: animation,
        duration: duration,
        directional: directional,
        transitionOnMount: transitionOnMount,
        visible: visible
      });
    });
  }

  return wrappedChildren;
}
/**
 * A Transition.Group animates children as they mount and unmount.
 */


var TransitionGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = useWrappedChildren(props.children, props.animation, props.duration, props.directional);
  var ElementType = getElementType(TransitionGroup, props);
  var rest = getUnhandledProps(TransitionGroup, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    ref: ref
  }), _values(children));
});
TransitionGroup.handledProps = ["animation", "as", "children", "directional", "duration"];
TransitionGroup.displayName = 'TransitionGroup';
TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Named animation event to used. Must be defined in CSS. */
  animation: PropTypes.oneOfType([PropTypes.oneOf(SUI.TRANSITIONS), PropTypes.string]),

  /** Primary content. */
  children: PropTypes.node,

  /** Whether it is directional animation event or not. Use it only for custom transitions. */
  directional: PropTypes.bool,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    hide: PropTypes.number.isRequired,
    show: PropTypes.number.isRequired
  }), PropTypes.string])
} : {};
TransitionGroup.defaultProps = {
  as: React.Fragment,
  animation: 'fade',
  duration: 500
};
export default TransitionGroup;