import _invoke from "lodash-es/invoke";
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { isBrowser, useEventCallback } from '../../lib';
import usePortalElement from './usePortalElement';

/**
 * An inner component that allows you to render children outside their parent.
 */
var PortalInner = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var handleMount = useEventCallback(function () {
    return _invoke(props, 'onMount', null, props);
  });
  var handleUnmount = useEventCallback(function () {
    return _invoke(props, 'onUnmount', null, props);
  });
  var element = usePortalElement(props.children, ref);
  React.useEffect(function () {
    handleMount();
    return function () {
      handleUnmount();
    };
  }, []);

  if (!isBrowser()) {
    return null;
  }

  return /*#__PURE__*/createPortal(element, props.mountNode || document.body);
});
PortalInner.handledProps = ["children", "mountNode", "onMount", "onUnmount"];
PortalInner.displayName = 'PortalInner';
PortalInner.propTypes = {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /** The node where the portal should mount. */
  mountNode: PropTypes.any,

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func
};
export default PortalInner;