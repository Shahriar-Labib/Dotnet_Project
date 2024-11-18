import _extends from "@babel/runtime/helpers/esm/extends";
import _map from "lodash-es/map";
import _isNil from "lodash-es/isNil";
import _invoke from "lodash-es/invoke";
import PropTypes from 'prop-types';
import React from 'react';
import { createPaginationItems, customPropTypes, getUnhandledProps, useAutoControlledValue } from '../../lib';
import Menu from '../../collections/Menu';
import PaginationItem from './PaginationItem';
/**
 * A component to render a pagination.
 */

var Pagination = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var ariaLabel = props['aria-label'],
      boundaryRange = props.boundaryRange,
      disabled = props.disabled,
      ellipsisItem = props.ellipsisItem,
      siblingRange = props.siblingRange,
      totalPages = props.totalPages;

  var _useAutoControlledVal = useAutoControlledValue({
    state: props.activePage,
    defaultState: props.defaultActivePage,
    initialState: 1
  }),
      activePage = _useAutoControlledVal[0],
      setActivePage = _useAutoControlledVal[1];

  var handleItemClick = function handleItemClick(e, _ref) {
    var nextActivePage = _ref.value;
    var prevActivePage = activePage; // Heads up! We need the cast to the "number" type there, as `activePage` can be a string

    if (+prevActivePage === +nextActivePage) {
      return;
    }

    setActivePage(nextActivePage);

    _invoke(props, 'onPageChange', e, _extends({}, props, {
      activePage: nextActivePage
    }));
  };

  var handleItemOverrides = function handleItemOverrides(active, type, value) {
    return function (predefinedProps) {
      return {
        active: active,
        type: type,
        key: type + "-" + value,
        onClick: function onClick(e, itemProps) {
          _invoke(predefinedProps, 'onClick', e, itemProps);

          if (itemProps.type !== 'ellipsisItem') {
            handleItemClick(e, itemProps);
          }
        }
      };
    };
  };

  var items = createPaginationItems({
    activePage: activePage,
    boundaryRange: boundaryRange,
    hideEllipsis: _isNil(ellipsisItem),
    siblingRange: siblingRange,
    totalPages: totalPages
  });
  var rest = getUnhandledProps(Pagination, props);
  return /*#__PURE__*/React.createElement(Menu, _extends({}, rest, {
    "aria-label": ariaLabel,
    pagination: true,
    role: "navigation",
    ref: ref
  }), _map(items, function (_ref2) {
    var active = _ref2.active,
        type = _ref2.type,
        value = _ref2.value;
    return PaginationItem.create(props[type], {
      defaultProps: {
        content: value,
        disabled: disabled,
        value: value
      },
      overrideProps: handleItemOverrides(active, type, value)
    });
  }));
});
Pagination.handledProps = ["activePage", "aria-label", "boundaryRange", "defaultActivePage", "disabled", "ellipsisItem", "firstItem", "lastItem", "nextItem", "onPageChange", "pageItem", "prevItem", "siblingRange", "totalPages"];
Pagination.displayName = 'Pagination';
Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  /** A pagination item can have an aria label. */
  'aria-label': PropTypes.string,

  /** Initial activePage value. */
  defaultActivePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Index of the currently active page. */
  activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Number of always visible pages at the beginning and end. */
  boundaryRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** A pagination can be disabled. */
  disabled: PropTypes.bool,

  /** A shorthand for PaginationItem. */
  ellipsisItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  firstItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  lastItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  nextItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  pageItem: customPropTypes.itemShorthand,

  /** A shorthand for PaginationItem. */
  prevItem: customPropTypes.itemShorthand,

  /**
   * Called on change of an active page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onPageChange: PropTypes.func,

  /** Number of always visible pages before and after the current one. */
  siblingRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Total number of pages. */
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
} : {};
Pagination.defaultProps = {
  'aria-label': 'Pagination Navigation',
  boundaryRange: 1,
  ellipsisItem: '...',
  firstItem: {
    'aria-label': 'First item',
    content: '«'
  },
  lastItem: {
    'aria-label': 'Last item',
    content: '»'
  },
  nextItem: {
    'aria-label': 'Next item',
    content: '⟩'
  },
  pageItem: {},
  prevItem: {
    'aria-label': 'Previous item',
    content: '⟨'
  },
  siblingRange: 1
};
Pagination.Item = PaginationItem;
export default Pagination;