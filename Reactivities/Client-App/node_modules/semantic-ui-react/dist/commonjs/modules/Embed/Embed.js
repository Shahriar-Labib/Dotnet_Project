"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
var Embed = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var aspectRatio = props.aspectRatio,
      _props$autoplay = props.autoplay,
      autoplay = _props$autoplay === void 0 ? true : _props$autoplay,
      _props$brandedUI = props.brandedUI,
      brandedUI = _props$brandedUI === void 0 ? false : _props$brandedUI,
      children = props.children,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? '#444444' : _props$color,
      content = props.content,
      _props$hd = props.hd,
      hd = _props$hd === void 0 ? true : _props$hd,
      icon = props.icon,
      id = props.id,
      iframe = props.iframe,
      placeholder = props.placeholder,
      source = props.source,
      url = props.url;

  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
    state: props.active,
    defaultState: props.defaultActive,
    initialState: false
  }),
      active = _useAutoControlledVal[0],
      setActive = _useAutoControlledVal[1];

  var getSrc = function getSrc() {
    if (source === 'youtube') {
      return ["//www.youtube.com/embed/" + id, '?autohide=true', "&amp;autoplay=" + autoplay, "&amp;color=" + encodeURIComponent(color), "&amp;hq=" + hd, '&amp;jsapi=false', "&amp;modestbranding=" + brandedUI, "&amp;rel=" + (brandedUI ? 0 : 1)].join('');
    }

    if (source === 'vimeo') {
      return ["//player.vimeo.com/video/" + id, '?api=false', "&amp;autoplay=" + autoplay, '&amp;byline=false', "&amp;color=" + encodeURIComponent(color), '&amp;portrait=false', '&amp;title=false'].join('');
    }

    return url;
  };

  var handleClick = function handleClick(e) {
    (0, _invoke2.default)(props, 'onClick', e, (0, _extends2.default)({}, props, {
      active: true
    }));

    if (!active) {
      setActive(true);
    }
  };

  var renderEmbed = function renderEmbed() {
    if (!active) {
      return null;
    }

    if (!_lib.childrenUtils.isNil(children)) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "embed"
      }, children);
    }

    if (!_lib.childrenUtils.isNil(content)) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "embed"
      }, content);
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "embed"
    }, (0, _lib.createHTMLIframe)(_lib.childrenUtils.isNil(iframe) ? getSrc() : iframe, {
      defaultProps: {
        allowFullScreen: false,
        frameBorder: 0,
        height: '100%',
        scrolling: 'no',
        src: getSrc(),
        title: "Embedded content from " + source + ".",
        width: '100%'
      },
      autoGenerateKey: false
    }));
  };

  renderEmbed.handledProps = [];
  var classes = (0, _clsx.default)('ui', aspectRatio, (0, _lib.useKeyOnly)(active, 'active'), 'embed', className);
  var rest = (0, _lib.getUnhandledProps)(Embed, props);
  var ElementType = (0, _lib.getElementType)(Embed, props);
  var iconShorthand = icon !== undefined ? icon : 'video play';
  return /*#__PURE__*/_react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), _Icon.default.create(iconShorthand, {
    autoGenerateKey: false
  }), placeholder && /*#__PURE__*/_react.default.createElement("img", {
    className: "placeholder",
    src: placeholder
  }), renderEmbed());
});

Embed.handledProps = ["active", "as", "aspectRatio", "autoplay", "brandedUI", "children", "className", "color", "content", "defaultActive", "hd", "icon", "id", "iframe", "onClick", "placeholder", "source", "url"];
Embed.displayName = 'Embed';
Embed.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,

  /** An embed can be active. */
  active: _propTypes.default.bool,

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio: _propTypes.default.oneOf(['4:3', '16:9', '21:9']),

  /** Setting to true or false will force autoplay. */
  autoplay: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.bool]),

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.bool]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.string]),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Initial value of active. */
  defaultActive: _propTypes.default.bool,

  /** Whether to prefer HD content. */
  hd: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.bool]),

  /** Specifies an icon to use with placeholder content. */
  icon: _lib.customPropTypes.itemShorthand,

  /** Specifies an id for source. */
  id: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _propTypes.default.string]),

  /** Shorthand for HTML iframe. */
  iframe: _lib.customPropTypes.every([_lib.customPropTypes.demand(['source']), _lib.customPropTypes.itemShorthand]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick: _propTypes.default.func,

  /** A placeholder image for embed. */
  placeholder: _propTypes.default.string,

  /** Specifies a source to use. */
  source: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['sourceUrl']), _propTypes.default.oneOf(['youtube', 'vimeo'])]),

  /** Specifies a url to use for embed. */
  url: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['source']), _propTypes.default.string])
} : {};
var _default = Embed;
exports.default = _default;