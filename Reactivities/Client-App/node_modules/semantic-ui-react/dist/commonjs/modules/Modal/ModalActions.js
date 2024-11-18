"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Button = _interopRequireDefault(require("../../elements/Button"));

/**
 * A modal can contain a row of actions.
 */
var ModalActions = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var actions = props.actions,
      children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0, _clsx.default)('actions', className);
  var rest = (0, _lib.getUnhandledProps)(ModalActions, props);
  var ElementType = (0, _lib.getElementType)(ModalActions, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      ref: ref
    }), children);
  }

  if (!_lib.childrenUtils.isNil(content)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), content);
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), (0, _map2.default)(actions, function (action) {
    return _Button.default.create(action, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onClick: function onClick(e, buttonProps) {
            (0, _invoke2.default)(predefinedProps, 'onClick', e, buttonProps);
            (0, _invoke2.default)(props, 'onActionClick', e, buttonProps);
          }
        };
      }
    });
  }));
});

ModalActions.handledProps = ["actions", "as", "children", "className", "content", "onActionClick"];
ModalActions.displayName = 'ModalActions';
ModalActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Array of shorthand buttons. */
  actions: _lib.customPropTypes.collectionShorthand,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props from the clicked action.
   */
  onActionClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func])
} : {};
ModalActions.create = (0, _lib.createShorthandFactory)(ModalActions, function (actions) {
  return {
    actions: actions
  };
});
var _default = ModalActions;
exports.default = _default;