import _extends from "@babel/runtime/helpers/esm/extends";
import _without from "lodash-es/without";
import _invoke from "lodash-es/invoke";
import _isNil from "lodash-es/isNil";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, SUI, useEventCallback, useKeyOnly, useKeyOrValueAndKey, useValueAndKey } from '../../lib';
import IconGroup from './IconGroup';

function getAriaProps(props) {
  var ariaOptions = {};
  var ariaLabel = props['aria-label'],
      ariaHidden = props['aria-hidden'];

  if (_isNil(ariaLabel)) {
    ariaOptions['aria-hidden'] = 'true';
  } else {
    ariaOptions['aria-label'] = ariaLabel;
  }

  if (!_isNil(ariaHidden)) {
    ariaOptions['aria-hidden'] = ariaHidden;
  }

  return ariaOptions;
}
/**
 * An icon is a glyph used to represent something else.
 * @see Image
 */


var Icon = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var classes = cx(color, name, size, useKeyOnly(bordered, 'bordered'), useKeyOnly(circular, 'circular'), useKeyOnly(disabled, 'disabled'), useKeyOnly(fitted, 'fitted'), useKeyOnly(inverted, 'inverted'), useKeyOnly(link, 'link'), useKeyOnly(loading, 'loading'), useKeyOrValueAndKey(corner, 'corner'), useValueAndKey(flipped, 'flipped'), useValueAndKey(rotated, 'rotated'), 'icon', className);
  var rest = getUnhandledProps(Icon, props);
  var ElementType = getElementType(Icon, props);
  var ariaProps = getAriaProps(props);
  var handleClick = useEventCallback(function (e) {
    if (disabled) {
      e.preventDefault();
      return;
    }

    _invoke(props, 'onClick', e, props);
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, ariaProps, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }));
});
Icon.handledProps = ["aria-hidden", "aria-label", "as", "bordered", "circular", "className", "color", "corner", "disabled", "fitted", "flipped", "inverted", "link", "loading", "name", "rotated", "size"];
Icon.displayName = 'Icon';
Icon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Formatted to appear bordered. */
  bordered: PropTypes.bool,

  /** Icon can formatted to appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the icon. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Icons can display a smaller corner icon. */
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top left', 'top right', 'bottom left', 'bottom right'])]),

  /** Show that the icon is inactive. */
  disabled: PropTypes.bool,

  /** Fitted, without space to left or right of Icon. */
  fitted: PropTypes.bool,

  /** Icon can be flipped. */
  flipped: PropTypes.oneOf(['horizontally', 'vertically']),

  /** Formatted to have its colors inverted for contrast. */
  inverted: PropTypes.bool,

  /** Icon can be formatted as a link. */
  link: PropTypes.bool,

  /** Icon can be used as a simple loader. */
  loading: PropTypes.bool,

  /** Name of the icon. */
  name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),

  /** Icon can rotated. */
  rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

  /** Size of the icon. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** Icon can have an aria label. */
  'aria-hidden': PropTypes.string,

  /** Icon can have an aria label. */
  'aria-label': PropTypes.string
} : {}; // Heads up!
// .create() factories should be defined on exported component to be visible as static properties

var MemoIcon = /*#__PURE__*/React.memo(Icon);
MemoIcon.Group = IconGroup;
MemoIcon.create = createShorthandFactory(MemoIcon, function (value) {
  return {
    name: value
  };
});
MemoIcon.defaultProps = {
  as: 'i'
};
export default MemoIcon;