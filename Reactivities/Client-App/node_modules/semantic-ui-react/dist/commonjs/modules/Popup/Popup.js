"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isElement2 = _interopRequireDefault(require("lodash/isElement"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _eventStack = _interopRequireDefault(require("@semantic-ui-react/event-stack"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactPopper = require("react-popper");

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _lib = require("../../lib");

var _Portal = _interopRequireDefault(require("../../addons/Portal"));

var _positions = require("./lib/positions");

var _createReferenceProxy = _interopRequireDefault(require("./lib/createReferenceProxy"));

var _PopupContent = _interopRequireDefault(require("./PopupContent"));

var _PopupHeader = _interopRequireDefault(require("./PopupHeader"));

/**
 * Calculates props specific for Portal component.
 *
 * @param {Object} props
 */
function getPortalProps(props) {
  var portalProps = {};
  var normalizedOn = (0, _isArray2.default)(props.on) ? props.on : [props.on];

  if (props.hoverable) {
    portalProps.closeOnPortalMouseLeave = true;
    portalProps.mouseLeaveDelay = 300;
  }

  if ((0, _includes2.default)(normalizedOn, 'hover')) {
    portalProps.openOnTriggerClick = false;
    portalProps.closeOnTriggerClick = false;
    portalProps.openOnTriggerMouseEnter = true;
    portalProps.closeOnTriggerMouseLeave = true; // Taken from SUI: https://git.io/vPmCm

    portalProps.mouseLeaveDelay = 70;
    portalProps.mouseEnterDelay = 50;
  }

  if ((0, _includes2.default)(normalizedOn, 'click')) {
    portalProps.openOnTriggerClick = true;
    portalProps.closeOnTriggerClick = true;
    portalProps.closeOnDocumentClick = true;
  }

  if ((0, _includes2.default)(normalizedOn, 'focus')) {
    portalProps.openOnTriggerFocus = true;
    portalProps.closeOnTriggerBlur = true;
  }

  return portalProps;
}
/**
 * Splits props for Portal & Popup.
 *
 * @param {Object} unhandledProps
 * @param {Boolean} closed
 * @param {Boolean} disabled
 */


function partitionPortalProps(unhandledProps, closed, disabled) {
  if (closed || disabled) {
    return {};
  }

  var contentRestProps = (0, _reduce2.default)(unhandledProps, function (acc, val, key) {
    if (!(0, _includes2.default)(_Portal.default.handledProps, key)) acc[key] = val;
    return acc;
  }, {});
  var portalRestProps = (0, _pick2.default)(unhandledProps, _Portal.default.handledProps);
  return {
    contentRestProps: contentRestProps,
    portalRestProps: portalRestProps
  };
}
/**
 * Performs updates when "popperDependencies" are not shallow equal.
 *
 * @param {Array} popperDependencies
 * @param {React.Ref} positionUpdate
 */


function usePositioningEffect(popperDependencies, positionUpdate) {
  var previousDependencies = (0, _lib.usePrevious)(popperDependencies);
  (0, _lib.useIsomorphicLayoutEffect)(function () {
    if (positionUpdate.current) {
      positionUpdate.current();
    }
  }, [(0, _shallowequal.default)(previousDependencies, popperDependencies)]);
}
/**
 * A Popup displays additional information on top of a page.
 */


