import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps } from '../../lib';
import Input from '../../elements/Input';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Input} />.
 * @see Form
 * @see Input
 */

var FormInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var control = props.control;
  var rest = getUnhandledProps(FormInput, props);
  var ElementType = getElementType(FormInput, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    control: control,
    ref: ref
  }));
});
FormInput.handledProps = ["as", "control"];
FormInput.displayName = 'FormInput';
FormInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormInput.defaultProps = {
  as: FormField,
  control: Input
};
export default FormInput;