"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _IconGroup = _interopRequireDefault(require("./IconGroup"));

function getAriaProps(props) {
  var ariaOptions = {};
  var ariaLabel = props['aria-label'],
      ariaHidden = props['aria-hidden'];

  if ((0, _isNil2.default)(ariaLabel)) {
    ariaOptions['aria-hidden'] = 'true';
  } else {
    ariaOptions['aria-label'] = ariaLabel;
  }

  if (!(0, _isNil2.default)(ariaHidden)) {
    ariaOptions['aria-hidden'] = ariaHidden;
  }

  return ariaOptions;
}
/**
 * An icon is a glyph used to represent something else.
 * @see Image
 */


var Icon = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var bordered = props.bordered,
      circular = props.circular,
      className = props.className,
      color = props.color,
      corner = props.corner,
      disabled = props.disabled,
      fitted = props.fitted,
      flipped = props.flipped,
      inverted = props.inverted,
      link = props.link,
      loading = props.loading,
      name = props.name,
      rotated = props.rotated,
      size = props.size;
  var classes = (0, _clsx.default)(color, name, size, (0, _lib.useKeyOnly)(bordered, 'bordered'), (0, _lib.useKeyOnly)(circular, 'circular'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(fitted, 'fitted'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOrValueAndKey)(corner, 'corner'), (0, _lib.useValueAndKey)(flipped, 'flipped'), (0, _lib.useValueAndKey)(rotated, 'rotated'), 'icon', className);
  var rest = (0, _lib.getUnhandledProps)(Icon, props);
  var ElementType = (0, _lib.getElementType)(Icon, props);
  var ariaProps = getAriaProps(props);
  var handleClick = (0, _lib.useEventCallback)(function (e) {
    if (disabled) {
      e.preventDefault();
      return;
    }

    (0, _invoke2.default)(props, 'onClick', e, props);
  });
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, ariaProps, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }));
});

Icon.handledProps = ["aria-hidden", "aria-label", "as", "bordered", "circular", "className", "color", "corner", "disabled", "fitted", "flipped", "inverted", "link", "loading", "name", "rotated", "size"];
Icon.displayName = 'Icon';
Icon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** Formatted to appear bordered. */
  bordered: _propTypes.default.bool,

  /** Icon can formatted to appear circular. */
  circular: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Color of the icon. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Icons can display a smaller corner icon. */
  corner: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top left', 'top right', 'bottom left', 'bottom right'])]),

  /** Show that the icon is inactive. */
  disabled: _propTypes.default.bool,

  /** Fitted, without space to left or right of Icon. */
  fitted: _propTypes.default.bool,

  /** Icon can be flipped. */
  flipped: _propTypes.default.oneOf(['horizontally', 'vertically']),

  /** Formatted to have its colors inverted for contrast. */
  inverted: _propTypes.default.bool,

  /** Icon can be formatted as a link. */
  link: _propTypes.default.bool,

  /** Icon can be used as a simple loader. */
  loading: _propTypes.default.bool,

  /** Name of the icon. */
  name: _lib.customPropTypes.suggest(_lib.SUI.ALL_ICONS_IN_ALL_CONTEXTS),

  /** Icon can rotated. */
  rotated: _propTypes.default.oneOf(['clockwise', 'counterclockwise']),

  /** Size of the icon. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** Icon can have an aria label. */
  'aria-hidden': _propTypes.default.string,

  /** Icon can have an aria label. */
  'aria-label': _propTypes.default.string
} : {}; // Heads up!
// .create() factories should be defined on exported component to be visible as static properties

var MemoIcon = /*#__PURE__*/_react.default.memo(Icon);

MemoIcon.Group = _IconGroup.default;
MemoIcon.create = (0, _lib.createShorthandFactory)(MemoIcon, function (value) {
  return {
    name: value
  };
});
MemoIcon.defaultProps = {
  as: 'i'
};
var _default = MemoIcon;
exports.default = _default;