var Popup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var basic = props.basic,
      className = props.className,
      content = props.content,
      context = props.context,
      children = props.children,
      disabled = props.disabled,
      eventsEnabled = props.eventsEnabled,
      flowing = props.flowing,
      header = props.header,
      inverted = props.inverted,
      offset = props.offset,
      pinned = props.pinned,
      popper = props.popper,
      popperDependencies = props.popperDependencies,
      popperModifiers = props.popperModifiers,
      position = props.position,
      positionFixed = props.positionFixed,
      size = props.size,
      style = props.style,
      trigger = props.trigger,
      wide = props.wide;

  var _React$useState = _react.default.useState(false),
      closed = _React$useState[0],
      setClosed = _React$useState[1];

  var unhandledProps = (0, _lib.getUnhandledProps)(Popup, props);

  var _partitionPortalProps = partitionPortalProps(unhandledProps, closed, disabled),
      contentRestProps = _partitionPortalProps.contentRestProps,
      portalRestProps = _partitionPortalProps.portalRestProps;

  var elementRef = (0, _lib.useMergedRefs)(ref);

  var positionUpdate = _react.default.useRef();

  var timeoutId = _react.default.useRef();

  var triggerRef = _react.default.useRef();

  var zIndexWasSynced = _react.default.useRef(false); // ----------------------------------------
  // Effects
  // ----------------------------------------


  usePositioningEffect(popperDependencies, positionUpdate);

  _react.default.useEffect(function () {
    return function () {
      clearTimeout(timeoutId.current);
    };
  }, []); // ----------------------------------------
  // Handlers
  // ----------------------------------------


  var handleClose = function handleClose(e) {
    (0, _invoke2.default)(props, 'onClose', e, (0, _extends2.default)({}, props, {
      open: false
    }));
  };

  var handleOpen = function handleOpen(e) {
    (0, _invoke2.default)(props, 'onOpen', e, (0, _extends2.default)({}, props, {
      open: true
    }));
  };

  var hideOnScroll = function hideOnScroll(e) {
    // Do not hide the popup when scroll comes from inside the popup
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/4305
    if ((0, _isElement2.default)(e.target) && elementRef.current.contains(e.target)) {
      return;
    }

    setClosed(true);
    timeoutId.current = setTimeout(function () {
      setClosed(false);
    }, 50);
    handleClose(e);
  };

  var handlePortalMount = function handlePortalMount(e) {
    (0, _invoke2.default)(props, 'onMount', e, props);
  };

  var handlePortalUnmount = function handlePortalUnmount(e) {
    positionUpdate.current = null;
    (0, _invoke2.default)(props, 'onUnmount', e, props);
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var renderBody = function renderBody(_ref) {
    var popperPlacement = _ref.placement,
        popperRef = _ref.ref,
        update = _ref.update,
        popperStyle = _ref.style;
    positionUpdate.current = update;
    var classes = (0, _clsx.default)('ui', _positions.placementMapping[popperPlacement], size, (0, _lib.useKeyOrValueAndKey)(wide, 'wide'), (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(flowing, 'flowing'), (0, _lib.useKeyOnly)(inverted, 'inverted'), 'popup transition visible', className);
    var ElementType = (0, _lib.getElementType)(Popup, props);
    var styles = (0, _extends2.default)({
      // Heads up! We need default styles to get working correctly `flowing`
      left: 'auto',
      right: 'auto',
      // This is required to be properly positioned inside wrapping `div`
      position: 'initial'
    }, style);

    var innerElement = /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, contentRestProps, {
      className: classes,
      style: styles,
      ref: elementRef
    }), _lib.childrenUtils.isNil(children) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _PopupHeader.default.create(header, {
      autoGenerateKey: false
    }), _PopupContent.default.create(content, {
      autoGenerateKey: false
    })) : children, hideOnScroll && /*#__PURE__*/_react.default.createElement(_eventStack.default, {
      on: hideOnScroll,
      name: "scroll",
      target: "window"
    })); // https://github.com/popperjs/popper-core/blob/f1f9d1ab75b6b0e962f90a5b2a50f6cfd307d794/src/createPopper.js#L136-L137
    // Heads up!
    // A wrapping `div` there is a pure magic, it's required as Popper warns on margins that are
    // defined by SUI CSS. It also means that this `div` will be positioned instead of `content`.


    return (0, _lib.createHTMLDivision)(popper || {}, {
      overrideProps: {
        children: innerElement,
        ref: popperRef,
        style: (0, _extends2.default)({
          // Fixes layout for floated elements
          // https://github.com/Semantic-Org/Semantic-UI-React/issues/4092
          display: 'flex'
        }, popperStyle)
      }
    });
  };

  renderBody.handledProps = [];

  if (closed || disabled) {
    return trigger;
  }

  var modifiers = [{
    name: 'arrow',
    enabled: false
  }, {
    name: 'eventListeners',
    options: {
      scroll: !!eventsEnabled,
      resize: !!eventsEnabled
    }
  }, {
    name: 'flip',
    enabled: !pinned
  }, {
    name: 'preventOverflow',
    enabled: !!offset
  }, {
    name: 'offset',
    enabled: !!offset,
    options: {
      offset: offset
    }
  }].concat(popperModifiers, [// We are syncing zIndex from `.ui.popup.content` to avoid layering issues as in SUIR we are using an additional
  // `div` for Popper.js
  // https://github.com/Semantic-Org/Semantic-UI-React/issues/4083
  {
    name: 'syncZIndex',
    enabled: true,
    phase: 'beforeRead',
    fn: function fn(_ref2) {
      var _popper$style;

      var state = _ref2.state;

      if (zIndexWasSynced.current) {
        return;
      } // if zIndex defined in <Popup popper={{ style: {} }} /> there is no sense to override it


      var definedZIndex = popper == null ? void 0 : (_popper$style = popper.style) == null ? void 0 : _popper$style.zIndex;

      if ((0, _isUndefined2.default)(definedZIndex)) {
        // eslint-disable-next-line no-param-reassign
        state.elements.popper.style.zIndex = window.getComputedStyle(state.elements.popper.firstChild).zIndex;
      }

      zIndexWasSynced.current = true;
    },
    effect: function effect() {
      return function () {
        zIndexWasSynced.current = false;
      };
    }
  }]);
  var referenceElement = (0, _createReferenceProxy.default)((0, _isNil2.default)(context) ? triggerRef : context);
  var mergedPortalProps = (0, _extends2.default)({}, getPortalProps(props), portalRestProps);
  return /*#__PURE__*/_react.default.createElement(_Portal.default, (0, _extends2.default)({}, mergedPortalProps, {
    onClose: handleClose,
    onMount: handlePortalMount,
    onOpen: handleOpen,
    onUnmount: handlePortalUnmount,
    trigger: trigger,
    triggerRef: triggerRef
  }), /*#__PURE__*/_react.default.createElement(_reactPopper.Popper, {
    modifiers: modifiers,
    placement: _positions.positionsMapping[position],
    strategy: positionFixed ? 'fixed' : null,
    referenceElement: referenceElement
  }, renderBody));
});

