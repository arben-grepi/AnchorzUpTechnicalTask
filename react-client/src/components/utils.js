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
