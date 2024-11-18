import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps } from '../../lib';
import Dropdown from '../../modules/Dropdown';
import FormField from './FormField';
/**
 * Sugar for <Form.Field control={Dropdown} />.
 * @see Dropdown
 * @see Form
 */

var FormDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var control = props.control;
  var rest = getUnhandledProps(FormDropdown, props);
  var ElementType = getElementType(FormDropdown, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    control: control,
    ref: ref
  }));
});
FormDropdown.handledProps = ["as", "control"];
FormDropdown.displayName = 'FormDropdown';
FormDropdown.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
FormDropdown.defaultProps = {
  as: FormField,
  control: Dropdown
};
export default FormDropdown;