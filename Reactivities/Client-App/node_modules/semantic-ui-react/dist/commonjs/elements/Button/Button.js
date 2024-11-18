"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

var _Label = _interopRequireDefault(require("../Label/Label"));

var _ButtonContent = _interopRequireDefault(require("./ButtonContent"));

var _ButtonGroup = _interopRequireDefault(require("./ButtonGroup"));

var _ButtonOr = _interopRequireDefault(require("./ButtonOr"));

/**
 * @param {React.ElementType} ElementType
 * @param {String} role
 */
function computeButtonAriaRole(ElementType, role) {
  if (!(0, _isNil2.default)(role)) {
    return role;
  }

  if (ElementType !== 'button') {
    return 'button';
  }
}
/**
 * @param {React.ElementType} ElementType
 * @param {Boolean} disabled
 * @param {Number} tabIndex
 */


function computeTabIndex(ElementType, disabled, tabIndex) {
  if (!(0, _isNil2.default)(tabIndex)) {
    return tabIndex;
  }

  if (disabled) {
    return -1;
  }

  if (ElementType === 'div') {
    return 0;
  }
}

function hasIconClass(props) {
  var children = props.children,
      content = props.content,
      icon = props.icon,
      labelPosition = props.labelPosition;

  if (icon === true) {
    return true;
  }

  if (icon) {
    return labelPosition || _lib.childrenUtils.isNil(children) && (0, _isNil2.default)(content);
  }
}
/**
 * A Button indicates a possible user action.
 * @see Form
 * @see Icon
 * @see Label
 */


var Button = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      animated = props.animated,
      attached = props.attached,
      basic = props.basic,
      children = props.children,
      circular = props.circular,
      className = props.className,
      color = props.color,
      compact = props.compact,
      content = props.content,
      disabled = props.disabled,
      floated = props.floated,
      fluid = props.fluid,
      icon = props.icon,
      inverted = props.inverted,
      label = props.label,
      labelPosition = props.labelPosition,
      loading = props.loading,
      negative = props.negative,
      positive = props.positive,
      primary = props.primary,
      secondary = props.secondary,
      size = props.size,
      toggle = props.toggle,
      type = props.type;
  var elementRef = (0, _lib.useMergedRefs)(ref, _react.default.useRef());
  var baseClasses = (0, _clsx.default)(color, size, (0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(circular, 'circular'), (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(hasIconClass(props), 'icon'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(negative, 'negative'), (0, _lib.useKeyOnly)(positive, 'positive'), (0, _lib.useKeyOnly)(primary, 'primary'), (0, _lib.useKeyOnly)(secondary, 'secondary'), (0, _lib.useKeyOnly)(toggle, 'toggle'), (0, _lib.useKeyOrValueAndKey)(animated, 'animated'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'));
  var labeledClasses = (0, _clsx.default)((0, _lib.useKeyOrValueAndKey)(labelPosition || !!label, 'labeled'));
  var wrapperClasses = (0, _clsx.default)((0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useValueAndKey)(floated, 'floated'));
  var rest = (0, _lib.getUnhandledProps)(Button, props);
  var ElementType = (0, _lib.getElementType)(Button, props, function () {
    if (!(0, _isNil2.default)(attached) || !(0, _isNil2.default)(label)) {
      return 'div';
    }
  });
  var tabIndex = computeTabIndex(ElementType, disabled, props.tabIndex);

  var handleClick = function handleClick(e) {
    if (disabled) {
      e.preventDefault();
      return;
    }

    (0, _invoke2.default)(props, 'onClick', e, props);
  };

  if (!(0, _isNil2.default)(label)) {
    var buttonClasses = (0, _clsx.default)('ui', baseClasses, 'button', className);
    var containerClasses = (0, _clsx.default)('ui', labeledClasses, 'button', className, wrapperClasses);

    var labelElement = _Label.default.create(label, {
      defaultProps: {
        basic: true,
        pointing: labelPosition === 'left' ? 'right' : 'left'
      },
      autoGenerateKey: false
    });

    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: containerClasses,
      onClick: handleClick
    }), labelPosition === 'left' && labelElement, /*#__PURE__*/_react.default.createElement("button", {
      className: buttonClasses,
      "aria-pressed": toggle ? !!active : undefined,
      disabled: disabled,
      tabIndex: tabIndex,
      type: type,
      ref: elementRef
    }, _Icon.default.create(icon, {
      autoGenerateKey: false
    }), " ", content), (labelPosition === 'right' || !labelPosition) && labelElement);
  }

  var classes = (0, _clsx.default)('ui', baseClasses, wrapperClasses, labeledClasses, 'button', className);
  var hasChildren = !_lib.childrenUtils.isNil(children);
  var role = computeButtonAriaRole(ElementType, props.role);
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    "aria-pressed": toggle ? !!active : undefined,
    disabled: disabled && ElementType === 'button' || undefined,
    onClick: handleClick,
    role: role,
    tabIndex: tabIndex,
    type: type,
    ref: elementRef
  }), hasChildren && children, !hasChildren && _Icon.default.create(icon, {
    autoGenerateKey: false
  }), !hasChildren && content);
});

