import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import React from 'react';
import { createShorthandFactory, getUnhandledProps, isBrowser } from '../../lib';
import Portal from '../../addons/Portal';
import DimmerDimmable from './DimmerDimmable';
import DimmerInner from './DimmerInner';
/**
 * A dimmer hides distractions to focus attention on particular content.
 */

var Dimmer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
      page = props.page;
  var rest = getUnhandledProps(Dimmer, props);

  if (page) {
    var handlePortalMount = function handlePortalMount() {
      if (!isBrowser()) {
        return;
      } // Heads up, IE doesn't support second argument in add()


      document.body.classList.add('dimmed');
      document.body.classList.add('dimmable');
    };

    var handlePortalUnmount = function handlePortalUnmount() {
      if (!isBrowser()) {
        return;
      } // Heads up, IE doesn't support second argument in add()


      document.body.classList.remove('dimmed');
      document.body.classList.remove('dimmable');
    };

    return /*#__PURE__*/React.createElement(Portal, {
      closeOnEscape: false,
      closeOnDocumentClick: false,
      onMount: handlePortalMount,
      onUnmount: handlePortalUnmount,
      open: active,
      openOnTriggerClick: false
    }, /*#__PURE__*/React.createElement(DimmerInner, _extends({}, rest, {
      active: active,
      page: page,
      ref: ref
    })));
  }

  return /*#__PURE__*/React.createElement(DimmerInner, _extends({}, rest, {
    active: active,
    page: page,
    ref: ref
  }));
});
Dimmer.handledProps = ["active", "page"];
Dimmer.displayName = 'Dimmer';
Dimmer.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An active dimmer will dim its parent container. */
  active: PropTypes.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: PropTypes.bool
} : {};
Dimmer.Dimmable = DimmerDimmable;
Dimmer.Inner = DimmerInner;
Dimmer.create = createShorthandFactory(Dimmer, function (value) {
  return {
    content: value
  };
});
export default Dimmer;