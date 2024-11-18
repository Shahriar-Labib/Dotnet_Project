import _invoke from "lodash-es/invoke";
import keyboardKey from 'keyboard-key';
import PropTypes from 'prop-types';
import * as React from 'react';
import { createShorthandFactory } from '../../lib';
import MenuItem from '../../collections/Menu/MenuItem';
/**
 * An item of a pagination.
 */

var PaginationItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      type = props.type;
  var disabled = props.disabled || type === 'ellipsisItem';

  var handleClick = function handleClick(e) {
    _invoke(props, 'onClick', e, props);
  };

  var handleKeyDown = function handleKeyDown(e) {
    _invoke(props, 'onKeyDown', e, props);

    if (keyboardKey.getCode(e) === keyboardKey.Enter) {
      _invoke(props, 'onClick', e, props);
    }
  };

  return MenuItem.create(props, {
    defaultProps: {
      active: active,
      'aria-current': active,
      'aria-disabled': disabled,
      disabled: disabled,
      tabIndex: disabled ? -1 : 0
    },
    overrideProps: function overrideProps() {
      return {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        ref: ref
      };
    }
  });
});
PaginationItem.handledProps = ["active", "disabled", "onClick", "onKeyDown", "type"];
PaginationItem.displayName = 'PaginationItem';
PaginationItem.propTypes = {
  /** A pagination item can be active. */
  active: PropTypes.bool,

  /** A pagination item can be disabled. */
  disabled: PropTypes.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called on key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyDown: PropTypes.func,

  /** A pagination should have a type. */
  type: PropTypes.oneOf(['ellipsisItem', 'firstItem', 'prevItem', 'pageItem', 'nextItem', 'lastItem'])
};
PaginationItem.create = createShorthandFactory(PaginationItem, function (content) {
  return {
    content: content
  };
});
export default PaginationItem;