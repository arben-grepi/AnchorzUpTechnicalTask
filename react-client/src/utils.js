export function addMinutesToCurrentLocaleTime(minutes) {
  const currentDate = new Date(); // Get the current date and time in local timezone
  currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the desired minutes
  return currentDate.toLocaleString();
}

// Function to compare a given date-time string with the current date-time
export function isInputDateTimeInThePast(dateTimeString) {
  // Get the current date-time
  const currentDate = new Date();

  // Parse the input date string into a Date object
  const inputDate = new Date(dateTimeString);
  console.log("inputDate", inputDate);
  console.log("currentDate", currentDate);

  // Check if the input date is valid
  if (isNaN(inputDate)) {
    throw new Error("Invalid date-time string format");
  }

  // Compare the two dates
  if (currentDate >= inputDate) {
    return true; // The current date is equal to or has surpassed the input date
  } else {
    return false; // The current date is before the input date
  }
}

// Example usage
try {
  const input = "12/12/2024, 1:54:01 PM";
  const result = isInputDateTimeInThePast(input);
  console.log(`The date-time is: ${result}`);
} catch (error) {
  console.error(error.message);
}
