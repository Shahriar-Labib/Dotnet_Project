import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _map from "lodash-es/map";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import Button from '../../elements/Button';
/**
 * A modal can contain a row of actions.
 */

var ModalActions = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var actions = props.actions,
      children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('actions', className);
  var rest = getUnhandledProps(ModalActions, props);
  var ElementType = getElementType(ModalActions, props);

  if (!childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes,
      ref: ref
    }), children);
  }

  if (!childrenUtils.isNil(content)) {
    return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), content);
  }

  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), _map(actions, function (action) {
    return Button.create(action, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onClick: function onClick(e, buttonProps) {
            _invoke(predefinedProps, 'onClick', e, buttonProps);

            _invoke(props, 'onActionClick', e, buttonProps);
          }
        };
      }
    });
  }));
});
ModalActions.handledProps = ["actions", "as", "children", "className", "content", "onActionClick"];
ModalActions.displayName = 'ModalActions';
ModalActions.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Array of shorthand buttons. */
  actions: customPropTypes.collectionShorthand,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /**
   * Action onClick handler when using shorthand `actions`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props from the clicked action.
   */
  onActionClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func])
} : {};
ModalActions.create = createShorthandFactory(ModalActions, function (actions) {
  return {
    actions: actions
  };
});
export default ModalActions;