// utils.js

/**
 * Ensures the "https://www." prefix is added to a given URL if it is missing.
 *
 * @param {string} value - The input value to check and modify.
 * @param {string} [prefix="https://www."] - The prefix to add if missing. Default is "https://www.".
 * @returns {string} - The modified value with the correct prefix.
 */
export const ensureUrlPrefix = (value, prefix = "https://www.") => {
  if (value.length >= 4 && !value.startsWith(prefix)) {
    return prefix + value;
  }
  return value;
};
