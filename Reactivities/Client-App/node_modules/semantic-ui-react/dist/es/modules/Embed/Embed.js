import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import cx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createHTMLIframe, customPropTypes, getElementType, getUnhandledProps, useKeyOnly, useAutoControlledValue } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */

var Embed = /*#__PURE__*/React.forwardRef(function (props, ref) {
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

  var _useAutoControlledVal = useAutoControlledValue({
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
    _invoke(props, 'onClick', e, _extends({}, props, {
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

    if (!childrenUtils.isNil(children)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "embed"
      }, children);
    }

    if (!childrenUtils.isNil(content)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "embed"
      }, content);
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "embed"
    }, createHTMLIframe(childrenUtils.isNil(iframe) ? getSrc() : iframe, {
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
  var classes = cx('ui', aspectRatio, useKeyOnly(active, 'active'), 'embed', className);
  var rest = getUnhandledProps(Embed, props);
  var ElementType = getElementType(Embed, props);
  var iconShorthand = icon !== undefined ? icon : 'video play';
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    onClick: handleClick,
    ref: ref
  }), Icon.create(iconShorthand, {
    autoGenerateKey: false
  }), placeholder && /*#__PURE__*/React.createElement("img", {
    className: "placeholder",
    src: placeholder
  }), renderEmbed());
});
Embed.handledProps = ["active", "as", "aspectRatio", "autoplay", "brandedUI", "children", "className", "color", "content", "defaultActive", "hd", "icon", "id", "iframe", "onClick", "placeholder", "source", "url"];
Embed.displayName = 'Embed';
Embed.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An embed can be active. */
  active: PropTypes.bool,

  /** An embed can specify an alternative aspect ratio. */
  aspectRatio: PropTypes.oneOf(['4:3', '16:9', '21:9']),

  /** Setting to true or false will force autoplay. */
  autoplay: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

  /** Whether to show networks branded UI like title cards, or after video calls to action. */
  brandedUI: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Specifies a default chrome color with Vimeo or YouTube. */
  color: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Initial value of active. */
  defaultActive: PropTypes.bool,

  /** Whether to prefer HD content. */
  hd: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),

  /** Specifies an icon to use with placeholder content. */
  icon: customPropTypes.itemShorthand,

  /** Specifies an id for source. */
  id: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),

  /** Shorthand for HTML iframe. */
  iframe: customPropTypes.every([customPropTypes.demand(['source']), customPropTypes.itemShorthand]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onClick: PropTypes.func,

  /** A placeholder image for embed. */
  placeholder: PropTypes.string,

  /** Specifies a source to use. */
  source: customPropTypes.every([customPropTypes.disallow(['sourceUrl']), PropTypes.oneOf(['youtube', 'vimeo'])]),

  /** Specifies a url to use for embed. */
  url: customPropTypes.every([customPropTypes.disallow(['source']), PropTypes.string])
} : {};
export default Embed;