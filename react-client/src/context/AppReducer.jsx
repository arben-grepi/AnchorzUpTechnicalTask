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
    case "ADD_URL":
      return {
        ...state,
        urls: [...state.urls, action.payload],
        error: null,
        loading: false,
      };
    case "INCREMENT_CLICK":
      return {
        ...state,
        urls: state.urls.map((url) =>
          url.shortId === action.payload.shortId ? action.payload : url
        ),
        error: null,
        loading: false,
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
