import React from 'react';
import { useMergedRefs } from '../../../lib';
import validateTrigger from './validateTrigger';
/**
 * @param {React.ReactNode} trigger
 * @param {React.Ref} triggerRef
 */

function useTrigger(trigger, triggerRef) {
  var ref = useMergedRefs(trigger == null ? void 0 : trigger.ref, triggerRef);

  if (trigger) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      validateTrigger(trigger);
    }

    return [ref, /*#__PURE__*/React.cloneElement(trigger, {
      ref: ref
    })];
  }

  return [ref, null];
}

export default useTrigger;