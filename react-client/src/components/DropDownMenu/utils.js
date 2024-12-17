// utils.js

/**
 * Formats a given number of minutes into a more human-readable format (e.g., hours, days, months).
 *
 * @param {number} minutes - The duration in minutes to format.
 * @returns {string} - The formatted duration as a string.
 */
export const formatMinutes = (minutes) => {
  const oneHour = 60;
  const oneDay = 1440; // 24 hours in minutes
  const oneMonth = 43200; // Approximation: 30 days in minutes

  if (minutes < oneHour) {
    return `${minutes} min`;
  } else if (minutes < oneDay) {
    const hours = Math.floor(minutes / oneHour);
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes < oneMonth) {
    const days = Math.floor(minutes / oneDay);
    return `${days} day${days > 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(minutes / oneMonth);
    return `${months} month${months > 1 ? "s" : ""}`;
  }
};

/**
 * Handles the selection of a dropdown item.
 *
 * @param {number} selectedTime - The selected time duration in minutes.
 * @param {Function} setPlaceholder - Setter for updating the placeholder text.
 * @param {Function} onSelectTime - Callback function to notify parent of the selected time.
 */
export const handleSelectTime = (
  selectedTime,
  setPlaceholder,
  onSelectTime
) => {
  console.log("Selected time in minutes:", selectedTime);

  setPlaceholder(formatMinutes(selectedTime));

  if (typeof onSelectTime === "function") {
    onSelectTime(selectedTime);
  }
};
