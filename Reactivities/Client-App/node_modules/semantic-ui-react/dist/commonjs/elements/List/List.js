"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _ListContent = _interopRequireDefault(require("./ListContent"));

var _ListDescription = _interopRequireDefault(require("./ListDescription"));

var _ListHeader = _interopRequireDefault(require("./ListHeader"));

var _ListIcon = _interopRequireDefault(require("./ListIcon"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _ListList = _interopRequireDefault(require("./ListList"));

/**
 * A list groups related content.
 */
var List = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var animated = props.animated,
      bulleted = props.bulleted,
      celled = props.celled,
      children = props.children,
      className = props.className,
      content = props.content,
      divided = props.divided,
      floated = props.floated,
      horizontal = props.horizontal,
      inverted = props.inverted,
      items = props.items,
      link = props.link,
      ordered = props.ordered,
      relaxed = props.relaxed,
      selection = props.selection,
      size = props.size,
      verticalAlign = props.verticalAlign;
  var classes = (0, _clsx.default)('ui', size, (0, _lib.useKeyOnly)(animated, 'animated'), (0, _lib.useKeyOnly)(bulleted, 'bulleted'), (0, _lib.useKeyOnly)(celled, 'celled'), (0, _lib.useKeyOnly)(divided, 'divided'), (0, _lib.useKeyOnly)(horizontal, 'horizontal'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOnly)(ordered, 'ordered'), (0, _lib.useKeyOnly)(selection, 'selection'), (0, _lib.useKeyOrValueAndKey)(relaxed, 'relaxed'), (0, _lib.useValueAndKey)(floated, 'floated'), (0, _lib.useVerticalAlignProp)(verticalAlign), 'list', className);
  var rest = (0, _lib.getUnhandledProps)(List, props);
  var ElementType = (0, _lib.getElementType)(List, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({
      role: "list"
    }, rest, {
      className: classes,
      ref: ref
    }), children);
  }

  if (!_lib.childrenUtils.isNil(content)) {
    return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({
      role: "list"
    }, rest, {
      className: classes,
      ref: ref
    }), content);
  }

  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({
    role: "list"
  }, rest, {
    className: classes,
    ref: ref
  }), (0, _map2.default)(items, function (item) {
    return _ListItem.default.create(item, {
      overrideProps: function overrideProps(predefinedProps) {
        return {
          onClick: function onClick(e, itemProps) {
            (0, _invoke2.default)(predefinedProps, 'onClick', e, itemProps);
            (0, _invoke2.default)(props, 'onItemClick', e, itemProps);
          }
        };
      }
    });
  }));
});

List.handledProps = ["animated", "as", "bulleted", "celled", "children", "className", "content", "divided", "floated", "horizontal", "inverted", "items", "link", "onItemClick", "ordered", "relaxed", "selection", "size", "verticalAlign"];
List.displayName = 'List';
List.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** A list can animate to set the current item apart from the list. */
  animated: _propTypes.default.bool,

  /** A list can mark items with a bullet. */
  bulleted: _propTypes.default.bool,

  /** A list can divide its items into cells. */
  celled: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A list can show divisions between content. */
  divided: _propTypes.default.bool,

  /** An list can be floated left or right. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** A list can be formatted to have items appear horizontally. */
  horizontal: _propTypes.default.bool,

  /** A list can be inverted to appear on a dark background. */
  inverted: _propTypes.default.bool,

  /** Shorthand array of props for ListItem. */
  items: _lib.customPropTypes.collectionShorthand,

  /** A list can be specially formatted for navigation links. */
  link: _propTypes.default.bool,

  /**
   * onClick handler for ListItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _propTypes.default.func]),

  /** A list can be ordered numerically. */
  ordered: _propTypes.default.bool,

  /** A list can relax its padding to provide more negative space. */
  relaxed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** A selection list formats list items as possible choices. */
  selection: _propTypes.default.bool,

  /** A list can vary in size. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES),

  /** An element inside a list can be vertically aligned. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS)
} : {};
List.Content = _ListContent.default;
List.Description = _ListDescription.default;
List.Header = _ListHeader.default;
List.Icon = _ListIcon.default;
List.Item = _ListItem.default;
List.List = _ListList.default;
var _default = List;
exports.default = _default;