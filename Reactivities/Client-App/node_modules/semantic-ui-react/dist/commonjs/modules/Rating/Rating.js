"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _times2 = _interopRequireDefault(require("lodash/times"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _RatingIcon = _interopRequireDefault(require("./RatingIcon"));

/**
 * A rating indicates user interest in content.
 */
var Rating = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
      clearable = props.clearable,
      disabled = props.disabled,
      icon = props.icon,
      maxRating = props.maxRating,
      size = props.size;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.rating,
    defaultState: props.defaultRating,
    initialState: 0
  }),
      rating = _useAutoControlledVal[0],
      setRating = _useAutoControlledVal[1];

  var _React$useState = _react.default.useState(-1),
      selectedIndex = _React$useState[0],
      setSelectedIndex = _React$useState[1];

  var _React$useState2 = _react.default.useState(false),
      isSelecting = _React$useState2[0],
      setIsSelecting = _React$useState2[1];

  var classes = (0, _clsx.default)('ui', icon, size, (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(isSelecting && !disabled && selectedIndex >= 0, 'selected'), 'rating', className);
  var rest = (0, _lib.getUnhandledProps)(Rating, props);
  var ElementType = (0, _lib.getElementType)(Rating, props);

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
    (0, _invoke2.default)(props, 'onRate', e, (0, _extends2.default)({}, props, {
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

    _invoke2.default.apply(void 0, [props, 'onMouseLeave'].concat(args));

    if (disabled) {
      return;
    }

    setSelectedIndex(-1);
    setIsSelecting(false);
  };

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({
    role: "radiogroup"
  }, rest, {
    className: classes,
    onMouseLeave: handleMouseLeave,
    ref: ref,
    tabIndex: disabled ? 0 : -1
  }), (0, _times2.default)(maxRating, function (i) {
    return (
      /*#__PURE__*/

      /* TODO: use .create() factory */
      _react.default.createElement(_RatingIcon.default, {
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
  as: _propTypes.default.elementType,

  /** Additional classes. */
  className: _propTypes.default.string,

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['auto'])]),

  /** The initial rating value. */
  defaultRating: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled: _propTypes.default.bool,

  /** A rating can use a set of star or heart icons. */
  icon: _propTypes.default.oneOf(['star', 'heart']),

  /** The total number of icons. */
  maxRating: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate: _propTypes.default.func,

  /** The current number of active icons. */
  rating: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** A progress bar can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium', 'big'))
} : {};
Rating.defaultProps = {
  clearable: 'auto',
  maxRating: 1
};
Rating.Icon = _RatingIcon.default;
var _default = Rating;
exports.default = _default;