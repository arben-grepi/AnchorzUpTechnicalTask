// utils.js

export const addMinutesToCurrentLocaleTime = (minutes) => {
  const currentDate = new Date(); // Get the current date and time in local timezone
  currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the desired minutes
  return currentDate.toLocaleString();
};

export const parseToDateAndTime = (dateTimeString) => {
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

export const startTimer = async (expirationTime) => {
  //parsing the expiration time outside of intervall, because it  is static.
  const parsedExpirationTime = parseToDateAndTime(expirationTime);

  let firstLapFinnished = false;
  setInterval(async () => {
    //Defining new current time and parsing the current time inside the interval
    const parsedCurrentTime = parseToDateAndTime(new Date().toLocaleString());
    console.log(parsedCurrentTime);
    console.log(parsedExpirationTime);
    console.log(firstLapFinnished);
    console.log("-----");

    if (
      JSON.stringify(parsedCurrentTime) ===
        JSON.stringify(parsedExpirationTime) &&
      firstLapFinnished
    ) {
      console.log("YEEEEEEEES");
    }
    firstLapFinnished = true;
  }, 10000); //every 10 seconds
};
