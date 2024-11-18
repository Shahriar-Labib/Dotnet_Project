import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _isNil from "lodash-es/isNil";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, createShorthandFactory, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey, useValueAndKey, useMergedRefs } from '../../lib';
import Icon from '../Icon/Icon';
import Label from '../Label/Label';
import ButtonContent from './ButtonContent';
import ButtonGroup from './ButtonGroup';
import ButtonOr from './ButtonOr';
/**
 * @param {React.ElementType} ElementType
 * @param {String} role
 */

function computeButtonAriaRole(ElementType, role) {
  if (!_isNil(role)) {
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
  if (!_isNil(tabIndex)) {
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
    return labelPosition || childrenUtils.isNil(children) && _isNil(content);
  }
}
/**
 * A Button indicates a possible user action.
 * @see Form
 * @see Icon
 * @see Label
 */


var Button = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var elementRef = useMergedRefs(ref, React.useRef());
  var baseClasses = cx(color, size, useKeyOnly(active, 'active'), useKeyOnly(basic, 'basic'), useKeyOnly(circular, 'circular'), useKeyOnly(compact, 'compact'), useKeyOnly(fluid, 'fluid'), useKeyOnly(hasIconClass(props), 'icon'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(negative, 'negative'), useKeyOnly(positive, 'positive'), useKeyOnly(primary, 'primary'), useKeyOnly(secondary, 'secondary'), useKeyOnly(toggle, 'toggle'), useKeyOrValueAndKey(animated, 'animated'), useKeyOrValueAndKey(attached, 'attached'));
  var labeledClasses = cx(useKeyOrValueAndKey(labelPosition || !!label, 'labeled'));
  var wrapperClasses = cx(useKeyOnly(disabled, 'disabled'), useValueAndKey(floated, 'floated'));
  var rest = getUnhandledProps(Button, props);
  var ElementType = getElementType(Button, props, function () {
    if (!_isNil(attached) || !_isNil(label)) {
      return 'div';
    }
  });
  var tabIndex = computeTabIndex(ElementType, disabled, props.tabIndex);

  var handleClick = function handleClick(e) {
    if (disabled) {
      e.preventDefault();
      return;
    }

    _invoke(props, 'onClick', e, props);
  };

  if (!_isNil(label)) {
    var buttonClasses = cx('ui', baseClasses, 'button', className);
    var containerClasses = cx('ui', labeledClasses, 'button', className, wrapperClasses);
    var labelElement = Label.create(label, {
      defaultProps: {
        basic: true,
        pointing: labelPosition === 'left' ? 'right' : 'left'
      },
      autoGenerateKey: false
    });
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: containerClasses,
      onClick: handleClick
    }), labelPosition === 'left' && labelElement, /*#__PURE__*/React.createElement("button", {
      className: buttonClasses,
      "aria-pressed": toggle ? !!active : undefined,
      disabled: disabled,
      tabIndex: tabIndex,
      type: type,
      ref: elementRef
    }, Icon.create(icon, {
      autoGenerateKey: false
    }), " ", content), (labelPosition === 'right' || !labelPosition) && labelElement);
  }

  var classes = cx('ui', baseClasses, wrapperClasses, labeledClasses, 'button', className);
  var hasChildren = !childrenUtils.isNil(children);
  var role = computeButtonAriaRole(ElementType, props.role);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    "aria-pressed": toggle ? !!active : undefined,
    disabled: disabled && ElementType === 'button' || undefined,
    onClick: handleClick,
    role: role,
    tabIndex: tabIndex,
    type: type,
    ref: elementRef
  }), hasChildren && children, !hasChildren && Icon.create(icon, {
    autoGenerateKey: false
  }), !hasChildren && content);
});
Button.handledProps = ["active", "animated", "as", "attached", "basic", "children", "circular", "className", "color", "compact", "content", "disabled", "floated", "fluid", "icon", "inverted", "label", "labelPosition", "loading", "negative", "onClick", "positive", "primary", "role", "secondary", "size", "tabIndex", "toggle", "type"];
Button.displayName = 'Button';
Button.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A button can show it is currently the active user selection. */
  active: PropTypes.bool,

  /** A button can animate to show hidden content. */
  animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['fade', 'vertical'])]),

  /** A button can be attached to other content. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right', 'top', 'bottom'])]),

  /** A basic button is less pronounced. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: customPropTypes.every([PropTypes.node, customPropTypes.disallow(['label']), customPropTypes.givenProps({
    icon: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired, PropTypes.element.isRequired])
  }, customPropTypes.disallow(['icon']))]),

  /** A button can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** A button can have different colors */
  color: PropTypes.oneOf([].concat(SUI.COLORS, ['facebook', 'google plus', 'instagram', 'linkedin', 'twitter', 'vk', 'youtube'])),

  /** A button can reduce its padding to fit into tighter spaces. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A button can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,

  /** A button can be aligned to the left or right of its container. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** A button can take the width of its container. */
  fluid: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon />. */
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.object, PropTypes.element]),

  /** A button can be formatted to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Add a Label by text, props object, or pass a <Label />. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element]),

  /** A labeled button can format a Label or Icon to appear on the left or right. */
  labelPosition: PropTypes.oneOf(['right', 'left']),

  /** A button can show a loading indicator. */
  loading: PropTypes.bool,

  /** A button can hint towards a negative consequence. */
  negative: PropTypes.bool,

  /**
   * Called after user's click.
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A button can hint towards a positive consequence. */
  positive: PropTypes.bool,

  /** A button can be formatted to show different levels of emphasis. */
  primary: PropTypes.bool,

  /** The role of the HTML element. */
  role: PropTypes.string,

  /** A button can be formatted to show different levels of emphasis. */
  secondary: PropTypes.bool,

  /** A button can have different sizes. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** A button can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A button can be formatted to toggle on and off. */
  toggle: PropTypes.bool,

  /** The type of the HTML element. */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
} : {};
Button.defaultProps = {
  as: 'button'
};
Button.Content = ButtonContent;
Button.Group = ButtonGroup;
Button.Or = ButtonOr;
Button.create = createShorthandFactory(Button, function (value) {
  return {
    content: value
  };
});
export default Button;