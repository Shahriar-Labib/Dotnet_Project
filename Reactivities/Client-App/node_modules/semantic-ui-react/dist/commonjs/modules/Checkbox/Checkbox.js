"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 * @see Form
 * @see Radio
 */
var Checkbox = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
      disabled = props.disabled,
      label = props.label,
      id = props.id,
      name = props.name,
      radio = props.radio,
      readOnly = props.readOnly,
      slider = props.slider,
      tabIndex = props.tabIndex,
      toggle = props.toggle,
      type = props.type,
      value = props.value;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.checked,
    defaultState: props.defaultChecked,
    initialState: false
  }),
      checked = _useAutoControlledVal[0],
      setChecked = _useAutoControlledVal[1];

  var _useAutoControlledVal2 = (0, _lib.useAutoControlledValue)({
    state: props.indeterminate,
    defaultState: props.defaultIndeterminate,
    initialState: false
  }),
      indeterminate = _useAutoControlledVal2[0],
      setIndeterminate = _useAutoControlledVal2[1];

  var inputRef = (0, _lib.useMergedRefs)(_react.default.useRef(), ref);

  var labelRef = _react.default.useRef();

  var isClickFromMouse = _react.default.useRef(); // ----------------------------------------
  // Effects
  // ----------------------------------------


  (0, _lib.useIsomorphicLayoutEffect)(function () {
    // Note: You can't directly set the indeterminate prop on the input, so we
    // need to maintain a ref to the input and set it manually whenever the
    // component updates.
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }); // ----------------------------------------
  // Helpers
  // ----------------------------------------

  var canToggle = function canToggle() {
    return !disabled && !readOnly && !(radio && checked);
  };

  var computeTabIndex = function computeTabIndex() {
    if (!(0, _isNil2.default)(tabIndex)) {
      return tabIndex;
    }

    return disabled ? -1 : 0;
  }; // ----------------------------------------
  // Handlers
  // ----------------------------------------


  var handleChange = function handleChange(e) {
    if (!canToggle()) {
      return;
    }

    (0, _invoke2.default)(props, 'onChange', e, (0, _extends2.default)({}, props, {
      checked: !checked,
      indeterminate: false
    }));
    setChecked(!checked);
    setIndeterminate(false);
  };

  var handleClick = function handleClick(e) {
    var isInputClick = (0, _invoke2.default)(inputRef.current, 'contains', e.target);
    var isLabelClick = (0, _invoke2.default)(labelRef.current, 'contains', e.target);
    var isRootClick = !isLabelClick && !isInputClick;
    var hasId = !(0, _isNil2.default)(id);
    var isLabelClickAndForwardedToInput = isLabelClick && hasId; // https://github.com/Semantic-Org/Semantic-UI-React/pull/3351

    if (!isLabelClickAndForwardedToInput) {
      (0, _invoke2.default)(props, 'onClick', e, (0, _extends2.default)({}, props, {
        checked: !checked,
        indeterminate: !!indeterminate
      }));
    }

    if (isClickFromMouse.current) {
      isClickFromMouse.current = false;

      if (isLabelClick && !hasId) {
        handleChange(e);
      } // Changes should be triggered for the slider variation


      if (isRootClick) {
        handleChange(e);
      }

      if (isLabelClick && hasId) {
        // To prevent two clicks from being fired from the component we have to stop the propagation
        // from the "input" click: https://github.com/Semantic-Org/Semantic-UI-React/issues/3433
        e.stopPropagation();
      }
    }
  };

  var handleMouseDown = function handleMouseDown(e) {
    (0, _invoke2.default)(props, 'onMouseDown', e, (0, _extends2.default)({}, props, {
      checked: !!checked,
      indeterminate: !!indeterminate
    }));

    if (!e.defaultPrevented) {
      (0, _invoke2.default)(inputRef.current, 'focus');
    } // Heads up!
    // We need to call "preventDefault" to keep element focused.


    e.preventDefault();
  };

  var handleMouseUp = function handleMouseUp(e) {
    isClickFromMouse.current = true;
    (0, _invoke2.default)(props, 'onMouseUp', e, (0, _extends2.default)({}, props, {
      checked: !!checked,
      indeterminate: !!indeterminate
    }));
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var classes = (0, _clsx.default)('ui', (0, _lib.useKeyOnly)(checked, 'checked'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(indeterminate, 'indeterminate'), // auto apply fitted class to compact white space when there is no label
  // https://semantic-ui.com/modules/checkbox.html#fitted
  (0, _lib.useKeyOnly)((0, _isNil2.default)(label), 'fitted'), (0, _lib.useKeyOnly)(radio, 'radio'), (0, _lib.useKeyOnly)(readOnly, 'read-only'), (0, _lib.useKeyOnly)(slider, 'slider'), (0, _lib.useKeyOnly)(toggle, 'toggle'), 'checkbox', className);
  var unhandled = (0, _lib.getUnhandledProps)(Checkbox, props);
  var ElementType = (0, _lib.getElementType)(Checkbox, props);

  var _partitionHTMLProps = (0, _lib.partitionHTMLProps)(unhandled, {
    htmlProps: _lib.htmlInputAttrs
  }),
      htmlInputProps = _partitionHTMLProps[0],
      rest = _partitionHTMLProps[1]; // Heads Up!
  // Do not remove empty labels, they are required by SUI CSS


  var labelElement = (0, _lib.createHTMLLabel)(label, {
    defaultProps: {
      htmlFor: id
    },
    autoGenerateKey: false
  }) || /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: id
  });

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    onClick: handleClick,
    onChange: handleChange,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp
  }), /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
    checked: checked,
    className: "hidden",
    disabled: disabled,
    id: id,
    name: name,
    readOnly: true,
    ref: inputRef,
    tabIndex: computeTabIndex(),
    type: type,
    value: value
  })), /*#__PURE__*/_react.default.cloneElement(labelElement, {
    ref: labelRef
  }));
});

