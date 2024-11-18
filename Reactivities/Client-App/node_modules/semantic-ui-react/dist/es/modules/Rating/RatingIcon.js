import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * An internal icon sub-component for Rating component
 */

var RatingIcon = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      className = props.className,
      selected = props.selected;
  var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(selected, 'selected'), 'icon', className);
  var rest = getUnhandledProps(RatingIcon, props);
  var ElementType = getElementType(RatingIcon, props);

  var handleClick = function handleClick(e) {
    _invoke(props, 'onClick', e, props);
  };

  var handleKeyUp = function handleKeyUp(e) {
    _invoke(props, 'onKeyUp', e, props);

    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Enter:
      case keyboardKey.Spacebar:
        e.preventDefault();

        _invoke(props, 'onClick', e, props);

        break;

      default:
    }
  };

  var handleMouseEnter = function handleMouseEnter(e) {
    _invoke(props, 'onMouseEnter', e, props);
  };

  return /*#__PURE__*/React.createElement(ElementType, _extends({
    role: "radio"
  }, rest, {
    className: classes,
    onClick: handleClick,
    onKeyUp: handleKeyUp,
    onMouseEnter: handleMouseEnter,
    ref: ref
  }));
});
RatingIcon.handledProps = ["active", "as", "className", "index", "onClick", "onKeyUp", "onMouseEnter", "selected"];
RatingIcon.displayName = 'RatingIcon';
RatingIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Indicates activity of an icon. */
  active: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** An index of icon inside Rating. */
  index: PropTypes.number,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyUp: PropTypes.func,

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter: PropTypes.func,

  /** Indicates selection of an icon. */
  selected: PropTypes.bool
} : {};
RatingIcon.defaultProps = {
  as: 'i'
};
export default RatingIcon;