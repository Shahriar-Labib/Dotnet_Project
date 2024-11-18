"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A TextArea can be used to allow for extended user input.
 * @see Form
 */
var TextArea = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var rows = props.rows,
      value = props.value;
  var elementRef = (0, _lib.useMergedRefs)(ref, _react.default.useRef());

  var handleChange = function handleChange(e) {
    var newValue = (0, _get2.default)(e, 'target.value');
    (0, _invoke2.default)(props, 'onChange', e, (0, _extends2.default)({}, props, {
      value: newValue
    }));
  };

  var handleInput = function handleInput(e) {
    var newValue = (0, _get2.default)(e, 'target.value');
    (0, _invoke2.default)(props, 'onInput', e, (0, _extends2.default)({}, props, {
      value: newValue
    }));
  };

  var rest = (0, _lib.getUnhandledProps)(TextArea, props);
  var ElementType = (0, _lib.getElementType)(TextArea, props);
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
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
  as: _propTypes.default.elementType,

  /**
   * Called on change.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onChange: _propTypes.default.func,

  /**
   * Called on input.
   * @param {SyntheticEvent} event - The React SyntheticEvent object
   * @param {object} data - All props and the event value.
   */
  onInput: _propTypes.default.func,

  /** Indicates row count for a TextArea. */
  rows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** The value of the textarea. */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : {};
TextArea.defaultProps = {
  as: 'textarea',
  rows: 3
};
var _default = TextArea;
exports.default = _default;