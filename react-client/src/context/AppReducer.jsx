const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_URLS":
      return {
        ...state,
        urls: action.payload,
        error: null,
        loading: false,
      };
    case "DELETE_URL":
      return {
        ...state,
        urls: state.urls.filter((url) => url.shortId !== action.payload),
        error: null,
      };
    case "URLS_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default AppReducer;
