import * as React from 'react';
/**
 * A hook that allows optional user control, implements an interface similar to `React.useState()`.
 * Useful for components which allow uncontrolled and controlled behaviours for users.
 *
 * - defaultState - default state or factory initializer
 * - state - controllable state, undefined state means internal state will be used
 * - initialState - Used to initialize state if all user provided states are undefined
 *
 * @param {{ defaultState?: any, state: any, initialState: any }} options
 *
 * @see https://reactjs.org/docs/uncontrolled-components.html
 * @see https://reactjs.org/docs/hooks-state.html
 */

function useAutoControlledValue(options) {
  var initialState = typeof options.defaultState === 'undefined' ? options.initialState : options.defaultState;

  var _React$useState = React.useState(initialState),
      internalState = _React$useState[0],
      setInternalState = _React$useState[1];

  var state = typeof options.state === 'undefined' ? internalState : options.state;
  var stateRef = React.useRef(state);
  React.useEffect(function () {
    stateRef.current = state;
  }, [state]); // To match the behavior of the setter returned by React.useState, this callback's identity
  // should never change. This means it MUST NOT directly reference variables that can change.

  var setState = React.useCallback(function (newState) {
    // React dispatch can use a factory
    // https://reactjs.org/docs/hooks-reference.html#functional-updates
    if (typeof newState === 'function') {
      stateRef.current = newState(stateRef.current);
    } else {
      stateRef.current = newState;
    }

    setInternalState(stateRef.current);
  }, []);
  return [state, setState];
}

export default useAutoControlledValue;