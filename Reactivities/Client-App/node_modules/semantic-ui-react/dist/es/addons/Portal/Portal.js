import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import EventStack from '@semantic-ui-react/event-stack';
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, doesNodeContainClick, useAutoControlledValue } from '../../lib';
import useTrigger from './utils/useTrigger';
import PortalInner from './PortalInner';

/**
 * A component that allows you to render children outside their parent.
 * @see Modal
 * @see Popup
 * @see Dimmer
 * @see Confirm
 */
function Portal(props) {
  var children = props.children,
      closeOnDocumentClick = props.closeOnDocumentClick,
      closeOnEscape = props.closeOnEscape,
      closeOnPortalMouseLeave = props.closeOnPortalMouseLeave,
      closeOnTriggerBlur = props.closeOnTriggerBlur,
      closeOnTriggerClick = props.closeOnTriggerClick,
      closeOnTriggerMouseLeave = props.closeOnTriggerMouseLeave,
      eventPool = props.eventPool,
      mountNode = props.mountNode,
      mouseEnterDelay = props.mouseEnterDelay,
      mouseLeaveDelay = props.mouseLeaveDelay,
      openOnTriggerClick = props.openOnTriggerClick,
      openOnTriggerFocus = props.openOnTriggerFocus,
      openOnTriggerMouseEnter = props.openOnTriggerMouseEnter;

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false
  }),
      open = _useAutoControlledVal[0],
      setOpen = _useAutoControlledVal[1];

  var contentRef = React.useRef();

  var _useTrigger = useTrigger(props.trigger, props.triggerRef),
      triggerRef = _useTrigger[0],
      trigger = _useTrigger[1];

  var mouseEnterTimer = React.useRef();
  var mouseLeaveTimer = React.useRef();
  var latestDocumentMouseDownEvent = React.useRef(); // ----------------------------------------
  // Behavior
  // ----------------------------------------

  var openPortal = function openPortal(e) {
    setOpen(true);

    _invoke(props, 'onOpen', e, _extends({}, props, {
      open: true
    }));
  };

  var openPortalWithTimeout = function openPortalWithTimeout(e, delay) {
    // React wipes the entire event object and suggests using e.persist() if
    // you need the event for async access. However, even with e.persist
    // certain required props (e.g. currentTarget) are null so we're forced to clone.
    var eventClone = _extends({}, e);

    return setTimeout(function () {
      return openPortal(eventClone);
    }, delay || 0);
  };

  var closePortal = function closePortal(e) {
    setOpen(false);

    _invoke(props, 'onClose', e, _extends({}, props, {
      open: false
    }));
  };

  var closePortalWithTimeout = function closePortalWithTimeout(e, delay) {
    // React wipes the entire event object and suggests using e.persist() if
    // you need the event for async access. However, even with e.persist
    // certain required props (e.g. currentTarget) are null so we're forced to clone.
    var eventClone = _extends({}, e);

    return setTimeout(function () {
      return closePortal(eventClone);
    }, delay || 0);
  }; // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------


  React.useEffect(function () {
    // Clean up timers
    clearTimeout(mouseEnterTimer.current);
    clearTimeout(mouseLeaveTimer.current);
  }, []);

  var handleDocumentMouseDown = function handleDocumentMouseDown(e) {
    latestDocumentMouseDownEvent.current = e;
  };

  var handleDocumentClick = function handleDocumentClick(e) {
    var _contentRef$current;

    var currentMouseDownEvent = latestDocumentMouseDownEvent.current;
    latestDocumentMouseDownEvent.current = null; // event happened in trigger (delegate to trigger handlers)

    var isInsideTrigger = doesNodeContainClick(triggerRef.current, e); // event originated in the portal but was ended outside

    var isOriginatedFromPortal = currentMouseDownEvent && doesNodeContainClick(contentRef.current, currentMouseDownEvent); // event happened in the portal

    var isInsidePortal = doesNodeContainClick(contentRef.current, e);

    if (!((_contentRef$current = contentRef.current) == null ? void 0 : _contentRef$current.contains) || // no portal
    isInsideTrigger || isOriginatedFromPortal || isInsidePortal) {
      return;
    } // ignore the click


    if (closeOnDocumentClick) {
      closePortal(e);
    }
  };

  var handleEscape = function handleEscape(e) {
    if (!closeOnEscape) {
      return;
    }

    if (keyboardKey.getCode(e) !== keyboardKey.Escape) {
      return;
    }

    closePortal(e);
  }; // ----------------------------------------
  // Component Event Handlers
  // ----------------------------------------


  var handlePortalMouseLeave = function handlePortalMouseLeave(e) {
    if (!closeOnPortalMouseLeave) {
      return;
    } // Do not close the portal when 'mouseleave' is triggered by children


    if (e.target !== contentRef.current) {
      return;
    }

    mouseLeaveTimer.current = closePortalWithTimeout(e, mouseLeaveDelay);
  };

  var handlePortalMouseEnter = function handlePortalMouseEnter() {
    // In order to enable mousing from the trigger to the portal, we need to
    // clear the mouseleave timer that was set when leaving the trigger.
    if (!closeOnPortalMouseLeave) {
      return;
    }

    clearTimeout(mouseLeaveTimer.current);
  };

  var handleTriggerBlur = function handleTriggerBlur(e) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    // Call original event handler
    _invoke.apply(void 0, [trigger, 'props.onBlur', e].concat(rest)); // IE 11 doesn't work with relatedTarget in blur events


    var target = e.relatedTarget || document.activeElement; // do not close if focus is given to the portal

    var didFocusPortal = _invoke(contentRef.current, 'contains', target);

    if (!closeOnTriggerBlur || didFocusPortal) {
      return;
    }

    closePortal(e);
  };

  var handleTriggerClick = function handleTriggerClick(e) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    // Call original event handler
    _invoke.apply(void 0, [trigger, 'props.onClick', e].concat(rest));

    if (open && closeOnTriggerClick) {
      closePortal(e);
    } else if (!open && openOnTriggerClick) {
      openPortal(e);
    }
  };

  var handleTriggerFocus = function handleTriggerFocus(e) {
    for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }

    // Call original event handler
    _invoke.apply(void 0, [trigger, 'props.onFocus', e].concat(rest));

    if (!openOnTriggerFocus) {
      return;
    }

    openPortal(e);
  };

  var handleTriggerMouseLeave = function handleTriggerMouseLeave(e) {
    clearTimeout(mouseEnterTimer); // Call original event handler

    for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      rest[_key4 - 1] = arguments[_key4];
    }

    _invoke.apply(void 0, [trigger, 'props.onMouseLeave', e].concat(rest));

    if (!closeOnTriggerMouseLeave) {
      return;
    }

    mouseLeaveTimer.current = closePortalWithTimeout(e, mouseLeaveDelay);
  };

  var handleTriggerMouseEnter = function handleTriggerMouseEnter(e) {
    clearTimeout(mouseLeaveTimer); // Call original event handler

    for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      rest[_key5 - 1] = arguments[_key5];
    }

    _invoke.apply(void 0, [trigger, 'props.onMouseEnter', e].concat(rest));

    if (!openOnTriggerMouseEnter) {
      return;
    }

    mouseEnterTimer.current = openPortalWithTimeout(e, mouseEnterDelay);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PortalInner, {
    mountNode: mountNode,
    onMount: function onMount() {
      return _invoke(props, 'onMount', null, props);
    },
    onUnmount: function onUnmount() {
      return _invoke(props, 'onUnmount', null, props);
    },
    ref: contentRef
  }, children), /*#__PURE__*/React.createElement(EventStack, {
    name: "mouseleave",
    on: handlePortalMouseLeave,
    pool: eventPool,
    target: contentRef
  }), /*#__PURE__*/React.createElement(EventStack, {
    name: "mouseenter",
    on: handlePortalMouseEnter,
    pool: eventPool,
    target: contentRef
  }), /*#__PURE__*/React.createElement(EventStack, {
    name: "mousedown",
    on: handleDocumentMouseDown,
    pool: eventPool
  }), /*#__PURE__*/React.createElement(EventStack, {
    name: "click",
    on: handleDocumentClick,
    pool: eventPool
  }), /*#__PURE__*/React.createElement(EventStack, {
    name: "keydown",
    on: handleEscape,
    pool: eventPool
  })), trigger && /*#__PURE__*/React.cloneElement(trigger, {
    onBlur: handleTriggerBlur,
    onClick: handleTriggerClick,
    onFocus: handleTriggerFocus,
    onMouseLeave: handleTriggerMouseLeave,
    onMouseEnter: handleTriggerMouseEnter,
    ref: triggerRef
  }));
}