Checkbox.handledProps = ["as", "checked", "className", "defaultChecked", "defaultIndeterminate", "disabled", "fitted", "id", "indeterminate", "label", "name", "onChange", "onClick", "onMouseDown", "onMouseUp", "radio", "readOnly", "slider", "tabIndex", "toggle", "type", "value"];
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Whether or not checkbox is checked. */
  checked: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** The initial value of checked. */
  defaultChecked: _propTypes.default.bool,

  /** Whether or not checkbox is indeterminate. */
  defaultIndeterminate: _propTypes.default.bool,

  /** A checkbox can appear disabled and be unable to change states */
  disabled: _propTypes.default.bool,

  /** Removes padding for a label. Auto applied when there is no label. */
  fitted: _propTypes.default.bool,

  /** A unique identifier. */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Whether or not checkbox is indeterminate. */
  indeterminate: _propTypes.default.bool,

  /** The text of the associated label element. */
  label: _lib.customPropTypes.itemShorthand,

  /** The HTML input name. */
  name: _propTypes.default.string,

  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange: _propTypes.default.func,

  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick: _propTypes.default.func,

  /**
   * Called when the user presses down on the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseDown: _propTypes.default.func,

  /**
   * Called when the user releases the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseUp: _propTypes.default.func,

  /** Format as a radio element. This means it is an exclusive option. */
  radio: _lib.customPropTypes.every([_propTypes.default.bool, _lib.customPropTypes.disallow(['slider', 'toggle'])]),

  /** A checkbox can be read-only and unable to change states. */
  readOnly: _propTypes.default.bool,

  /** Format to emphasize the current selection state. */
  slider: _lib.customPropTypes.every([_propTypes.default.bool, _lib.customPropTypes.disallow(['radio', 'toggle'])]),

  /** A checkbox can receive focus. */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Format to show an on or off choice. */
  toggle: _lib.customPropTypes.every([_propTypes.default.bool, _lib.customPropTypes.disallow(['radio', 'slider'])]),

  /** HTML input type, either checkbox or radio. */
  type: _propTypes.default.oneOf(['checkbox', 'radio']),

  /** The HTML input value. */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
} : {};
Checkbox.defaultProps = {
  type: 'checkbox'
};
var _default = Checkbox;
exports.default = _default;