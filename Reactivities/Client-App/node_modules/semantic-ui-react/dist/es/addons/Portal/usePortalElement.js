import React from 'react';
import ReactIs from 'react-is';
import { useMergedRefs } from '../../lib';
/**
 * Assigns merged ref to an existing element is possible or wraps it with an additional "div".
 *
 * @param {React.ReactNode} node
 * @param {React.Ref} userRef
 */

export default function usePortalElement(node, userRef) {
  var ref = useMergedRefs(node.ref, userRef);

  if ( /*#__PURE__*/React.isValidElement(node)) {
    if (ReactIs.isForwardRef(node)) {
      return /*#__PURE__*/React.cloneElement(node, {
        ref: ref
      });
    }

    if (typeof node.type === 'string') {
      return /*#__PURE__*/React.cloneElement(node, {
        ref: ref
      });
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    "data-suir-portal": "true",
    ref: ref
  }, node);
}
usePortalElement.handledProps = [];