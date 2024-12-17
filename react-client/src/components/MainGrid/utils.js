// utils.js

/**
 * Validates URL input and duration selection.
 *
 * @param {string} url - The URL entered by the user.
 * @param {number} duration - The selected duration in minutes.
 * @returns {boolean} - Returns true if validation passes, false otherwise.
 */
export const validateInput = (url, duration) => {
  if (!url) {
    alert("Please enter a URL before adding");
    return false;
  }
  if (!duration) {
    alert("Please select a duration");
    return false;
  }
  return true;
};

/**
 * Handles the logic for adding a new URL.
 *
 * @param {string} url - The original URL entered.
 * @param {number} duration - The selected duration in minutes.
 * @param {function} createUrl - Context function to create the URL.
 * @param {function} setSuccessMessage - Function to set the success message.
 * @param {function} setShowMessage - Function to toggle message visibility.
 * @param {function} setOriginalUrl - Function to reset the URL input.
 * @param {object} inputRef - Reference to the input element for focus.
 */
export const addUrlHandler = async (
  url,
  duration,
  createUrl,
  setSuccessMessage,
  setShowMessage,
  setOriginalUrl,
  inputRef
) => {
  if (!validateInput(url, duration)) return;

  await createUrl(url, duration);
  console.log(`URL added: ${url} for ${duration} minutes`);

  // Display success message and reset fields
  setSuccessMessage("URL shortened successfully!");
  setShowMessage(true);
  setOriginalUrl("");
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
