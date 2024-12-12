/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  urls: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getUrls() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/urls");
      dispatch({
        type: "GET_URLS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred",
      });
    }
  }

  async function deleteUrl(shortId) {
    try {
      await axios.delete(`http://localhost:5000/api/v1/urls/${shortId}`);
      dispatch({
        type: "DELETE_URL",
        payload: shortId,
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred",
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        urls: state.urls,
        error: state.error,
        loading: state.loading,
        getUrls,
        deleteUrl,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
