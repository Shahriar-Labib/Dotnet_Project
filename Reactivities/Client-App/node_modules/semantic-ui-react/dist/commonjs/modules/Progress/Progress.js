"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _round2 = _interopRequireDefault(require("lodash/round"));

var _clamp2 = _interopRequireDefault(require("lodash/clamp"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * @param {Number|String} percent
 * @param {Number|String} total
 * @param {Number|String} value
 *
 * @return {Number|String}
 */
function calculatePercent(percent, total, value) {
  if (!(0, _isUndefined2.default)(percent)) {
    return percent;
  }

  if (!(0, _isUndefined2.default)(total) && !(0, _isUndefined2.default)(value)) {
    return value / total * 100;
  }

  return 0;
}
/**
 * @param {Number|String} percent
 * @param {Number|String} total
 * @param {Number|String} value
 * @param {Boolean|'percent'|'ratio'|'value'} progress
 * @param {Number} precision
 *
 * @return {Number}
 */


function getPercent(percent, total, value, progress, precision) {
  var clampedPercent = (0, _clamp2.default)(calculatePercent(percent, total, value), 0, 100);

  if (!(0, _isUndefined2.default)(total) && !(0, _isUndefined2.default)(value) && progress === 'value') {
    return value / total * 100;
  }

  if (progress === 'value') {
    return value;
  }

  if ((0, _isUndefined2.default)(precision)) {
    return clampedPercent;
  }

  return (0, _round2.default)(clampedPercent, precision);
}
/**
 * A progress bar shows the progression of a task.
 */


var Progress = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      autoSuccess = props.autoSuccess,
      attached = props.attached,
      children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      disabled = props.disabled,
      error = props.error,
      indicating = props.indicating,
      inverted = props.inverted,
      label = props.label,
      percent = props.percent,
      precision = props.precision,
      progress = props.progress,
      total = props.total,
      size = props.size,
      success = props.success,
      value = props.value,
      warning = props.warning;
  var calculatedPercent = getPercent(percent, total, value, progress, precision) || 0;
  var isAutoSuccess = autoSuccess && (percent >= 100 || value >= total);

  var computeValueText = function computeValueText() {
    if (progress === 'value') {
      return value;
    }

    if (progress === 'ratio') {
      return value + "/" + total;
    }

    return calculatedPercent + "%";
  };

  var renderLabel = function renderLabel() {
    if (!_lib.childrenUtils.isNil(children)) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "label"
      }, children);
    }

    if (!_lib.childrenUtils.isNil(content)) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "label"
      }, content);
    }

    return (0, _lib.createHTMLDivision)(label, {
      autoGenerateKey: false,
      defaultProps: {
        className: 'label'
      }
    });
  };

  renderLabel.handledProps = [];

  var renderProgress = function renderProgress() {
    if (!progress && (0, _isUndefined2.default)(precision)) {
      return;
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "progress"
    }, computeValueText());
  };

  renderProgress.handledProps = [];
  var classes = (0, _clsx.default)('ui', color, size, (0, _lib.useKeyOnly)(active || indicating, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(indicating, 'indicating'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(success || isAutoSuccess, 'success'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useValueAndKey)(attached, 'attached'), 'progress', className);
  var rest = (0, _lib.getUnhandledProps)(Progress, props);
  var ElementType = (0, _lib.getElementType)(Progress, props);
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    "data-percent": Math.floor(calculatedPercent),
    ref: ref
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "bar",
    style: {
      width: calculatedPercent + "%"
    }
  }, renderProgress()), renderLabel());
});

Progress.handledProps = ["active", "as", "attached", "autoSuccess", "children", "className", "color", "content", "disabled", "error", "indicating", "inverted", "label", "percent", "precision", "progress", "size", "success", "total", "value", "warning"];
Progress.displayName = 'Progress';
Progress.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A progress bar can show activity. */
  active: _propTypes.default.bool,

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached: _propTypes.default.oneOf(['top', 'bottom']),

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A progress bar can have different colors. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A progress bar be disabled. */
  disabled: _propTypes.default.bool,

  /** A progress bar can show a error state. */
  error: _propTypes.default.bool,

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating: _propTypes.default.bool,

  /** A progress bar can have its colors inverted. */
  inverted: _propTypes.default.bool,

  /** Can be set to either to display progress as percent or ratio. */
  label: _lib.customPropTypes.itemShorthand,

  /** Current percent complete. */
  percent: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['total', 'value']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** Decimal point precision for calculated progress. */
  precision: _propTypes.default.number,

  /** A progress bar can contain a text value indicating current progress. */
  progress: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['percent', 'ratio', 'value'])]),

  /** A progress bar can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'mini', 'huge', 'massive')),

  /** A progress bar can show a success state. */
  success: _propTypes.default.bool,

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total: _lib.customPropTypes.every([_lib.customPropTypes.demand(['value']), _lib.customPropTypes.disallow(['percent']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['percent']), _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])]),

  /** A progress bar can show a warning state. */
  warning: _propTypes.default.bool
} : {};
var _default = Progress;
exports.default = _default;