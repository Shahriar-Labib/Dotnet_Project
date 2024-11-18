"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Button = _interopRequireDefault(require("../../elements/Button"));

var _Modal = _interopRequireDefault(require("../../modules/Modal"));

/**
 * A Confirm modal gives the user a choice to confirm or cancel an action.
 * @see Modal
 */
var Confirm = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var cancelButton = props.cancelButton,
      confirmButton = props.confirmButton,
      content = props.content,
      header = props.header,
      open = props.open,
      size = props.size;
  var rest = (0, _lib.getUnhandledProps)(Confirm, props);

  var handleCancel = function handleCancel(e) {
    (0, _invoke2.default)(props, 'onCancel', e, props);
  };

  var handleCancelOverrides = function handleCancelOverrides(predefinedProps) {
    return {
      onClick: function onClick(e, buttonProps) {
        (0, _invoke2.default)(predefinedProps, 'onClick', e, buttonProps);
        handleCancel(e);
      }
    };
  };

  var handleConfirmOverrides = function handleConfirmOverrides(predefinedProps) {
    return {
      onClick: function onClick(e, buttonProps) {
        (0, _invoke2.default)(predefinedProps, 'onClick', e, buttonProps);
        (0, _invoke2.default)(props, 'onConfirm', e, props);
      }
    };
  }; // `open` is auto controlled by the Modal
  // It cannot be present (even undefined) with `defaultOpen`
  // only apply it if the user provided an open prop


  var openProp = {};

  if ((0, _has2.default)(props, 'open')) {
    openProp.open = open;
  }

  return /*#__PURE__*/_react.default.createElement(_Modal.default, (0, _extends2.default)({}, rest, openProp, {
    size: size,
    onClose: handleCancel,
    ref: ref
  }), _Modal.default.Header.create(header, {
    autoGenerateKey: false
  }), _Modal.default.Content.create(content, {
    autoGenerateKey: false
  }), /*#__PURE__*/_react.default.createElement(_Modal.default.Actions, null, _Button.default.create(cancelButton, {
    autoGenerateKey: false,
    overrideProps: handleCancelOverrides
  }), _Button.default.create(confirmButton, {
    autoGenerateKey: false,
    defaultProps: {
      primary: true
    },
    overrideProps: handleConfirmOverrides
  })));
});

Confirm.handledProps = ["cancelButton", "confirmButton", "content", "header", "onCancel", "onConfirm", "open", "size"];
Confirm.displayName = 'Confirm';
Confirm.propTypes = process.env.NODE_ENV !== "production" ? {
  /** The cancel button text. */
  cancelButton: _lib.customPropTypes.itemShorthand,

  /** The OK button text. */
  confirmButton: _lib.customPropTypes.itemShorthand,

  /** The ModalContent text. */
  content: _lib.customPropTypes.itemShorthand,

  /** The ModalHeader text. */
  header: _lib.customPropTypes.itemShorthand,

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel: _propTypes.default.func,

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm: _propTypes.default.func,

  /** Whether or not the modal is visible. */
  open: _propTypes.default.bool,

  /** A Confirm can vary in size */
  size: _propTypes.default.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
} : {};
Confirm.defaultProps = {
  cancelButton: 'Cancel',
  confirmButton: 'OK',
  content: 'Are you sure?',
  size: 'small'
};
var _default = Confirm;
exports.default = _default;