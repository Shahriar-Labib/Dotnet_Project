import _extends from "@babel/runtime/helpers/esm/extends";
import _has from "lodash-es/has";
import _invoke from "lodash-es/invoke";
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getUnhandledProps } from '../../lib';
import Button from '../../elements/Button';
import Modal from '../../modules/Modal';
/**
 * A Confirm modal gives the user a choice to confirm or cancel an action.
 * @see Modal
 */

var Confirm = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var cancelButton = props.cancelButton,
      confirmButton = props.confirmButton,
      content = props.content,
      header = props.header,
      open = props.open,
      size = props.size;
  var rest = getUnhandledProps(Confirm, props);

  var handleCancel = function handleCancel(e) {
    _invoke(props, 'onCancel', e, props);
  };

  var handleCancelOverrides = function handleCancelOverrides(predefinedProps) {
    return {
      onClick: function onClick(e, buttonProps) {
        _invoke(predefinedProps, 'onClick', e, buttonProps);

        handleCancel(e);
      }
    };
  };

  var handleConfirmOverrides = function handleConfirmOverrides(predefinedProps) {
    return {
      onClick: function onClick(e, buttonProps) {
        _invoke(predefinedProps, 'onClick', e, buttonProps);

        _invoke(props, 'onConfirm', e, props);
      }
    };
  }; // `open` is auto controlled by the Modal
  // It cannot be present (even undefined) with `defaultOpen`
  // only apply it if the user provided an open prop


  var openProp = {};

  if (_has(props, 'open')) {
    openProp.open = open;
  }

  return /*#__PURE__*/React.createElement(Modal, _extends({}, rest, openProp, {
    size: size,
    onClose: handleCancel,
    ref: ref
  }), Modal.Header.create(header, {
    autoGenerateKey: false
  }), Modal.Content.create(content, {
    autoGenerateKey: false
  }), /*#__PURE__*/React.createElement(Modal.Actions, null, Button.create(cancelButton, {
    autoGenerateKey: false,
    overrideProps: handleCancelOverrides
  }), Button.create(confirmButton, {
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
  cancelButton: customPropTypes.itemShorthand,

  /** The OK button text. */
  confirmButton: customPropTypes.itemShorthand,

  /** The ModalContent text. */
  content: customPropTypes.itemShorthand,

  /** The ModalHeader text. */
  header: customPropTypes.itemShorthand,

  /**
   * Called when the Modal is closed without clicking confirm.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onCancel: PropTypes.func,

  /**
   * Called when the OK button is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onConfirm: PropTypes.func,

  /** Whether or not the modal is visible. */
  open: PropTypes.bool,

  /** A Confirm can vary in size */
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen'])
} : {};
Confirm.defaultProps = {
  cancelButton: 'Cancel',
  confirmButton: 'OK',
  content: 'Are you sure?',
  size: 'small'
};
export default Confirm;