"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _FormButton = _interopRequireDefault(require("./FormButton"));

var _FormCheckbox = _interopRequireDefault(require("./FormCheckbox"));

var _FormDropdown = _interopRequireDefault(require("./FormDropdown"));

var _FormField = _interopRequireDefault(require("./FormField"));

var _FormGroup = _interopRequireDefault(require("./FormGroup"));

var _FormInput = _interopRequireDefault(require("./FormInput"));

var _FormRadio = _interopRequireDefault(require("./FormRadio"));

var _FormSelect = _interopRequireDefault(require("./FormSelect"));

var _FormTextArea = _interopRequireDefault(require("./FormTextArea"));

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
var Form = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    if (typeof action !== 'string') (0, _invoke2.default)(e, 'preventDefault');

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _invoke2.default.apply(void 0, [props, 'onSubmit', e, props].concat(args));
  };

  var classes = (0, _clsx.default)('ui', size, (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(reply, 'reply'), (0, _lib.useKeyOnly)(success, 'success'), (0, _lib.useKeyOnly)(unstackable, 'unstackable'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useWidthProp)(widths, null, true), 'form', className);
  var rest = (0, _lib.getUnhandledProps)(Form, props);
  var ElementType = (0, _lib.getElementType)(Form, props);
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
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
  as: _propTypes.default.elementType,

  /** The HTML form action */
  action: _propTypes.default.string,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Automatically show any error Message children. */
  error: _propTypes.default.bool,

  /** A form can have its color inverted for contrast. */
  inverted: _propTypes.default.bool,

  /** Automatically show a loading indicator. */
  loading: _propTypes.default.bool,

  /** The HTML form submit handler. */
  onSubmit: _propTypes.default.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: _propTypes.default.bool,

  /** A form can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** Automatically show any success Message children. */
  success: _propTypes.default.bool,

  /** A form can prevent itself from stacking on mobile. */
  unstackable: _propTypes.default.bool,

  /** Automatically show any warning Message children. */
  warning: _propTypes.default.bool,

  /** Forms can automatically divide fields to be equal width. */
  widths: _propTypes.default.oneOf(['equal'])
} : {};
Form.defaultProps = {
  as: 'form'
};
Form.Field = _FormField.default;
Form.Button = _FormButton.default;
Form.Checkbox = _FormCheckbox.default;
Form.Dropdown = _FormDropdown.default;
Form.Group = _FormGroup.default;
Form.Input = _FormInput.default;
Form.Radio = _FormRadio.default;
Form.Select = _FormSelect.default;
Form.TextArea = _FormTextArea.default;
var _default = Form;
exports.default = _default;