import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps } from '../../lib';
import Radio from '../../addons/Radio';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Radio} />.
 * @see Form
 * @see Radio
 */

var FormRadio = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var control = props.control;
  var rest = getUnhandledProps(FormRadio, props);
  var ElementType = getElementType(FormRadio, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    control: control,
    ref: ref
  }));
});
FormRadio.handledProps = ["as", "control"];
FormRadio.displayName = 'FormRadio';
FormRadio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormRadio.defaultProps = {
  as: FormField,
  control: Radio
};
export default FormRadio;