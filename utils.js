// utils.js

export const addMinutesToCurrentLocaleTime = (minutes) => {
  const currentDate = new Date(); // Get the current date and time in local timezone
  currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the desired minutes
  return currentDate.toLocaleString();
};

export const parseToDateAndTimeNode = (dateTimeString) => {
  try {
    // Split the string into date and time parts using the space as a separator
    const [datePart, timePart] = dateTimeString.split(" ");

    // Extract day, month, year from the date part
    const [day, month, year] = datePart.split(".").map(Number);

    // Extract hours, minutes, seconds from the time part
    const [hours, minutes, seconds] = timePart.split(".").map(Number);

    // Create and return a new Date object
    return {
      day: day,
      month: month,
      year: year,
      hours: hours,
      minutes: minutes,
    };
  } catch (error) {
    console.error(`Error parsing date-time string: ${error.message}`);
    throw error; // Re-throw the error for further handling if necessary
  }
};
function parseDateTimeReact(dateString) {
  // Create a new Date object using the date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    throw new Error("Invalid date format");
  }

  // Return the parsed values as an object
  return {
    day: date.getDate(),
    month: date.getMonth() + 1, // getMonth() returns 0 for January, so add 1
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
}

export const startTimer = (expirationTime, shortId) => {
  // Parse the expiration time
  const parsedExpirationTime = parseToDateAndTimeNode(expirationTime);

  // Get the current time and parse it
  const parsedCurrentTime = parseDateTimeReact(new Date().toLocaleString());

  console.log("-----");
  console.log(shortId);
  console.log("Current time:", parsedCurrentTime);
  console.log("Expiration time:", parsedExpirationTime);
  console.log("-----");

  // Compare parsed times to determine if the current time has reached or passed expiration
  if (
    parsedCurrentTime.year > parsedExpirationTime.year ||
    (parsedCurrentTime.year === parsedExpirationTime.year &&
      parsedCurrentTime.month > parsedExpirationTime.month) ||
    (parsedCurrentTime.year === parsedExpirationTime.year &&
      parsedCurrentTime.month === parsedExpirationTime.month &&
      parsedCurrentTime.day > parsedExpirationTime.day) ||
    (parsedCurrentTime.year === parsedExpirationTime.year &&
      parsedCurrentTime.month === parsedExpirationTime.month &&
      parsedCurrentTime.day === parsedExpirationTime.day &&
      parsedCurrentTime.hours > parsedExpirationTime.hours) ||
    (parsedCurrentTime.year === parsedExpirationTime.year &&
      parsedCurrentTime.month === parsedExpirationTime.month &&
      parsedCurrentTime.day === parsedExpirationTime.day &&
      parsedCurrentTime.hours === parsedExpirationTime.hours &&
      parsedCurrentTime.minutes >= parsedExpirationTime.minutes)
  ) {
    console.log("Expiration time reached");
    console.log(shortId);
    console.log("Current time:", parsedCurrentTime);
    console.log("Expiration time:", parsedExpirationTime);

    return true; // Expired
  }

  console.log("Not yet expired");
  return false; // Not expired
};
