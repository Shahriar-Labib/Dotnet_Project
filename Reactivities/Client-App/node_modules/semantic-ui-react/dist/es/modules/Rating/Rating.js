import _extends from "@babel/runtime/helpers/esm/extends";
import _without from "lodash-es/without";
import _times from "lodash-es/times";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { getElementType, getUnhandledProps, SUI, useKeyOnly, useAutoControlledValue } from '../../lib';
import RatingIcon from './RatingIcon';
/**
 * A rating indicates user interest in content.
 */

var Rating = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
      clearable = props.clearable,
      disabled = props.disabled,
      icon = props.icon,
      maxRating = props.maxRating,
      size = props.size;

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.rating,
    defaultState: props.defaultRating,
    initialState: 0
  }),
      rating = _useAutoControlledVal[0],
      setRating = _useAutoControlledVal[1];

  var _React$useState = React.useState(-1),
      selectedIndex = _React$useState[0],
      setSelectedIndex = _React$useState[1];

  var _React$useState2 = React.useState(false),
      isSelecting = _React$useState2[0],
      setIsSelecting = _React$useState2[1];

  var classes = cx('ui', icon, size, useKeyOnly(disabled, 'disabled'), useKeyOnly(isSelecting && !disabled && selectedIndex >= 0, 'selected'), 'rating', className);
  var rest = getUnhandledProps(Rating, props);
  var ElementType = getElementType(Rating, props);

  var handleIconClick = function handleIconClick(e, _ref) {
    var index = _ref.index;

    if (disabled) {
      return;
    } // default newRating is the clicked icon
    // allow toggling a binary rating
    // allow clearing ratings


    var newRating = index + 1;

    if (clearable === 'auto' && maxRating === 1) {
      newRating = +!rating;
    } else if (clearable === true && newRating === rating) {
      newRating = 0;
    } // set rating


    setRating(newRating);
    setIsSelecting(false);

    _invoke(props, 'onRate', e, _extends({}, props, {
      rating: newRating
    }));
  };

  var handleIconMouseEnter = function handleIconMouseEnter(e, _ref2) {
    var index = _ref2.index;

    if (disabled) {
      return;
    }

    setSelectedIndex(index);
    setIsSelecting(true);
  };

  var handleMouseLeave = function handleMouseLeave() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _invoke.apply(void 0, [props, 'onMouseLeave'].concat(args));

    if (disabled) {
      return;
    }

    setSelectedIndex(-1);
    setIsSelecting(false);
  };

  return /*#__PURE__*/React.createElement(ElementType, _extends({
    role: "radiogroup"
  }, rest, {
    className: classes,
    onMouseLeave: handleMouseLeave,
    ref: ref,
    tabIndex: disabled ? 0 : -1
  }), _times(maxRating, function (i) {
    return (
      /*#__PURE__*/

      /* TODO: use .create() factory */
      React.createElement(RatingIcon, {
        tabIndex: disabled ? -1 : 0,
        active: rating >= i + 1,
        "aria-checked": rating === i + 1,
        "aria-posinset": i + 1,
        "aria-setsize": maxRating,
        index: i,
        key: i,
        onClick: handleIconClick,
        onMouseEnter: handleIconMouseEnter,
        selected: selectedIndex >= i && isSelecting
      })
    );
  }));
});
Rating.handledProps = ["as", "className", "clearable", "defaultRating", "disabled", "icon", "maxRating", "onRate", "rating", "size"];
Rating.displayName = 'Rating';
Rating.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Additional classes. */
  className: PropTypes.string,

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]),

  /** The initial rating value. */
  defaultRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled: PropTypes.bool,

  /** A rating can use a set of star or heart icons. */
  icon: PropTypes.oneOf(['star', 'heart']),

  /** The total number of icons. */
  maxRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate: PropTypes.func,

  /** The current number of active icons. */
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A progress bar can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium', 'big'))
} : {};
Rating.defaultProps = {
  clearable: 'auto',
  maxRating: 1
};
Rating.Icon = RatingIcon;
export default Rating;