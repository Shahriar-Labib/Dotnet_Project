"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

var _Portal = _interopRequireDefault(require("../../addons/Portal"));

var _ModalActions = _interopRequireDefault(require("./ModalActions"));

var _ModalContent = _interopRequireDefault(require("./ModalContent"));

var _ModalDescription = _interopRequireDefault(require("./ModalDescription"));

var _ModalDimmer = _interopRequireDefault(require("./ModalDimmer"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

var _utils = require("./utils");

/**
 * A modal displays content that temporarily blocks interactions with the main view of a site.
 * @see Confirm
 * @see Portal
 */
var Modal = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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

  var mountNode = (0, _lib.isBrowser)() ? props.mountNode || document.body : null;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false
  }),
      open = _useAutoControlledVal[0],
      setOpen = _useAutoControlledVal[1];

  var _React$useState = _react.default.useState({}),
      legacyStyles = _React$useState[0],
      setLegacyStyles = _React$useState[1];

  var _React$useState2 = _react.default.useState(false),
      scrolling = _React$useState2[0],
      setScrolling = _React$useState2[1];

  var _React$useState3 = _react.default.useState(function () {
    return (0, _lib.isBrowser)() && (0, _utils.isLegacy)();
  }),
      legacy = _React$useState3[0];

  var elementRef = (0, _lib.useMergedRefs)(ref, _react.default.useRef());

  var dimmerRef = _react.default.useRef();

  var animationRequestId = _react.default.useRef();

  var latestDocumentMouseDownEvent = _react.default.useRef();

  _react.default.useEffect(function () {
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
      var isFitted = (0, _utils.canFit)(rect);
      setScrolling(!isFitted); // Styles should be computed for IE11

      var computedLegacyStyles = legacy ? (0, _utils.getLegacyStyles)(isFitted, centered, rect) : {};

      if (!(0, _shallowequal.default)(computedLegacyStyles, computedLegacyStyles)) {
        setLegacyStyles(computedLegacyStyles);
      }
    }

    animationRequestId.current = requestAnimationFrame(setPositionAndClassNames);
  }; // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------


  var handleClose = function handleClose(e) {
    setOpen(false);
    (0, _invoke2.default)(props, 'onClose', e, (0, _extends2.default)({}, props, {
      open: false
    }));
  };

  var handleDocumentMouseDown = function handleDocumentMouseDown(e) {
    latestDocumentMouseDownEvent.current = e;
  };

  var handleDocumentClick = function handleDocumentClick(e) {
    var currentDocumentMouseDownEvent = latestDocumentMouseDownEvent.current;
    latestDocumentMouseDownEvent.current = null;
    if (!closeOnDimmerClick || (0, _lib.doesNodeContainClick)(elementRef.current, currentDocumentMouseDownEvent) || (0, _lib.doesNodeContainClick)(elementRef.current, e)) return;
    setOpen(false);
    (0, _invoke2.default)(props, 'onClose', e, (0, _extends2.default)({}, props, {
      open: false
    }));
  };

  var handleOpen = function handleOpen(e) {
    setOpen(true);
    (0, _invoke2.default)(props, 'onOpen', e, (0, _extends2.default)({}, props, {
      open: true
    }));
  };

  var handlePortalMount = function handlePortalMount(e) {
    setScrolling(false);
    setPositionAndClassNames();

    _lib.eventStack.sub('mousedown', handleDocumentMouseDown, {
      pool: eventPool,
      target: dimmerRef.current
    });

    _lib.eventStack.sub('click', handleDocumentClick, {
      pool: eventPool,
      target: dimmerRef.current
    });

    (0, _invoke2.default)(props, 'onMount', e, props);
  };

  var handlePortalUnmount = function handlePortalUnmount(e) {
    cancelAnimationFrame(animationRequestId.current);

    _lib.eventStack.unsub('mousedown', handleDocumentMouseDown, {
      pool: eventPool,
      target: dimmerRef.current
    });

    _lib.eventStack.unsub('click', handleDocumentClick, {
      pool: eventPool,
      target: dimmerRef.current
    });

    (0, _invoke2.default)(props, 'onUnmount', e, props);
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var renderContent = function renderContent(rest) {
    var classes = (0, _clsx.default)('ui', size, (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(legacy, 'legacy'), (0, _lib.useKeyOnly)(scrolling, 'scrolling'), 'modal transition visible active', className);
    var ElementType = (0, _lib.getElementType)(Modal, props);
    var closeIconName = closeIcon === true ? 'close' : closeIcon;

    var closeIconJSX = _Icon.default.create(closeIconName, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onClick: function onClick(e) {
            (0, _invoke2.default)(predefinedProps, 'onClick', e);
            handleClose(e);
          }
        };
      }
    });

    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      ref: elementRef,
      style: (0, _extends2.default)({}, legacyStyles, style)
    }), closeIconJSX, _lib.childrenUtils.isNil(children) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _ModalHeader.default.create(header, {
      autoGenerateKey: false
    }), _ModalContent.default.create(content, {
      autoGenerateKey: false
    }), _ModalActions.default.create(actions, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onActionClick: function onActionClick(e, actionProps) {
            (0, _invoke2.default)(predefinedProps, 'onActionClick', e, actionProps);
            (0, _invoke2.default)(props, 'onActionClick', e, props);
            handleClose(e);
          }
        };
      }
    })) : children);
  }; // Short circuit when server side rendering


  renderContent.handledProps = [];

  if (!(0, _lib.isBrowser)()) {
    return /*#__PURE__*/_react.default.isValidElement(trigger) ? trigger : null;
  }

  var unhandled = (0, _lib.getUnhandledProps)(Modal, props);
  var portalPropNames = _Portal.default.handledProps;
  var rest = (0, _reduce2.default)(unhandled, function (acc, val, key) {
    if (!(0, _includes2.default)(portalPropNames, key)) acc[key] = val;
    return acc;
  }, {});
  var portalProps = (0, _pick2.default)(unhandled, portalPropNames); // Heads up!
  //
  // The SUI CSS selector to prevent the modal itself from blurring requires an immediate .dimmer child:
  // .blurring.dimmed.dimmable>:not(.dimmer) { ... }
  //
  // The .blurring.dimmed.dimmable is the body, so that all body content inside is blurred.
  // We need the immediate child to be the dimmer to :not() blur the modal itself!
  // Otherwise, the portal div is also blurred, blurring the modal.
  //
  // We cannot them wrap the modalJSX in an actual <Dimmer /> instead, we apply the dimmer classes to the <Portal />.

  return /*#__PURE__*/_react.default.createElement(_Portal.default, (0, _extends2.default)({
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
  }), _ModalDimmer.default.create((0, _isPlainObject2.default)(dimmer) ? dimmer : {}, {
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
  as: _propTypes.default.elementType,

  /** Shorthand for Modal.Actions. Typically an array of button shorthand. */
  actions: _lib.customPropTypes.itemShorthand,

  /** A modal can reduce its complexity */
  basic: _propTypes.default.bool,

  /** A modal can be vertically centered in the viewport */
  centered: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for the close icon. Closes the modal on click. */
  closeIcon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object, _propTypes.default.bool]),

  /** Whether or not the Modal should close when the dimmer is clicked. */
  closeOnDimmerClick: _propTypes.default.bool,

  /** Whether or not the Modal should close when the document is clicked. */
  closeOnDocumentClick: _propTypes.default.bool,

  /** Simple text content for the Modal. */
  content: _lib.customPropTypes.itemShorthand,

  /** Initial value of open. */
  defaultOpen: _propTypes.default.bool,

  /** A Modal can appear in a dimmer. */
  dimmer: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func, _propTypes.default.object, _propTypes.default.oneOf(['inverted', 'blurring'])]),

  /** Event pool namespace that is used to handle component events */
  eventPool: _propTypes.default.string,

  /** Modal displayed above the content in bold. */
  header: _lib.customPropTypes.itemShorthand,

  /** The node where the modal should mount. Defaults to document.body. */
  mountNode: _propTypes.default.any,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onActionClick: _propTypes.default.func,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: _propTypes.default.func,

  /**
   * Called when the modal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: _propTypes.default.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: _propTypes.default.func,

  /**
   * Called when the modal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: _propTypes.default.func,

  /** Controls whether or not the Modal is displayed. */
  open: _propTypes.default.bool,

  /** A modal can vary in size */
  size: _propTypes.default.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),

  /** Custom styles. */
  style: _propTypes.default.object,

  /** Element to be rendered in-place where the modal is defined. */
  trigger: _propTypes.default.node
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
Modal.Actions = _ModalActions.default;
Modal.Content = _ModalContent.default;
Modal.Description = _ModalDescription.default;
Modal.Dimmer = _ModalDimmer.default;
Modal.Header = _ModalHeader.default;
var _default = Modal;
exports.default = _default;