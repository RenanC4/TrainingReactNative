/**
 * Request initial state.
 *
 * @return {Object} Request initial state
 */
export const requestInitialState = () => ({
  data: {},
  isLoading: false,
  loaded: false,
  loading: false,
  error: '',
});

/**
 * Request loading state reducer.
 *
 * @param {Object} state - State
 * @return {Object} New state
 */
export const requestLoadingState = state => ({
  ...state,
  isLoading: true,
  loaded: false,
  loading: false,
});

/**
 * Request success state reducer.
 *
 * @param {Object} state - State
 * @return {Object} New state
 */
export const requestSuccessState = state => ({
  ...state,
  isLoading: false,
  loaded: true,
  loading: false,
});

/**
 * Request error state reducer.
 *
 * @param {Object} state - Application state
 * @param {Object} action - Action from action creator
 * @return {Object} New state
 */
export const requestErrorState = (state, action) => ({
  ...state,
  isLoading: false,
  loading: false,
  loaded: false,
  error: action.error,
});
