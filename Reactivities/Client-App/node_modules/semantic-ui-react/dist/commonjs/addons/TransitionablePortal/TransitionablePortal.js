"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Portal = _interopRequireDefault(require("../Portal"));

var _Transition = _interopRequireDefault(require("../../modules/Transition"));

var _computeStatuses = require("../../modules/Transition/utils/computeStatuses");

var _lib = require("../../lib");

function usePortalState(props) {
  var portalOpen = _react.default.useRef(false);

  var forceUpdate = (0, _lib.useForceUpdate)();

  var setPortalOpen = _react.default.useCallback(function (value) {
    portalOpen.current = value;
    forceUpdate();
  }, []);

  _react.default.useEffect(function () {
    if (!(0, _isUndefined2.default)(props.open)) {
      portalOpen.current = props.open;
    }
  }, [props.open]);

  if ((0, _isUndefined2.default)(props.open)) {
    // This is definitely a hack :(
    //
    // It's coupled with handlePortalClose() for force set the state of `portalOpen` omitting
    // props.open. It's related to implementation of the component itself as `onClose()` will be
    // called after a transition will end.
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/2382
    if (portalOpen.current === -1) {
      return [false, setPortalOpen];
    }

    return [portalOpen.current, setPortalOpen];
  }

  return [props.open, setPortalOpen];
}
/**
 * A sugar for `Portal` and `Transition`.
 * @see Portal
 * @see Transition
 */


function TransitionablePortal(props) {
  var children = props.children,
      transition = props.transition;

  var _usePortalState = usePortalState(props),
      portalOpen = _usePortalState[0],
      setPortalOpen = _usePortalState[1];

  var _React$useState = _react.default.useState(false),
      transitionVisible = _React$useState[0],
      setTransitionVisible = _React$useState[1];

  var open = portalOpen || transitionVisible; // ----------------------------------------
  // Callback handling
  // ----------------------------------------

  var handlePortalClose = function handlePortalClose() {
    setPortalOpen(-1);
  };

  var handlePortalOpen = function handlePortalOpen() {
    setPortalOpen(true);
  };

  var handleTransitionHide = function handleTransitionHide(nothing, data) {
    setTransitionVisible(false);
    (0, _invoke2.default)(props, 'onClose', null, (0, _extends2.default)({}, data, {
      portalOpen: false,
      transitionVisible: false
    }));
    (0, _invoke2.default)(props, 'onHide', null, (0, _extends2.default)({}, data, {
      portalOpen: portalOpen,
      transitionVisible: false
    }));
  };

  var handleTransitionStart = function handleTransitionStart(nothing, data) {
    var status = data.status;
    var nextTransitionVisible = status === _computeStatuses.TRANSITION_STATUS_ENTERING;
    (0, _invoke2.default)(props, 'onStart', null, (0, _extends2.default)({}, data, {
      portalOpen: portalOpen,
      transitionVisible: nextTransitionVisible
    })); // Heads up! TransitionablePortal fires onOpen callback on the start of transition animation

    if (!nextTransitionVisible) {
      return;
    }

    setTransitionVisible(nextTransitionVisible);
    (0, _invoke2.default)(props, 'onOpen', null, (0, _extends2.default)({}, data, {
      transitionVisible: nextTransitionVisible,
      portalOpen: true
    }));
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var rest = (0, _lib.getUnhandledProps)(TransitionablePortal, props);
  return /*#__PURE__*/_react.default.createElement(_Portal.default, (0, _extends2.default)({}, rest, {
    open: open,
    onOpen: handlePortalOpen,
    onClose: handlePortalClose
  }), /*#__PURE__*/_react.default.createElement(_Transition.default, (0, _extends2.default)({}, transition, {
    transitionOnMount: true,
    onStart: handleTransitionStart,
    onHide: handleTransitionHide,
    visible: portalOpen
  }), children));
}

TransitionablePortal.handledProps = ["children", "onClose", "onHide", "onOpen", "onStart", "open", "transition"];
TransitionablePortal.displayName = 'TransitionablePortal';
TransitionablePortal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: _propTypes.default.node.isRequired,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onHide: _propTypes.default.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onOpen: _propTypes.default.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onStart: _propTypes.default.func,

  /** Controls whether or not the portal is displayed. */
  open: _propTypes.default.bool,

  /** Transition props. */
  transition: _propTypes.default.object
} : {};
TransitionablePortal.defaultProps = {
  transition: {
    animation: 'scale',
    duration: 400
  }
};
var _default = TransitionablePortal;
exports.default = _default;