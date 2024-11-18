import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _isUndefined from "lodash-es/isUndefined";
import PropTypes from 'prop-types';
import React from 'react';
import Portal from '../Portal';
import Transition from '../../modules/Transition';
import { TRANSITION_STATUS_ENTERING } from '../../modules/Transition/utils/computeStatuses';
import { getUnhandledProps, useForceUpdate } from '../../lib';

function usePortalState(props) {
  var portalOpen = React.useRef(false);
  var forceUpdate = useForceUpdate();
  var setPortalOpen = React.useCallback(function (value) {
    portalOpen.current = value;
    forceUpdate();
  }, []);
  React.useEffect(function () {
    if (!_isUndefined(props.open)) {
      portalOpen.current = props.open;
    }
  }, [props.open]);

  if (_isUndefined(props.open)) {
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

  var _React$useState = React.useState(false),
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

    _invoke(props, 'onClose', null, _extends({}, data, {
      portalOpen: false,
      transitionVisible: false
    }));

    _invoke(props, 'onHide', null, _extends({}, data, {
      portalOpen: portalOpen,
      transitionVisible: false
    }));
  };

  var handleTransitionStart = function handleTransitionStart(nothing, data) {
    var status = data.status;
    var nextTransitionVisible = status === TRANSITION_STATUS_ENTERING;

    _invoke(props, 'onStart', null, _extends({}, data, {
      portalOpen: portalOpen,
      transitionVisible: nextTransitionVisible
    })); // Heads up! TransitionablePortal fires onOpen callback on the start of transition animation


    if (!nextTransitionVisible) {
      return;
    }

    setTransitionVisible(nextTransitionVisible);

    _invoke(props, 'onOpen', null, _extends({}, data, {
      transitionVisible: nextTransitionVisible,
      portalOpen: true
    }));
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var rest = getUnhandledProps(TransitionablePortal, props);
  return /*#__PURE__*/React.createElement(Portal, _extends({}, rest, {
    open: open,
    onOpen: handlePortalOpen,
    onClose: handlePortalClose
  }), /*#__PURE__*/React.createElement(Transition, _extends({}, transition, {
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
  children: PropTypes.node.isRequired,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onClose: PropTypes.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onHide: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onOpen: PropTypes.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onStart: PropTypes.func,

  /** Controls whether or not the portal is displayed. */
  open: PropTypes.bool,

  /** Transition props. */
  transition: PropTypes.object
} : {};
TransitionablePortal.defaultProps = {
  transition: {
    animation: 'scale',
    duration: 400
  }
};
export default TransitionablePortal;