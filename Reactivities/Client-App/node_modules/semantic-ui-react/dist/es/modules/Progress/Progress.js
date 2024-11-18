import _extends from "@babel/runtime/helpers/esm/extends";
import _without from "lodash-es/without";
import _round from "lodash-es/round";
import _clamp from "lodash-es/clamp";
import _isUndefined from "lodash-es/isUndefined";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createHTMLDivision, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useValueAndKey } from '../../lib';
/**
 * @param {Number|String} percent
 * @param {Number|String} total
 * @param {Number|String} value
 *
 * @return {Number|String}
 */

function calculatePercent(percent, total, value) {
  if (!_isUndefined(percent)) {
    return percent;
  }

  if (!_isUndefined(total) && !_isUndefined(value)) {
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
  var clampedPercent = _clamp(calculatePercent(percent, total, value), 0, 100);

  if (!_isUndefined(total) && !_isUndefined(value) && progress === 'value') {
    return value / total * 100;
  }

  if (progress === 'value') {
    return value;
  }

  if (_isUndefined(precision)) {
    return clampedPercent;
  }

  return _round(clampedPercent, precision);
}
/**
 * A progress bar shows the progression of a task.
 */


var Progress = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    if (!childrenUtils.isNil(children)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "label"
      }, children);
    }

    if (!childrenUtils.isNil(content)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "label"
      }, content);
    }

    return createHTMLDivision(label, {
      autoGenerateKey: false,
      defaultProps: {
        className: 'label'
      }
    });
  };

  renderLabel.handledProps = [];

  var renderProgress = function renderProgress() {
    if (!progress && _isUndefined(precision)) {
      return;
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "progress"
    }, computeValueText());
  };

  renderProgress.handledProps = [];
  var classes = cx('ui', color, size, useKeyOnly(active || indicating, 'active'), useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(indicating, 'indicating'), useKeyOnly(inverted, 'inverted'), useKeyOnly(success || isAutoSuccess, 'success'), useKeyOnly(warning, 'warning'), useValueAndKey(attached, 'attached'), 'progress', className);
  var rest = getUnhandledProps(Progress, props);
  var ElementType = getElementType(Progress, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    "data-percent": Math.floor(calculatedPercent),
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
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
  as: PropTypes.elementType,

  /** A progress bar can show activity. */
  active: PropTypes.bool,

  /** A progress bar can attach to and show the progress of an element (i.e. Card or Segment). */
  attached: PropTypes.oneOf(['top', 'bottom']),

  /** Whether success state should automatically trigger when progress completes. */
  autoSuccess: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A progress bar can have different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A progress bar be disabled. */
  disabled: PropTypes.bool,

  /** A progress bar can show a error state. */
  error: PropTypes.bool,

  /** An indicating progress bar visually indicates the current level of progress of a task. */
  indicating: PropTypes.bool,

  /** A progress bar can have its colors inverted. */
  inverted: PropTypes.bool,

  /** Can be set to either to display progress as percent or ratio. */
  label: customPropTypes.itemShorthand,

  /** Current percent complete. */
  percent: customPropTypes.every([customPropTypes.disallow(['total', 'value']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** Decimal point precision for calculated progress. */
  precision: PropTypes.number,

  /** A progress bar can contain a text value indicating current progress. */
  progress: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['percent', 'ratio', 'value'])]),

  /** A progress bar can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'mini', 'huge', 'massive')),

  /** A progress bar can show a success state. */
  success: PropTypes.bool,

  /** For use with value. Together, these will calculate the percent. Mutually excludes percent. */
  total: customPropTypes.every([customPropTypes.demand(['value']), customPropTypes.disallow(['percent']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** For use with total. Together, these will calculate the percent. Mutually excludes percent. */
  value: customPropTypes.every([customPropTypes.disallow(['percent']), PropTypes.oneOfType([PropTypes.number, PropTypes.string])]),

  /** A progress bar can show a warning state. */
  warning: PropTypes.bool
} : {};
export default Progress;