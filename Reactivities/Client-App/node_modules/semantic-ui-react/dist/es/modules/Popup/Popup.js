import _extends from "@babel/runtime/helpers/esm/extends";
import _without from "lodash-es/without";
import _isNil from "lodash-es/isNil";
import _isUndefined from "lodash-es/isUndefined";
import _isElement from "lodash-es/isElement";
import _invoke from "lodash-es/invoke";
import _pick from "lodash-es/pick";
import _reduce from "lodash-es/reduce";
import _includes from "lodash-es/includes";
import _isArray from "lodash-es/isArray";
import EventStack from '@semantic-ui-react/event-stack';
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Popper } from 'react-popper';
import shallowEqual from 'shallowequal';
import { childrenUtils, createHTMLDivision, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey, useIsomorphicLayoutEffect, useMergedRefs, usePrevious } from '../../lib';
import Portal from '../../addons/Portal';
import { placementMapping, positions, positionsMapping } from './lib/positions';
import createReferenceProxy from './lib/createReferenceProxy';
import PopupContent from './PopupContent';
import PopupHeader from './PopupHeader';

/**
 * Calculates props specific for Portal component.
 *
 * @param {Object} props
 */
function getPortalProps(props) {
  var portalProps = {};
  var normalizedOn = _isArray(props.on) ? props.on : [props.on];

  if (props.hoverable) {
    portalProps.closeOnPortalMouseLeave = true;
    portalProps.mouseLeaveDelay = 300;
  }

  if (_includes(normalizedOn, 'hover')) {
    portalProps.openOnTriggerClick = false;
    portalProps.closeOnTriggerClick = false;
    portalProps.openOnTriggerMouseEnter = true;
    portalProps.closeOnTriggerMouseLeave = true; // Taken from SUI: https://git.io/vPmCm

    portalProps.mouseLeaveDelay = 70;
    portalProps.mouseEnterDelay = 50;
  }

  if (_includes(normalizedOn, 'click')) {
    portalProps.openOnTriggerClick = true;
    portalProps.closeOnTriggerClick = true;
    portalProps.closeOnDocumentClick = true;
  }

  if (_includes(normalizedOn, 'focus')) {
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

  var contentRestProps = _reduce(unhandledProps, function (acc, val, key) {
    if (!_includes(Portal.handledProps, key)) acc[key] = val;
    return acc;
  }, {});

  var portalRestProps = _pick(unhandledProps, Portal.handledProps);

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
  var previousDependencies = usePrevious(popperDependencies);
  useIsomorphicLayoutEffect(function () {
    if (positionUpdate.current) {
      positionUpdate.current();
    }
  }, [shallowEqual(previousDependencies, popperDependencies)]);
}
/**
 * A Popup displays additional information on top of a page.
 */


var Popup = /*#__PURE__*/React.forwardRef(function (props, ref) {
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

  var _React$useState = React.useState(false),
      closed = _React$useState[0],
      setClosed = _React$useState[1];

  var unhandledProps = getUnhandledProps(Popup, props);

  var _partitionPortalProps = partitionPortalProps(unhandledProps, closed, disabled),
      contentRestProps = _partitionPortalProps.contentRestProps,
      portalRestProps = _partitionPortalProps.portalRestProps;

  var elementRef = useMergedRefs(ref);
  var positionUpdate = React.useRef();
  var timeoutId = React.useRef();
  var triggerRef = React.useRef();
  var zIndexWasSynced = React.useRef(false); // ----------------------------------------
  // Effects
  // ----------------------------------------

  usePositioningEffect(popperDependencies, positionUpdate);
  React.useEffect(function () {
    return function () {
      clearTimeout(timeoutId.current);
    };
  }, []); // ----------------------------------------
  // Handlers
  // ----------------------------------------

  var handleClose = function handleClose(e) {
    _invoke(props, 'onClose', e, _extends({}, props, {
      open: false
    }));
  };

  var handleOpen = function handleOpen(e) {
    _invoke(props, 'onOpen', e, _extends({}, props, {
      open: true
    }));
  };

  var hideOnScroll = function hideOnScroll(e) {
    // Do not hide the popup when scroll comes from inside the popup
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/4305
    if (_isElement(e.target) && elementRef.current.contains(e.target)) {
      return;
    }

    setClosed(true);
    timeoutId.current = setTimeout(function () {
      setClosed(false);
    }, 50);
    handleClose(e);
  };

  var handlePortalMount = function handlePortalMount(e) {
    _invoke(props, 'onMount', e, props);
  };

  var handlePortalUnmount = function handlePortalUnmount(e) {
    positionUpdate.current = null;

    _invoke(props, 'onUnmount', e, props);
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var renderBody = function renderBody(_ref) {
    var popperPlacement = _ref.placement,
        popperRef = _ref.ref,
        update = _ref.update,
        popperStyle = _ref.style;
    positionUpdate.current = update;
    var classes = cx('ui', placementMapping[popperPlacement], size, useKeyOrValueAndKey(wide, 'wide'), useKeyOnly(basic, 'basic'), useKeyOnly(flowing, 'flowing'), useKeyOnly(inverted, 'inverted'), 'popup transition visible', className);
    var ElementType = getElementType(Popup, props);

    var styles = _extends({
      // Heads up! We need default styles to get working correctly `flowing`
      left: 'auto',
      right: 'auto',
      // This is required to be properly positioned inside wrapping `div`
      position: 'initial'
    }, style);

    var innerElement = /*#__PURE__*/React.createElement(ElementType, _extends({}, contentRestProps, {
      className: classes,
      style: styles,
      ref: elementRef
    }), childrenUtils.isNil(children) ? /*#__PURE__*/React.createElement(React.Fragment, null, PopupHeader.create(header, {
      autoGenerateKey: false
    }), PopupContent.create(content, {
      autoGenerateKey: false
    })) : children, hideOnScroll && /*#__PURE__*/React.createElement(EventStack, {
      on: hideOnScroll,
      name: "scroll",
      target: "window"
    })); // https://github.com/popperjs/popper-core/blob/f1f9d1ab75b6b0e962f90a5b2a50f6cfd307d794/src/createPopper.js#L136-L137
    // Heads up!
    // A wrapping `div` there is a pure magic, it's required as Popper warns on margins that are
    // defined by SUI CSS. It also means that this `div` will be positioned instead of `content`.

    return createHTMLDivision(popper || {}, {
      overrideProps: {
        children: innerElement,
        ref: popperRef,
        style: _extends({
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

      if (_isUndefined(definedZIndex)) {
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
  var referenceElement = createReferenceProxy(_isNil(context) ? triggerRef : context);

  var mergedPortalProps = _extends({}, getPortalProps(props), portalRestProps);

  return /*#__PURE__*/React.createElement(Portal, _extends({}, mergedPortalProps, {
    onClose: handleClose,
    onMount: handlePortalMount,
    onOpen: handleOpen,
    onUnmount: handlePortalUnmount,
    trigger: trigger,
    triggerRef: triggerRef
  }), /*#__PURE__*/React.createElement(Popper, {
    modifiers: modifiers,
    placement: positionsMapping[position],
    strategy: positionFixed ? 'fixed' : null,
    referenceElement: referenceElement
  }, renderBody));
});
Popup.handledProps = ["as", "basic", "children", "className", "content", "context", "disabled", "eventsEnabled", "flowing", "header", "hideOnScroll", "hoverable", "inverted", "offset", "on", "onClose", "onMount", "onOpen", "onUnmount", "pinned", "popper", "popperDependencies", "popperModifiers", "position", "positionFixed", "size", "style", "trigger", "wide"];
Popup.displayName = 'Popup';
Popup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Display the popup without the pointing arrow. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Simple text content for the popover. */
  content: customPropTypes.itemShorthand,

  /** Existing element the pop-up should be bound to. */
  context: PropTypes.oneOfType([PropTypes.object, customPropTypes.refObject]),

  /** A disabled popup only renders its trigger. */
  disabled: PropTypes.bool,

  /** Enables the Popper.js event listeners. */
  eventsEnabled: PropTypes.bool,

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing: PropTypes.bool,

  /** Takes up the entire width of its offset container. */
  // TODO: implement the Popup fluid layout
  // fluid: PropTypes.bool,

  /** Header displayed above the content in bold. */
  header: customPropTypes.itemShorthand,

  /** Hide the Popup when scrolling the window. */
  hideOnScroll: PropTypes.bool,

  /** Whether the popup should not close on hover. */
  hoverable: PropTypes.bool,

  /** Invert the colors of the Popup. */
  inverted: PropTypes.bool,

  /**
   * Offset values in px unit to apply to rendered popup. The basic offset accepts an
   * array with two numbers in the form [skidding, distance]:
   * - `skidding` displaces the Popup along the reference element
   * - `distance` displaces the Popup away from, or toward, the reference element in the direction of its placement. A positive number displaces it further away, while a negative number lets it overlap the reference.
   *
   * @see https://popper.js.org/docs/v2/modifiers/offset/
   */
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.number)]),

  /** Events triggering the popup. */
  on: PropTypes.oneOfType([PropTypes.oneOf(['hover', 'click', 'focus']), PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus']))]),

  /**
   * Called when a close event happens.
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
   * Called when an open event happens.
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

  /** Disables automatic repositioning of the component, it will always be placed according to the position value. */
  pinned: PropTypes.bool,

  /** Position for the popover. */
  position: PropTypes.oneOf(positions),

  /** Tells `Popper.js` to use the `position: fixed` strategy to position the popover. */
  positionFixed: PropTypes.bool,

  /** A wrapping element for an actual content that will be used for positioning. */
  popper: customPropTypes.itemShorthand,

  /** An array containing custom settings for the Popper.js modifiers. */
  popperModifiers: PropTypes.array,

  /** A popup can have dependencies which update will schedule a position update. */
  popperDependencies: PropTypes.array,

  /** Popup size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big', 'massive')),

  /** Custom Popup style. */
  style: PropTypes.object,

  /** Element to be rendered in-place where the popup is defined. */
  trigger: PropTypes.node,

  /** Popup width. */
  wide: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])])
} : {};
Popup.defaultProps = {
  disabled: false,
  eventsEnabled: true,
  on: ['click', 'hover'],
  pinned: false,
  popperModifiers: [],
  position: 'top left'
};
Popup.Content = PopupContent;
Popup.Header = PopupHeader;
export default Popup;