import _extends from "@babel/runtime/helpers/esm/extends";
import _isPlainObject from "lodash-es/isPlainObject";
import _pick from "lodash-es/pick";
import _includes from "lodash-es/includes";
import _reduce from "lodash-es/reduce";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import shallowEqual from 'shallowequal';
import { childrenUtils, customPropTypes, doesNodeContainClick, eventStack, getElementType, getUnhandledProps, isBrowser, useKeyOnly, useAutoControlledValue, useMergedRefs } from '../../lib';
import Icon from '../../elements/Icon';
import Portal from '../../addons/Portal';
import ModalActions from './ModalActions';
import ModalContent from './ModalContent';
import ModalDescription from './ModalDescription';
import ModalDimmer from './ModalDimmer';
import ModalHeader from './ModalHeader';
import { canFit, getLegacyStyles, isLegacy } from './utils';

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
var Modal = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var actions = props.actions,
      basic = props.basic,
      centered = props.centered,
      children = props.children,
      className = props.className,
      closeIcon = props.closeIcon,
      closeOnDimmerClick = props.closeOnDimmerClick,
      closeOnDocumentClick = props.closeOnDocumentClick,
      content = props.content,
      dimmer = props.dimmer,
      eventPool = props.eventPool,
      header = props.header,
      size = props.size,
      style = props.style,
      trigger = props.trigger; // Do not access document when server side rendering

  var mountNode = isBrowser() ? props.mountNode || document.body : null;

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false
  }),
      open = _useAutoControlledVal[0],
      setOpen = _useAutoControlledVal[1];

  var _React$useState = React.useState({}),
      legacyStyles = _React$useState[0],
      setLegacyStyles = _React$useState[1];

  var _React$useState2 = React.useState(false),
      scrolling = _React$useState2[0],
      setScrolling = _React$useState2[1];

  var _React$useState3 = React.useState(function () {
    return isBrowser() && isLegacy();
  }),
      legacy = _React$useState3[0];

  var elementRef = useMergedRefs(ref, React.useRef());
  var dimmerRef = React.useRef();
  var animationRequestId = React.useRef();
  var latestDocumentMouseDownEvent = React.useRef();
  React.useEffect(function () {
    return function () {
      cancelAnimationFrame(animationRequestId.current);
      latestDocumentMouseDownEvent.current = null;
    };
  }, []); // ----------------------------------------
  // Styles calc
  // ----------------------------------------

  var setPositionAndClassNames = function setPositionAndClassNames() {
    if (elementRef.current) {
      var rect = elementRef.current.getBoundingClientRect();
      var isFitted = canFit(rect);
      setScrolling(!isFitted); // Styles should be computed for IE11

      var computedLegacyStyles = legacy ? getLegacyStyles(isFitted, centered, rect) : {};

      if (!shallowEqual(computedLegacyStyles, computedLegacyStyles)) {
        setLegacyStyles(computedLegacyStyles);
      }
    }

    animationRequestId.current = requestAnimationFrame(setPositionAndClassNames);
  }; // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------


  var handleClose = function handleClose(e) {
    setOpen(false);

    _invoke(props, 'onClose', e, _extends({}, props, {
      open: false
    }));
  };

  var handleDocumentMouseDown = function handleDocumentMouseDown(e) {
    latestDocumentMouseDownEvent.current = e;
  };

  var handleDocumentClick = function handleDocumentClick(e) {
    var currentDocumentMouseDownEvent = latestDocumentMouseDownEvent.current;
    latestDocumentMouseDownEvent.current = null;
    if (!closeOnDimmerClick || doesNodeContainClick(elementRef.current, currentDocumentMouseDownEvent) || doesNodeContainClick(elementRef.current, e)) return;
    setOpen(false);

    _invoke(props, 'onClose', e, _extends({}, props, {
      open: false
    }));
  };

  var handleOpen = function handleOpen(e) {
    setOpen(true);

    _invoke(props, 'onOpen', e, _extends({}, props, {
      open: true
    }));
  };

  var handlePortalMount = function handlePortalMount(e) {
    setScrolling(false);
    setPositionAndClassNames();
    eventStack.sub('mousedown', handleDocumentMouseDown, {
      pool: eventPool,
      target: dimmerRef.current
    });
    eventStack.sub('click', handleDocumentClick, {
      pool: eventPool,
      target: dimmerRef.current
    });

    _invoke(props, 'onMount', e, props);
  };

  var handlePortalUnmount = function handlePortalUnmount(e) {
    cancelAnimationFrame(animationRequestId.current);
    eventStack.unsub('mousedown', handleDocumentMouseDown, {
      pool: eventPool,
      target: dimmerRef.current
    });
    eventStack.unsub('click', handleDocumentClick, {
      pool: eventPool,
      target: dimmerRef.current
    });

    _invoke(props, 'onUnmount', e, props);
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var renderContent = function renderContent(rest) {
    var classes = cx('ui', size, useKeyOnly(basic, 'basic'), useKeyOnly(legacy, 'legacy'), useKeyOnly(scrolling, 'scrolling'), 'modal transition visible active', className);
    var ElementType = getElementType(Modal, props);
    var closeIconName = closeIcon === true ? 'close' : closeIcon;
    var closeIconJSX = Icon.create(closeIconName, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onClick: function onClick(e) {
            _invoke(predefinedProps, 'onClick', e);

            handleClose(e);
          }
        };
      }
    });
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      ref: elementRef,
      style: _extends({}, legacyStyles, style)
    }), closeIconJSX, childrenUtils.isNil(children) ? /*#__PURE__*/React.createElement(React.Fragment, null, ModalHeader.create(header, {
      autoGenerateKey: false
    }), ModalContent.create(content, {
      autoGenerateKey: false
    }), ModalActions.create(actions, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onActionClick: function onActionClick(e, actionProps) {
            _invoke(predefinedProps, 'onActionClick', e, actionProps);

            _invoke(props, 'onActionClick', e, props);

            handleClose(e);
          }
        };
      }
    })) : children);
  }; // Short circuit when server side rendering


  renderContent.handledProps = [];

  if (!isBrowser()) {
    return /*#__PURE__*/React.isValidElement(trigger) ? trigger : null;
  }

  var unhandled = getUnhandledProps(Modal, props);
  var portalPropNames = Portal.handledProps;

  var rest = _reduce(unhandled, function (acc, val, key) {
    if (!_includes(portalPropNames, key)) acc[key] = val;
    return acc;
  }, {});

  var portalProps = _pick(unhandled, portalPropNames); // Heads up!
  //
  // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
  // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
  //
  // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
  // We need the immediate child to be the dimmer to :not() blur the modal itself!
  // Otherwise, the portal div is also blurred, blurring the modal.
  //
  // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.


  return /*#__PURE__*/React.createElement(Portal, _extends({
    closeOnDocumentClick: closeOnDocumentClick
  }, portalProps, {
    trigger: trigger,
    eventPool: eventPool,
    mountNode: mountNode,
    open: open,
    onClose: handleClose,
    onMount: handlePortalMount,
    onOpen: handleOpen,
    onUnmount: handlePortalUnmount
  }), ModalDimmer.create(_isPlainObject(dimmer) ? dimmer : {}, {
    autoGenerateKey: false,
    defaultProps: {
      blurring: dimmer === 'blurring',
      inverted: dimmer === 'inverted'
    },
    overrideProps: {
      children: renderContent(rest),
      centered: centered,
      mountNode: mountNode,
      scrolling: scrolling,
      ref: dimmerRef
    }
  }));
});
Modal.handledProps = ["actions", "as", "basic", "centered", "children", "className", "closeIcon", "closeOnDimmerClick", "closeOnDocumentClick", "content", "defaultOpen", "dimmer", "eventPool", "header", "mountNode", "onActionClick", "onClose", "onMount", "onOpen", "onUnmount", "open", "size", "style", "trigger"];
Modal.displayName = 'Modal';
Modal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
  actions: customPropTypes.itemShorthand,

  /** A modal can reduce its complexity */
  basic: PropTypes.bool,

  /** A modal can be vertically centered in the viewport */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for the close icon. Closes the modal on click. */
  closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick: PropTypes.bool,

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick: PropTypes.bool,

  /** Simple text content for the Modal. */
  content: customPropTypes.itemShorthand,

  /** Initial value of open. */
  defaultOpen: PropTypes.bool,

  /** A Modal can appear in a dimmer. */
  dimmer: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object, PropTypes.oneOf(['inverted', 'blurring'])]),

  /** Event pool namespace that is used to handle component events */
  eventPool: PropTypes.string,

  /** Modal displayed above the content in bold. */
  header: customPropTypes.itemShorthand,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: PropTypes.any,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onActionClick: PropTypes.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: PropTypes.func,

  /**
   * Called when the modal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: PropTypes.func,

  /**
   * Called when the modal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func,

  /** Controls whether or not the Modal is displayed. */
  open: PropTypes.bool,

  /** A modal can vary in size */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

  /** Custom styles. */
  style: PropTypes.object,

  /** Element to be rendered in-place where the modal is defined. */
  trigger: PropTypes.node
  /**
   * NOTE: Any unhandled props that are defined in Modal are passed-through
   * to the inner Portal.
   */

} : {};
Modal.defaultProps = {
  centered: true,
  dimmer: true,
  closeOnDimmerClick: true,
  closeOnDocumentClick: false,
  eventPool: 'Modal'
};
Modal.Actions = ModalActions;
Modal.Content = ModalContent;
Modal.Description = ModalDescription;
Modal.Dimmer = ModalDimmer;
Modal.Header = ModalHeader;
export default Modal;