Portal.handledProps = ["children", "closeOnDocumentClick", "closeOnEscape", "closeOnPortalMouseLeave", "closeOnTriggerBlur", "closeOnTriggerClick", "closeOnTriggerMouseLeave", "defaultOpen", "eventPool", "mountNode", "mouseEnterDelay", "mouseLeaveDelay", "onClose", "onMount", "onOpen", "onUnmount", "open", "openOnTriggerClick", "openOnTriggerFocus", "openOnTriggerMouseEnter", "trigger", "triggerRef"];
Portal.displayName = 'Portal';
Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /** Controls whether or not the portal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Controls whether or not the portal should close when escape is pressed is displayed. */
  closeOnEscape: PropTypes.bool,

  /**
   * Controls whether or not the portal should close when mousing out of the portal.
   * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
   * gap from the trigger to the portal.
   */
  closeOnPortalMouseLeave: PropTypes.bool,

  /** Controls whether or not the portal should close on blur of the trigger. */
  closeOnTriggerBlur: PropTypes.bool,

  /** Controls whether or not the portal should close on click of the trigger. */
  closeOnTriggerClick: PropTypes.bool,

  /** Controls whether or not the portal should close when mousing out of the trigger. */
  closeOnTriggerMouseLeave: PropTypes.bool,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** Event pool namespace that is used to handle component events */
  eventPool: PropTypes.string,

  /** The node where the portal should mount. */
  mountNode: PropTypes.any,

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay: PropTypes.number,

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay: PropTypes.number,

  /**
   * Called when a close event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Controls whether or not the portal is displayed. */
  open: PropTypes.bool,

  /** Controls whether or not the portal should open when the trigger is clicked. */
  openOnTriggerClick: PropTypes.bool,

  /** Controls whether or not the portal should open on focus of the trigger. */
  openOnTriggerFocus: PropTypes.bool,

  /** Controls whether or not the portal should open when mousing over the trigger. */
  openOnTriggerMouseEnter: PropTypes.bool,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: PropTypes.node,

  /** Called with a ref to the trigger node. */
  triggerRef: customPropTypes.ref
} : {};
Portal.defaultProps = {
  closeOnDocumentClick: true,
  closeOnEscape: true,
  eventPool: 'default',
  openOnTriggerClick: true
};
Portal.Inner = PortalInner;
export default Portal;