Button.handledProps = ["active", "animated", "as", "attached", "basic", "children", "circular", "className", "color", "compact", "content", "disabled", "floated", "fluid", "icon", "inverted", "label", "labelPosition", "loading", "negative", "onClick", "positive", "primary", "role", "secondary", "size", "tabIndex", "toggle", "type"];
Button.displayName = 'Button';
Button.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A button can show it is currently the active user selection. */
  active: _propTypes.default.bool,

  /** A button can animate to show hidden content. */
  animated: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['fade', 'vertical'])]),

  /** A button can be attached to other content. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['left', 'right', 'top', 'bottom'])]),

  /** A basic button is less pronounced. */
  basic: _propTypes.default.bool,

  /** Primary content. */
  children: _lib.customPropTypes.every([_propTypes.default.node, _lib.customPropTypes.disallow(['label']), _lib.customPropTypes.givenProps({
    icon: _propTypes.default.oneOfType([_propTypes.default.string.isRequired, _propTypes.default.object.isRequired, _propTypes.default.element.isRequired])
  }, _lib.customPropTypes.disallow(['icon']))]),

  /** A button can be circular. */
  circular: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A button can have different colors */
  color: _propTypes.default.oneOf([].concat(_lib.SUI.COLORS, ['facebook', 'google plus', 'instagram', 'linkedin', 'twitter', 'vk', 'youtube'])),

  /** A button can reduce its padding to fit into tighter spaces. */
  compact: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A button can show it is currently unable to be interacted with. */
  disabled: _propTypes.default.bool,

  /** A button can be aligned to the left or right of its container. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** A button can take the width of its container. */
  fluid: _propTypes.default.bool,

  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.object, _propTypes.default.element]),

  /** A button can be formatted to appear on dark backgrounds. */
  inverted: _propTypes.default.bool,

  /** Add a Label by text, props object, or pass a <Label />. */
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object, _propTypes.default.element]),

  /** A labeled button can format a Label or Icon to appear on the left or right. */
  labelPosition: _propTypes.default.oneOf(['right', 'left']),

  /** A button can show a loading indicator. */
  loading: _propTypes.default.bool,

  /** A button can hint towards a negative consequence. */
  negative: _propTypes.default.bool,

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /** A button can hint towards a positive consequence. */
  positive: _propTypes.default.bool,

  /** A button can be formatted to show different levels of emphasis. */
  primary: _propTypes.default.bool,

  /** The role of the HTML element. */
  role: _propTypes.default.string,

  /** A button can be formatted to show different levels of emphasis. */
  secondary: _propTypes.default.bool,

  /** A button can have different sizes. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES),

  /** A button can receive focus. */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A button can be formatted to toggle on and off. */
  toggle: _propTypes.default.bool,

  /** The type of the HTML element. */
  type: _propTypes.default.oneOf(['button', 'submit', 'reset'])
} : {};
Button.defaultProps = {
  as: 'button'
};
Button.Content = _ButtonContent.default;
Button.Group = _ButtonGroup.default;
Button.Or = _ButtonOr.default;
Button.create = (0, _lib.createShorthandFactory)(Button, function (value) {
  return {
    content: value
  };
});
var _default = Button;
exports.default = _default;