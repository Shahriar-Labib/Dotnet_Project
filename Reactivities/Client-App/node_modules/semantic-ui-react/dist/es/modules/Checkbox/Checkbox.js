import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _get from "lodash-es/get";
import _isNil from "lodash-es/isNil";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { createHTMLLabel, customPropTypes, getElementType, getUnhandledProps, htmlInputAttrs, partitionHTMLProps, useKeyOnly, useAutoControlledValue, useMergedRefs, useIsomorphicLayoutEffect } from '../../lib';

/**
 * A checkbox allows a user to select a value from a small set of options, often binary.
 * @see Form
 * @see Radio
 */
var Checkbox = /*#__PURE__*/React.forwardRef(function (props, ref) {
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

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.checked,
    defaultState: props.defaultChecked,
    initialState: false
  }),
      checked = _useAutoControlledVal[0],
      setChecked = _useAutoControlledVal[1];

  var _useAutoControlledVal2 = useAutoControlledValue({
    state: props.indeterminate,
    defaultState: props.defaultIndeterminate,
    initialState: false
  }),
      indeterminate = _useAutoControlledVal2[0],
      setIndeterminate = _useAutoControlledVal2[1];

  var inputRef = useMergedRefs(React.useRef(), ref);
  var labelRef = React.useRef();
  var isClickFromMouse = React.useRef(); // ----------------------------------------
  // Effects
  // ----------------------------------------

  useIsomorphicLayoutEffect(function () {
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
    if (!_isNil(tabIndex)) {
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

    _invoke(props, 'onChange', e, _extends({}, props, {
      checked: !checked,
      indeterminate: false
    }));

    setChecked(!checked);
    setIndeterminate(false);
  };

  var handleClick = function handleClick(e) {
    var isInputClick = _invoke(inputRef.current, 'contains', e.target);

    var isLabelClick = _invoke(labelRef.current, 'contains', e.target);

    var isRootClick = !isLabelClick && !isInputClick;
    var hasId = !_isNil(id);
    var isLabelClickAndForwardedToInput = isLabelClick && hasId; // https://github.com/Semantic-Org/Semantic-UI-React/pull/3351

    if (!isLabelClickAndForwardedToInput) {
      _invoke(props, 'onClick', e, _extends({}, props, {
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
    _invoke(props, 'onMouseDown', e, _extends({}, props, {
      checked: !!checked,
      indeterminate: !!indeterminate
    }));

    if (!e.defaultPrevented) {
      _invoke(inputRef.current, 'focus');
    } // Heads up!
    // We need to call "preventDefault" to keep element focused.


    e.preventDefault();
  };

  var handleMouseUp = function handleMouseUp(e) {
    isClickFromMouse.current = true;

    _invoke(props, 'onMouseUp', e, _extends({}, props, {
      checked: !!checked,
      indeterminate: !!indeterminate
    }));
  }; // ----------------------------------------
  // Render
  // ----------------------------------------


  var classes = cx('ui', useKeyOnly(checked, 'checked'), useKeyOnly(disabled, 'disabled'), useKeyOnly(indeterminate, 'indeterminate'), // auto apply fitted class to compact white space when there is no label
  // https://semantic-ui.com/modules/checkbox.html#fitted
  useKeyOnly(_isNil(label), 'fitted'), useKeyOnly(radio, 'radio'), useKeyOnly(readOnly, 'read-only'), useKeyOnly(slider, 'slider'), useKeyOnly(toggle, 'toggle'), 'checkbox', className);
  var unhandled = getUnhandledProps(Checkbox, props);
  var ElementType = getElementType(Checkbox, props);

  var _partitionHTMLProps = partitionHTMLProps(unhandled, {
    htmlProps: htmlInputAttrs
  }),
      htmlInputProps = _partitionHTMLProps[0],
      rest = _partitionHTMLProps[1]; // Heads Up!
  // Do not remove empty labels, they are required by SUI CSS


  var labelElement = createHTMLLabel(label, {
    defaultProps: {
      htmlFor: id
    },
    autoGenerateKey: false
  }) || /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    onClick: handleClick,
    onChange: handleChange,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp
  }), /*#__PURE__*/React.createElement("input", _extends({}, htmlInputProps, {
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
  })), /*#__PURE__*/React.cloneElement(labelElement, {
    ref: labelRef
  }));
});
Checkbox.handledProps = ["as", "checked", "className", "defaultChecked", "defaultIndeterminate", "disabled", "fitted", "id", "indeterminate", "label", "name", "onChange", "onClick", "onMouseDown", "onMouseUp", "radio", "readOnly", "slider", "tabIndex", "toggle", "type", "value"];
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Whether or not checkbox is checked. */
  checked: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** The initial value of checked. */
  defaultChecked: PropTypes.bool,

  /** Whether or not checkbox is indeterminate. */
  defaultIndeterminate: PropTypes.bool,

  /** A checkbox can appear disabled and be unable to change states */
  disabled: PropTypes.bool,

  /** Removes padding for a label. Auto applied when there is no label. */
  fitted: PropTypes.bool,

  /** A unique identifier. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Whether or not checkbox is indeterminate. */
  indeterminate: PropTypes.bool,

  /** The text of the associated label element. */
  label: customPropTypes.itemShorthand,

  /** The HTML input name. */
  name: PropTypes.string,

  /**
   * Called when the user attempts to change the checked state.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed checked/indeterminate state.
   */
  onChange: PropTypes.func,

  /**
   * Called when the checkbox or label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onClick: PropTypes.func,

  /**
   * Called when the user presses down on the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseDown: PropTypes.func,

  /**
   * Called when the user releases the mouse.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and current checked/indeterminate state.
   */
  onMouseUp: PropTypes.func,

  /** Format as a radio element. This means it is an exclusive option. */
  radio: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['slider', 'toggle'])]),

  /** A checkbox can be read-only and unable to change states. */
  readOnly: PropTypes.bool,

  /** Format to emphasize the current selection state. */
  slider: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'toggle'])]),

  /** A checkbox can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Format to show an on or off choice. */
  toggle: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'slider'])]),

  /** HTML input type, either checkbox or radio. */
  type: PropTypes.oneOf(['checkbox', 'radio']),

  /** The HTML input value. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
} : {};
Checkbox.defaultProps = {
  type: 'checkbox'
};
export default Checkbox;