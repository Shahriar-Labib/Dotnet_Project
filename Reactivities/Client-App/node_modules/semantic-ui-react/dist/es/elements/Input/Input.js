import _extends from "@babel/runtime/helpers/esm/extends";
import _includes from "lodash-es/includes";
import _map from "lodash-es/map";
import _invoke from "lodash-es/invoke";
import _get from "lodash-es/get";
import _isNil from "lodash-es/isNil";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createHTMLInput, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, partitionHTMLProps, useKeyOnly, useValueAndKey, setRef } from '../../lib';
import Button from '../Button';
import Icon from '../Icon';
import Label from '../Label';
/**
 * An Input is a field used to elicit a response from a user.
 * @see Button
 * @see Form
 * @see Icon
 * @see Label
 */

var Input = /*#__PURE__*/React.forwardRef(function (props, _ref) {
  var action = props.action,
      actionPosition = props.actionPosition,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      error = props.error,
      fluid = props.fluid,
      focus = props.focus,
      icon = props.icon,
      iconPosition = props.iconPosition,
      input = props.input,
      inverted = props.inverted,
      label = props.label,
      labelPosition = props.labelPosition,
      loading = props.loading,
      size = props.size,
      tabIndex = props.tabIndex,
      transparent = props.transparent,
      type = props.type;

  var computeIcon = function computeIcon() {
    if (!_isNil(icon)) {
      return icon;
    }

    if (loading) {
      return 'spinner';
    }
  };

  var computeTabIndex = function computeTabIndex() {
    if (!_isNil(tabIndex)) {
      return tabIndex;
    }

    if (disabled) {
      return -1;
    }
  };

  var handleChange = function handleChange(e) {
    var newValue = _get(e, 'target.value');

    _invoke(props, 'onChange', e, _extends({}, props, {
      value: newValue
    }));
  };

  var partitionProps = function partitionProps() {
    var unhandledProps = getUnhandledProps(Input, props);

    var _partitionHTMLProps = partitionHTMLProps(unhandledProps),
        htmlInputProps = _partitionHTMLProps[0],
        rest = _partitionHTMLProps[1];

    return [_extends({}, htmlInputProps, {
      disabled: disabled,
      type: type,
      tabIndex: computeTabIndex(),
      onChange: handleChange,
      ref: _ref
    }), rest];
  };

  var classes = cx('ui', size, useKeyOnly(disabled, 'disabled'), useKeyOnly(error, 'error'), useKeyOnly(fluid, 'fluid'), useKeyOnly(focus, 'focus'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(transparent, 'transparent'), useValueAndKey(actionPosition, 'action') || useKeyOnly(action, 'action'), useValueAndKey(iconPosition, 'icon') || useKeyOnly(icon || loading, 'icon'), useValueAndKey(labelPosition, 'labeled') || useKeyOnly(label, 'labeled'), 'input', className);
  var ElementType = getElementType(Input, props);

  var _partitionProps = partitionProps(),
      htmlInputProps = _partitionProps[0],
      rest = _partitionProps[1]; // Render with children
  // ----------------------------------------


  if (!childrenUtils.isNil(children)) {
    // add htmlInputProps to the `<input />` child
    var childElements = _map(React.Children.toArray(children), function (child) {
      if (child.type === 'input') {
        return /*#__PURE__*/React.cloneElement(child, _extends({}, htmlInputProps, child.props, {
          ref: function ref(c) {
            setRef(child.ref, c);
            setRef(_ref, c);
          }
        }));
      }

      return child;
    });

    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), childElements);
  } // Render Shorthand
  // ----------------------------------------


  var actionElement = Button.create(action, {
    autoGenerateKey: false
  });
  var labelElement = Label.create(label, {
    defaultProps: {
      className: cx('label', // add 'left|right corner'
      _includes(labelPosition, 'corner') && labelPosition)
    },
    autoGenerateKey: false
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), actionPosition === 'left' && actionElement, labelPosition !== 'right' && labelElement, createHTMLInput(input || type, {
    defaultProps: htmlInputProps,
    autoGenerateKey: false
  }), Icon.create(computeIcon(), {
    autoGenerateKey: false
  }), actionPosition !== 'left' && actionElement, labelPosition === 'right' && labelElement);
});
Input.handledProps = ["action", "actionPosition", "as", "children", "className", "disabled", "error", "fluid", "focus", "icon", "iconPosition", "input", "inverted", "label", "labelPosition", "loading", "onChange", "size", "tabIndex", "transparent", "type"];
Input.displayName = 'Input';
Input.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An Input can be formatted to alert the user to an action they may perform. */
  action: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /** An action can appear along side an Input on the left or right. */
  actionPosition: PropTypes.oneOf(['left']),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** An Input field can show that it is disabled. */
  disabled: PropTypes.bool,

  /** An Input field can show the data contains errors. */
  error: PropTypes.bool,

  /** Take on the size of its container. */
  fluid: PropTypes.bool,

  /** An Input field can show a user is currently interacting with it. */
  focus: PropTypes.bool,

  /** Optional Icon to display inside the Input. */
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /** An Icon can appear inside an Input on the left or right. */
  iconPosition: PropTypes.oneOf(['left']),

  /** Shorthand for creating the HTML Input. */
  input: customPropTypes.itemShorthand,

  /** Format to appear on dark backgrounds. */
  inverted: PropTypes.bool,

  /** Optional Label to display along side the Input. */
  label: customPropTypes.itemShorthand,

  /** A Label can appear outside an Input on the left or right. */
  labelPosition: PropTypes.oneOf(['left', 'right', 'left corner', 'right corner']),

  /** An Icon Input field can show that it is currently loading data. */
  loading: PropTypes.bool,

  /**
   * Called on change.
   *
   * @param {ChangeEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and a proposed value.
   */
  onChange: PropTypes.func,

  /** An Input can vary in size. */
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),

  /** An Input can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Transparent Input has no background. */
  transparent: PropTypes.bool,

  /** The HTML input type. */
  type: PropTypes.string
} : {};
Input.defaultProps = {
  type: 'text'
};
Input.create = createShorthandFactory(Input, function (type) {
  return {
    type: type
  };
});
export default Input;