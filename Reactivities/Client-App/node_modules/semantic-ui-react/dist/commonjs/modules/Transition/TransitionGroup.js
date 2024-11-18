"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _childMapping = require("./utils/childMapping");

var _wrapChild = _interopRequireDefault(require("./utils/wrapChild"));

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
  var forceUpdate = (0, _lib.useForceUpdate)();

  var previousChildren = _react.default.useRef();

  var wrappedChildren;

  _react.default.useEffect(function () {
    previousChildren.current = wrappedChildren;
  });

  var handleChildHide = (0, _lib.useEventCallback)(function (nothing, childProps) {
    var reactKey = childProps.reactKey;
    delete previousChildren.current[reactKey];
    forceUpdate();
  }); // A short circuit for an initial render as there will be no `prevMapping`

  if (typeof previousChildren.current === 'undefined') {
    wrappedChildren = (0, _mapValues2.default)((0, _childMapping.getChildMapping)(children), function (child) {
      return (0, _wrapChild.default)(child, handleChildHide, {
        animation: animation,
        duration: duration,
        directional: directional
      });
    });
  } else {
    var nextMapping = (0, _childMapping.getChildMapping)(children);
    wrappedChildren = (0, _childMapping.mergeChildMappings)(previousChildren.current, nextMapping);
    (0, _forEach2.default)(wrappedChildren, function (child, key) {
      var hasPrev = previousChildren.current[key];
      var hasNext = nextMapping[key];
      var prevChild = previousChildren.current[key];
      var isLeaving = !(0, _get2.default)(prevChild, 'props.visible'); // Heads up!
      // An item is new (entering), it will be picked from `nextChildren`, so it should be wrapped

      if (hasNext && (!hasPrev || isLeaving)) {
        wrappedChildren[key] = (0, _wrapChild.default)(child, handleChildHide, {
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
        wrappedChildren[key] = /*#__PURE__*/_react.default.cloneElement(prevChild, {
          visible: false
        });
        return;
      } // Heads up!
      // An item item hasn't changed transition states, but it will be picked from `nextChildren`,
      // so we should wrap it again


      var _prevChild$props = prevChild.props,
          visible = _prevChild$props.visible,
          transitionOnMount = _prevChild$props.transitionOnMount;
      wrappedChildren[key] = (0, _wrapChild.default)(child, handleChildHide, {
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


var TransitionGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = useWrappedChildren(props.children, props.animation, props.duration, props.directional);
  var ElementType = (0, _lib.getElementType)(TransitionGroup, props);
  var rest = (0, _lib.getUnhandledProps)(TransitionGroup, props);
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    ref: ref
  }), (0, _values2.default)(children));
});

TransitionGroup.handledProps = ["animation", "as", "children", "directional", "duration"];
TransitionGroup.displayName = 'TransitionGroup';
TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Named animation event to used. Must be defined in CSS. */
  animation: _propTypes.default.oneOfType([_propTypes.default.oneOf(_lib.SUI.TRANSITIONS), _propTypes.default.string]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Whether it is directional animation event or not. Use it only for custom transitions. */
  directional: _propTypes.default.bool,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    hide: _propTypes.default.number.isRequired,
    show: _propTypes.default.number.isRequired
  }), _propTypes.default.string])
} : {};
TransitionGroup.defaultProps = {
  as: _react.default.Fragment,
  animation: 'fade',
  duration: 500
};
var _default = TransitionGroup;
exports.default = _default;