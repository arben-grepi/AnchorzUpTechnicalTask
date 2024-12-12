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
  async function createUrl(originalUrl, expirationMinutes) {
    try {
      const expiration = addMinutesToCurrentLocaleTime(expirationMinutes);
      console.log(
        "Original URL and expiration time:",
        originalUrl,
        expirationMinutes
      );
      console.log();
      const res = await axios.post("http://localhost:5000/api/v1/urls", {
        originalUrl,
        expiration,
      });
      dispatch({
        type: "ADD_URL",
        payload: res.data.data, // assuming the API returns created URL under data.data
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred",
      });
    }
  }
  const addMinutesToCurrentLocaleTime = (minutes) => {
    const currentDate = new Date(); // Get the current date and time in local timezone
    currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the desired minutes
    return currentDate.toLocaleString();
  };

  return (
    <GlobalContext.Provider
      value={{
        urls: state.urls,
        error: state.error,
        loading: state.loading,
        getUrls,
        deleteUrl,
        createUrl,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
