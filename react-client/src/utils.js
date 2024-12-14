/**
 * Adds a specified number of minutes to the current local date and time.
 *
 * @param {number} minutes - The number of minutes to add.
 * @returns {string} - The resulting date and time as a localized string.
 */
export function addMinutesToCurrentLocaleTime(minutes) {
  const currentDate = new Date(); // Get the current date and time in local timezone
  currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the specified minutes
  return currentDate.toLocaleString(); // Return the updated date and time as a localized string
}

/**
 * Determines whether a given date-time string is expired compared to the current date-time.
 *
 * @param {string} dateTimeString - The date-time string to compare.
 * @returns {boolean} - `true` if the input date-time is expired, `false` otherwise.
 * @throws {Error} - Throws an error if the input date string is invalid.
 */
export function isDateExpired(dateTimeString) {
  const currentDate = new Date(); // Get the current date-time
  const inputDate = new Date(dateTimeString); // Parse the input date-time string into a Date object

  // Validate the input date
  if (isNaN(inputDate)) {
    throw new Error("Invalid date-time string format"); // Throw an error for invalid date strings
  }

  // Return true if the input date has expired, otherwise false
  return currentDate >= inputDate;
}

/**
 * Logs a table of URL data to the console, including their expiration status.
 *
 * @param {Object[]} urls - Array of URL objects to log.
 * @param {string} urls[].shortId - The short ID of the URL.
 * @param {string} urls[].expiration - The expiration date-time string of the URL.
 */
export function logTable(urls) {
  // Transform URLs into table rows
  const tableData = urls.map((url) => ({
    shortId: url.shortId,
    expired: isDateExpired(url.expiration), // Check if each URL is expired
    expiration: url.expiration,
  }));

  // Log the table headers
  console.log("shortId | expired | expiration");
  console.log("--------------------------------");

  // Log each row in the table
  tableData.forEach(({ shortId, expired, expiration }) => {
    console.log(`${shortId}   | ${expired}   | ${expiration}`);
  });

  console.log("--------------------------------");
}