Popup.handledProps = ["as", "basic", "children", "className", "content", "context", "disabled", "eventsEnabled", "flowing", "header", "hideOnScroll", "hoverable", "inverted", "offset", "on", "onClose", "onMount", "onOpen", "onUnmount", "pinned", "popper", "popperDependencies", "popperModifiers", "position", "positionFixed", "size", "style", "trigger", "wide"];
Popup.displayName = 'Popup';
Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Display the popup without the pointing arrow. */
  basic: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Simple text content for the popover. */
  content: _lib.customPropTypes.itemShorthand,

  /** Existing element the pop-up should be bound to. */
  context: _propTypes.default.oneOfType([_propTypes.default.object, _lib.customPropTypes.refObject]),

  /** A disabled popup only renders its trigger. */
  disabled: _propTypes.default.bool,

  /** Enables the Popper.js event listeners. */
  eventsEnabled: _propTypes.default.bool,

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing: _propTypes.default.bool,

  /** Takes up the entire width of its offset container. */
  // TODO: implement the Popup fluid layout
  // fluid: PropTypes.bool,

  /** Header displayed above the content in bold. */
  header: _lib.customPropTypes.itemShorthand,

  /** Hide the Popup when scrolling the window. */
  hideOnScroll: _propTypes.default.bool,

  /** Whether the popup should not close on hover. */
  hoverable: _propTypes.default.bool,

  /** Invert the colors of the Popup. */
  inverted: _propTypes.default.bool,

  /**
   * Offset values in px unit to apply to rendered popup. The basic offset accepts an
   * array with two numbers in the form [skidding, distance]:
   * - `skidding` displaces the Popup along the reference element
   * - `distance` displaces the Popup away from, or toward, the reference element in the direction of its placement. A positive number displaces it further away, while a negative number lets it overlap the reference.
   *
   * @see https://popper.js.org/docs/v2/modifiers/offset/
   */
  offset: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.arrayOf(_propTypes.default.number)]),

  /** Events triggering the popup. */
  on: _propTypes.default.oneOfType([_propTypes.default.oneOf(['hover', 'click', 'focus']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['hover', 'click', 'focus']))]),

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: _propTypes.default.func,

  /**
   * Called when the portal is mounted on the DOM.
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
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: _propTypes.default.func,

  /** Disables automatic repositioning of the component, it will always be placed according to the position value. */
  pinned: _propTypes.default.bool,

  /** Position for the popover. */
  position: _propTypes.default.oneOf(_positions.positions),

  /** Tells `Popper.js` to use the `position: fixed` strategy to position the popover. */
  positionFixed: _propTypes.default.bool,

  /** A wrapping element for an actual content that will be used for positioning. */
  popper: _lib.customPropTypes.itemShorthand,

  /** An array containing custom settings for the Popper.js modifiers. */
  popperModifiers: _propTypes.default.array,

  /** A popup can have dependencies which update will schedule a position update. */
  popperDependencies: _propTypes.default.array,

  /** Popup size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium', 'big', 'massive')),

  /** Custom Popup style. */
  style: _propTypes.default.object,

  /** Element to be rendered in-place where the popup is defined. */
  trigger: _propTypes.default.node,

  /** Popup width. */
  wide: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])])
} : {};
Popup.defaultProps = {
  disabled: false,
  eventsEnabled: true,
  on: ['click', 'hover'],
  pinned: false,
  popperModifiers: [],
  position: 'top left'
};
Popup.Content = _PopupContent.default;
Popup.Header = _PopupHeader.default;
var _default = Popup;
exports.default = _default;