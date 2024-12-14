/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";

// Initial state for the global context
const initialState = {
  urls: [], // List of URLs
  error: null, // Error message
  loading: true, // Indicates if data is being loaded
};

// Create the global context
export const GlobalContext = createContext(initialState);

/**
 * GlobalProvider component
 * Provides global state and actions to the application via context.
 *
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.children - Child components wrapped by the provider.
 * @returns {JSX.Element} The context provider component.
 */
export const GlobalProvider = ({ children }) => {
  // Use the AppReducer to manage global state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /**
   * Fetches all URLs from the backend API and updates the global state.
   */
  async function getUrls() {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/urls");
      dispatch({
        type: "GET_URLS",
        payload: res.data.data, // Update URLs in the global state
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred", // Handle errors gracefully
      });
    }
  }

  /**
   * Deletes a URL by its short ID and updates the global state.
   *
   * @param {string} shortId - The unique identifier of the URL to delete.
   */
  async function deleteUrl(shortId) {
    try {
      await axios.delete(`http://localhost:5000/api/v1/urls/${shortId}`);
      dispatch({
        type: "DELETE_URL",
        payload: shortId, // Remove the URL from the global state
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred", // Handle errors gracefully
      });
    }
  }

  /**
   * Creates a new shortened URL with an expiration time and updates the global state.
   *
   * @param {string} originalUrl - The original URL to shorten.
   * @param {number} expirationMinutes - The expiration time in minutes.
   */
  async function createUrl(originalUrl, expirationMinutes) {
    try {
      const expiration = addMinutesToCurrentLocaleTime(expirationMinutes); // Calculate expiration time

      const res = await axios.post("http://localhost:5000/api/v1/urls", {
        originalUrl,
        expiration,
      });
      dispatch({
        type: "ADD_URL",
        payload: res.data.data, // Add the created URL to the global state
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred", // Handle errors gracefully
      });
    }
  }

  /**
   * Increments the click count of a URL by its short ID and updates the global state.
   *
   * @param {string} shortId - The unique identifier of the URL to update.
   */
  async function incrementClickCount(shortId) {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/urls/${shortId}/click`
      );
      dispatch({
        type: "INCREMENT_CLICK",
        payload: res.data.data, // Update the clicked URL in the global state
      });
    } catch (err) {
      dispatch({
        type: "URLS_ERROR",
        payload: err.response?.data?.msg || "An error occurred", // Handle errors gracefully
      });
    }
  }

  /**
   * Adds a specified number of minutes to the current local time and returns the result.
   *
   * @param {number} minutes - The number of minutes to add.
   * @returns {string} - The resulting date and time as a locale string.
   */
  const addMinutesToCurrentLocaleTime = (minutes) => {
    const currentDate = new Date(); // Get the current date and time
    currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the specified minutes
    return currentDate.toLocaleString(); // Return the updated time as a locale string
  };

  return (
    <GlobalContext.Provider
      value={{
        urls: state.urls, // List of URLs
        error: state.error, // Error message
        loading: state.loading, // Loading status
        getUrls, // Fetch URLs
        deleteUrl, // Delete a URL
        createUrl, // Create a new URL
        incrementClickCount, // Increment click count for a URL
      }}
    >
      {children} {/* Render child components within the provider */}
    </GlobalContext.Provider>
  );
};
