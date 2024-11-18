import _extends from "@babel/runtime/helpers/esm/extends";
import _isUndefined from "lodash-es/isUndefined";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey, useValueAndKey, useEventCallback } from '../../lib';
import Icon from '../Icon/Icon';
import Image from '../Image/Image';
import LabelDetail from './LabelDetail';
import LabelGroup from './LabelGroup';
/**
 * A label displays content classification.
 */

var Label = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      attached = props.attached,
      basic = props.basic,
      children = props.children,
      circular = props.circular,
      className = props.className,
      color = props.color,
      content = props.content,
      corner = props.corner,
      detail = props.detail,
      empty = props.empty,
      floating = props.floating,
      horizontal = props.horizontal,
      icon = props.icon,
      image = props.image,
      onRemove = props.onRemove,
      pointing = props.pointing,
      prompt = props.prompt,
      removeIcon = props.removeIcon,
      ribbon = props.ribbon,
      size = props.size,
      tag = props.tag;
  var pointingClass = pointing === true && 'pointing' || (pointing === 'left' || pointing === 'right') && pointing + " pointing" || (pointing === 'above' || pointing === 'below') && "pointing " + pointing;
  var classes = cx('ui', color, pointingClass, size, useKeyOnly(active, 'active'), useKeyOnly(basic, 'basic'), useKeyOnly(circular, 'circular'), useKeyOnly(empty, 'empty'), useKeyOnly(floating, 'floating'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(image === true, 'image'), useKeyOnly(prompt, 'prompt'), useKeyOnly(tag, 'tag'), useKeyOrValueAndKey(corner, 'corner'), useKeyOrValueAndKey(ribbon, 'ribbon'), useValueAndKey(attached, 'attached'), 'label', className);
  var rest = getUnhandledProps(Label, props);
  var ElementType = getElementType(Label, props);
  var handleClick = useEventCallback(function (e) {
    _invoke(props, 'onClick', e, props);
  });

  if (!childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), children);
  }

  var removeIconShorthand = _isUndefined(removeIcon) ? 'delete' : removeIcon;
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), Icon.create(icon, {
    autoGenerateKey: false
  }), typeof image !== 'boolean' && Image.create(image, {
    autoGenerateKey: false
  }), content, LabelDetail.create(detail, {
    autoGenerateKey: false
  }), onRemove && Icon.create(removeIconShorthand, {
    autoGenerateKey: false,
    overrideProps: function overrideProps(predefinedProps) {
      return {
        onClick: function onClick(e) {
          _invoke(predefinedProps, 'onClick', e);

          _invoke(props, 'onRemove', e, props);
        }
      };
    }
  }));
});
Label.handledProps = ["active", "as", "attached", "basic", "children", "circular", "className", "color", "content", "corner", "detail", "empty", "floating", "horizontal", "icon", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "size", "tag"];
Label.displayName = 'Label';
Label.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A label can be active. */
  active: PropTypes.bool,

  /** A label can attach to a content segment. */
  attached: PropTypes.oneOf(['top', 'bottom', 'top right', 'top left', 'bottom left', 'bottom right']),

  /** A label can reduce its complexity. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** A label can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the label. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A label can position itself in the corner of an element. */
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]),

  /** Shorthand for LabelDetail. */
  detail: customPropTypes.itemShorthand,

  /** Formats the label as a dot. */
  empty: customPropTypes.every([PropTypes.bool, customPropTypes.demand(['circular'])]),

  /** Float above another element in the upper right corner. */
  floating: PropTypes.bool,

  /** A horizontal label is formatted to label content along-side it horizontally. */
  horizontal: PropTypes.bool,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** A label can be formatted to emphasize an image or prop can be used as shorthand for Image. */
  image: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Adds an "x" icon, called when "x" is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onRemove: PropTypes.func,

  /** A label can point to content next to it. */
  pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['above', 'below', 'left', 'right'])]),

  /** A label can prompt for an error in your forms. */
  prompt: PropTypes.bool,

  /** Shorthand for Icon to appear as the last child and trigger onRemove. */
  removeIcon: customPropTypes.itemShorthand,

  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),

  /** A label can have different sizes. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** A label can appear as a tag. */
  tag: PropTypes.bool
} : {};
Label.Detail = LabelDetail;
Label.Group = LabelGroup;
Label.create = createShorthandFactory(Label, function (value) {
  return {
    content: value
  };
});
export default Label;