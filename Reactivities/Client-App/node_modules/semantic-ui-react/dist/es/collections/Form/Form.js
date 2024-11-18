import _extends from "@babel/runtime/helpers/esm/extends";
import _without from "lodash-es/without";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps, SUI, useKeyOnly, useWidthProp } from '../../lib';
import FormButton from './FormButton';
import FormCheckbox from './FormCheckbox';
import FormDropdown from './FormDropdown';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormInput from './FormInput';
import FormRadio from './FormRadio';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';
/**
 * A Form displays a set of related user input fields in a structured way.
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Message
 * @see Radio
 * @see Select
 */

var Form = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var action = props.action,
      children = props.children,
      className = props.className,
      error = props.error,
      inverted = props.inverted,
      loading = props.loading,
      reply = props.reply,
      size = props.size,
      success = props.success,
      unstackable = props.unstackable,
      warning = props.warning,
      widths = props.widths;

  var handleSubmit = function handleSubmit(e) {
    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (typeof action !== 'string') _invoke(e, 'preventDefault');

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _invoke.apply(void 0, [props, 'onSubmit', e, props].concat(args));
  };

  var classes = cx('ui', size, useKeyOnly(error, 'error'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(reply, 'reply'), useKeyOnly(success, 'success'), useKeyOnly(unstackable, 'unstackable'), useKeyOnly(warning, 'warning'), useWidthProp(widths, null, true), 'form', className);
  var rest = getUnhandledProps(Form, props);
  var ElementType = getElementType(Form, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    action: action,
    className: classes,
    onSubmit: handleSubmit,
    ref: ref
  }), children);
});
Form.handledProps = ["action", "as", "children", "className", "error", "inverted", "loading", "onSubmit", "reply", "size", "success", "unstackable", "warning", "widths"];
Form.displayName = 'Form';
Form.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** The HTML form action */
  action: PropTypes.string,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Automatically show any error Message children. */
  error: PropTypes.bool,

  /** A form can have its color inverted for contrast. */
  inverted: PropTypes.bool,

  /** Automatically show a loading indicator. */
  loading: PropTypes.bool,

  /** The HTML form submit handler. */
  onSubmit: PropTypes.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: PropTypes.bool,

  /** A form can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** Automatically show any success Message children. */
  success: PropTypes.bool,

  /** A form can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** Automatically show any warning Message children. */
  warning: PropTypes.bool,

  /** Forms can automatically divide fields to be equal width. */
  widths: PropTypes.oneOf(['equal'])
} : {};
Form.defaultProps = {
  as: 'form'
};
Form.Field = FormField;
Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Group = FormGroup;
Form.Input = FormInput;
Form.Radio = FormRadio;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
export default Form;