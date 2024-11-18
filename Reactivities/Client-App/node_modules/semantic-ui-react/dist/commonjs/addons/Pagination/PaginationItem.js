"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _MenuItem = _interopRequireDefault(require("../../collections/Menu/MenuItem"));

/**
 * An item of a pagination.
 */
var PaginationItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      type = props.type;
  var disabled = props.disabled || type === 'ellipsisItem';

  var handleClick = function handleClick(e) {
    (0, _invoke2.default)(props, 'onClick', e, props);
  };

  var handleKeyDown = function handleKeyDown(e) {
    (0, _invoke2.default)(props, 'onKeyDown', e, props);

    if (_keyboardKey.default.getCode(e) === _keyboardKey.default.Enter) {
      (0, _invoke2.default)(props, 'onClick', e, props);
    }
  };

  return _MenuItem.default.create(props, {
    defaultProps: {
      active: active,
      'aria-current': active,
      'aria-disabled': disabled,
      disabled: disabled,
      tabIndex: disabled ? -1 : 0
    },
    overrideProps: function overrideProps() {
      return {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        ref: ref
      };
    }
  });
});
PaginationItem.handledProps = ["active", "disabled", "onClick", "onKeyDown", "type"];
PaginationItem.displayName = 'PaginationItem';
PaginationItem.propTypes = {
  /** A pagination item can be active. */
  active: _propTypes.default.bool,

  /** A pagination item can be disabled. */
  disabled: _propTypes.default.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Called on key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyDown: _propTypes.default.func,

  /** A pagination should have a type. */
  type: _propTypes.default.oneOf(['ellipsisItem', 'firstItem', 'prevItem', 'pageItem', 'nextItem', 'lastItem'])
};
PaginationItem.create = (0, _lib.createShorthandFactory)(PaginationItem, function (content) {
  return {
    content: content
  };
});
var _default = PaginationItem;
exports.default = _default;