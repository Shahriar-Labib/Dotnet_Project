"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Portal = _interopRequireDefault(require("../../addons/Portal"));

var _DimmerDimmable = _interopRequireDefault(require("./DimmerDimmable"));

var _DimmerInner = _interopRequireDefault(require("./DimmerInner"));

/**
 * A dimmer hides distractions to focus attention on particular content.
 */
var Dimmer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
      page = props.page;
  var rest = (0, _lib.getUnhandledProps)(Dimmer, props);

  if (page) {
    var handlePortalMount = function handlePortalMount() {
      if (!(0, _lib.isBrowser)()) {
        return;
      } // Heads up, IE doesn't support second argument in add()


      document.body.classList.add('dimmed');
      document.body.classList.add('dimmable');
    };

    var handlePortalUnmount = function handlePortalUnmount() {
      if (!(0, _lib.isBrowser)()) {
        return;
      } // Heads up, IE doesn't support second argument in add()


      document.body.classList.remove('dimmed');
      document.body.classList.remove('dimmable');
    };

    return /*#__PURE__*/_react.default.createElement(_Portal.default, {
      closeOnEscape: false,
      closeOnDocumentClick: false,
      onMount: handlePortalMount,
      onUnmount: handlePortalUnmount,
      open: active,
      openOnTriggerClick: false
    }, /*#__PURE__*/_react.default.createElement(_DimmerInner.default, (0, _extends2.default)({}, rest, {
      active: active,
      page: page,
      ref: ref
    })));
  }

  return /*#__PURE__*/_react.default.createElement(_DimmerInner.default, (0, _extends2.default)({}, rest, {
    active: active,
    page: page,
    ref: ref
  }));
});

Dimmer.handledProps = ["active", "page"];
Dimmer.displayName = 'Dimmer';
Dimmer.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An active dimmer will dim its parent container. */
  active: _propTypes.default.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: _propTypes.default.bool
} : {};
Dimmer.Dimmable = _DimmerDimmable.default;
Dimmer.Inner = _DimmerInner.default;
Dimmer.create = (0, _lib.createShorthandFactory)(Dimmer, function (value) {
  return {
    content: value
  };
});
var _default = Dimmer;
exports.default = _default;