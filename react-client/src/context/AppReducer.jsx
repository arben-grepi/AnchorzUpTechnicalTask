/**
 * Reducer function for managing application state related to URLs.
 *
 * @param {Object} state - Current state of the application.
 * @param {Object} action - Action dispatched to modify the state.
 * @returns {Object} - Updated state based on the action type.
 */
const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_URLS":
      // Handles fetching and setting the list of URLs
      return {
        ...state,
        urls: action.payload, // Update the state with fetched URLs
        error: null, // Clear any previous errors
        loading: false, // Indicate loading is complete
      };
    case "DELETE_URL":
      // Handles deletion of a URL
      return {
        ...state,
        urls: state.urls.filter((url) => url.shortId !== action.payload), // Remove the deleted URL
        error: null, // Clear any errors
      };
    case "ADD_URL":
      // Handles adding a new URL to the list
      return {
        ...state,
        urls: [...state.urls, action.payload], // Append the new URL to the existing list
        error: null, // Clear any errors
        loading: false, // Indicate loading is complete
      };
    case "INCREMENT_CLICK":
      // Handles incrementing the click count for a specific URL
      return {
        ...state,
        urls: state.urls.map(
          (url) =>
            url.shortId === action.payload.shortId ? action.payload : url // Update the clicked URL's data
        ),
        error: null, // Clear any errors
        loading: false, // Indicate loading is complete
      };
    case "URLS_ERROR":
      // Handles errors related to URLs
      return {
        ...state,
        error: action.payload, // Set the error message
        loading: false, // Indicate loading is complete
      };
    default:
      // Return the current state if the action type is not recognized
      return state;
  }
};

export default AppReducer;
