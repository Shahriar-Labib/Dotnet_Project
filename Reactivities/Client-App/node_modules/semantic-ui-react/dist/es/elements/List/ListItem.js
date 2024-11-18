import _extends from "@babel/runtime/helpers/esm/extends";
import _isPlainObject from "lodash-es/isPlainObject";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React, { isValidElement } from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly, useEventCallback } from '../../lib';
import Image from '../Image';
import ListContent from './ListContent';
import ListDescription from './ListDescription';
import ListHeader from './ListHeader';
import ListIcon from './ListIcon';
/**
 * A list item can contain a set of items.
 */

var ListItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      disabled = props.disabled,
      header = props.header,
      icon = props.icon,
      image = props.image,
      value = props.value;
  var ElementType = getElementType(ListItem, props);
  var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(ElementType !== 'li', 'item'), className);
  var rest = getUnhandledProps(ListItem, props);
  var handleClick = useEventCallback(function (e) {
    if (!disabled) {
      _invoke(props, 'onClick', e, props);
    }
  });
  var valueProp = ElementType === 'li' ? {
    value: value
  } : {
    'data-value': value
  };

  if (!childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, valueProp, {
      role: "listitem"
    }, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), children);
  }

  var iconElement = ListIcon.create(icon, {
    autoGenerateKey: false
  });
  var imageElement = Image.create(image, {
    autoGenerateKey: false
  }); // See description of `content` prop for explanation about why this is necessary.

  if (! /*#__PURE__*/isValidElement(content) && _isPlainObject(content)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, valueProp, {
      role: "listitem"
    }, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), iconElement || imageElement, ListContent.create(content, {
      autoGenerateKey: false,
      defaultProps: {
        header: header,
        description: description
      }
    }));
  }

  var headerElement = ListHeader.create(header, {
    autoGenerateKey: false
  });
  var descriptionElement = ListDescription.create(description, {
    autoGenerateKey: false
  });

  if (iconElement || imageElement) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, valueProp, {
      role: "listitem"
    }, rest, {
      className: classes,
      onClick: handleClick,
      ref: ref
    }), iconElement || imageElement, (content || headerElement || descriptionElement) && /*#__PURE__*/React.createElement(ListContent, null, headerElement, descriptionElement, content));
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, valueProp, {
    role: "listitem"
  }, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), headerElement, descriptionElement, content);
});
ListItem.handledProps = ["active", "as", "children", "className", "content", "description", "disabled", "header", "icon", "image", "onClick", "value"];
ListItem.displayName = 'ListItem';
ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A list item can active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * Shorthand for primary content.
   *
   * Heads up!
   *
   * This is handled slightly differently than the typical `content` prop since
   * the wrapping ListContent is not used when there's no icon or image.
   *
   * If you pass content as:
   * - an element/literal, it's treated as the sibling node to
   * header/description (whether wrapped in Item.Content or not).
   * - a props object, it forces the presence of Item.Content and passes those
   * props to it. If you pass a content prop within that props object, it
   * will be treated as the sibling node to header/description.
   */
  content: customPropTypes.itemShorthand,

  /** Shorthand for ListDescription. */
  description: customPropTypes.itemShorthand,

  /** A list item can disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for ListHeader. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for ListIcon. */
  icon: customPropTypes.every([customPropTypes.disallow(['image']), customPropTypes.itemShorthand]),

  /** Shorthand for Image. */
  image: customPropTypes.every([customPropTypes.disallow(['icon']), customPropTypes.itemShorthand]),

  /** A ListItem can be clicked */
  onClick: PropTypes.func,

  /** A value for an ordered list. */
  value: PropTypes.string
} : {};
ListItem.create = createShorthandFactory(ListItem, function (content) {
  return {
    content: content
  };
});
export default ListItem;