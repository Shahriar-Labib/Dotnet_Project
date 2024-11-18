import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _get from "lodash-es/get";
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps, useMergedRefs } from '../../lib';
/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */

var TextArea = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var rows = props.rows,
      value = props.value;
  var elementRef = useMergedRefs(ref, React.useRef());

  var handleChange = function handleChange(e) {
    var newValue = _get(e, 'target.value');

    _invoke(props, 'onChange', e, _extends({}, props, {
      value: newValue
    }));
  };

  var handleInput = function handleInput(e) {
    var newValue = _get(e, 'target.value');

    _invoke(props, 'onInput', e, _extends({}, props, {
      value: newValue
    }));
  };

  var rest = getUnhandledProps(TextArea, props);
  var ElementType = getElementType(TextArea, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    onChange: handleChange,
    onInput: handleInput,
    ref: elementRef,
    rows: rows,
    value: value
  }));
});
TextArea.handledProps = ["as", "onChange", "onInput", "rows", "value"];
TextArea.displayName = 'TextArea';
TextArea.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: PropTypes.func,

  /**
   * Called on input.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput: PropTypes.func,

  /** Indicates row count for a TextArea. */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The value of the textarea. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : {};
TextArea.defaultProps = {
  as: 'textarea',
  rows: 3
};
export default TextArea;