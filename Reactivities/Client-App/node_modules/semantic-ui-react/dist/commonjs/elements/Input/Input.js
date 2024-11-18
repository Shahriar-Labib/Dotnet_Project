"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Button = _interopRequireDefault(require("../Button"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _Label = _interopRequireDefault(require("../Label"));

/**
 * An Input is a field used to elicit a response from a user.
 * @see Button
 * @see Form
 * @see Icon
 * @see Label
 */
var Input = /*#__PURE__*/_react.default.forwardRef(function (props, _ref) {
  var action = props.action,
      actionPosition = props.actionPosition,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      error = props.error,
      fluid = props.fluid,
      focus = props.focus,
      icon = props.icon,
      iconPosition = props.iconPosition,
      input = props.input,
      inverted = props.inverted,
      label = props.label,
      labelPosition = props.labelPosition,
      loading = props.loading,
      size = props.size,
      tabIndex = props.tabIndex,
      transparent = props.transparent,
      type = props.type;

  var computeIcon = function computeIcon() {
    if (!(0, _isNil2.default)(icon)) {
      return icon;
    }

    if (loading) {
      return 'spinner';
    }
  };

  var computeTabIndex = function computeTabIndex() {
    if (!(0, _isNil2.default)(tabIndex)) {
      return tabIndex;
    }

    if (disabled) {
      return -1;
    }
  };

  var handleChange = function handleChange(e) {
    var newValue = (0, _get2.default)(e, 'target.value');
    (0, _invoke2.default)(props, 'onChange', e, (0, _extends2.default)({}, props, {
      value: newValue
    }));
  };

  var partitionProps = function partitionProps() {
    var unhandledProps = (0, _lib.getUnhandledProps)(Input, props);

    var _partitionHTMLProps = (0, _lib.partitionHTMLProps)(unhandledProps),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    return [(0, _extends2.default)({}, htmlInputProps, {
      disabled: disabled,
      type: type,
      tabIndex: computeTabIndex(),
      onChange: handleChange,
      ref: _ref
    }), rest];
  };

  var classes = (0, _clsx.default)('ui', size, (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(focus, 'focus'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(transparent, 'transparent'), (0, _lib.useValueAndKey)(actionPosition, 'action') || (0, _lib.useKeyOnly)(action, 'action'), (0, _lib.useValueAndKey)(iconPosition, 'icon') || (0, _lib.useKeyOnly)(icon || loading, 'icon'), (0, _lib.useValueAndKey)(labelPosition, 'labeled') || (0, _lib.useKeyOnly)(label, 'labeled'), 'input', className);
  var ElementType = (0, _lib.getElementType)(Input, props);

  var _partitionProps = partitionProps(),
      htmlInputProps = _partitionProps[0],
      rest = _partitionProps[1]; // Render with children
  // ----------------------------------------


  if (!_lib.childrenUtils.isNil(children)) {
    // add htmlInputProps to the `<input />` child
    var childElements = (0, _map2.default)(_react.default.Children.toArray(children), function (child) {
      if (child.type === 'input') {
        return /*#__PURE__*/_react.default.cloneElement(child, (0, _extends2.default)({}, htmlInputProps, child.props, {
          ref: function ref(c) {
            (0, _lib.setRef)(child.ref, c);
            (0, _lib.setRef)(_ref, c);
          }
        }));
      }

      return child;
    });
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), childElements);
  } // Render Shorthand
  // ----------------------------------------


  var actionElement = _Button.default.create(action, {
    autoGenerateKey: false
  });

  var labelElement = _Label.default.create(label, {
    defaultProps: {
      className: (0, _clsx.default)('label', // add 'left|right corner'
      (0, _includes2.default)(labelPosition, 'corner') && labelPosition)
    },
    autoGenerateKey: false
  });

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), actionPosition === 'left' && actionElement, labelPosition !== 'right' && labelElement, (0, _lib.createHTMLInput)(input || type, {
    defaultProps: htmlInputProps,
    autoGenerateKey: false
  }), _Icon.default.create(computeIcon(), {
    autoGenerateKey: false
  }), actionPosition !== 'left' && actionElement, labelPosition === 'right' && labelElement);
});

Input.handledProps = ["action", "actionPosition", "as", "children", "className", "disabled", "error", "fluid", "focus", "icon", "iconPosition", "input", "inverted", "label", "labelPosition", "loading", "onChange", "size", "tabIndex", "transparent", "type"];
Input.displayName = 'Input';
Input.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** An Input can be formatted to alert the user to an action they may perform. */
  action: _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.itemShorthand]),

  /** An action can appear along side an Input on the left or right. */
  actionPosition: _propTypes.default.oneOf(['left']),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** An Input field can show that it is disabled. */
  disabled: _propTypes.default.bool,

  /** An Input field can show the data contains errors. */
  error: _propTypes.default.bool,

  /** Take on the size of its container. */
  fluid: _propTypes.default.bool,

  /** An Input field can show a user is currently interacting with it. */
  focus: _propTypes.default.bool,

  /** Optional Icon to display inside the Input. */
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.itemShorthand]),

  /** An Icon can appear inside an Input on the left or right. */
  iconPosition: _propTypes.default.oneOf(['left']),

  /** Shorthand for creating the HTML Input. */
  input: _lib.customPropTypes.itemShorthand,

  /** Format to appear on dark backgrounds. */
  inverted: _propTypes.default.bool,

  /** Optional Label to display along side the Input. */
  label: _lib.customPropTypes.itemShorthand,

  /** A Label can appear outside an Input on the left or right. */
  labelPosition: _propTypes.default.oneOf(['left', 'right', 'left corner', 'right corner']),

  /** An Icon Input field can show that it is currently loading data. */
  loading: _propTypes.default.bool,

  /**
   * Called on change.
   *
   * @param {ChangeEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and a proposed value.
   */
  onChange: _propTypes.default.func,

  /** An Input can vary in size. */
  size: _propTypes.default.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),

  /** An Input can receive focus. */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** Transparent Input has no background. */
  transparent: _propTypes.default.bool,

  /** The HTML input type. */
  type: _propTypes.default.string
} : {};
Input.defaultProps = {
  type: 'text'
};
Input.create = (0, _lib.createShorthandFactory)(Input, function (type) {
  return {
    type: type
  };
});
var _default = Input;
exports.default = _default;