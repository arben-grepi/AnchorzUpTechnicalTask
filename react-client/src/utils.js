export function addMinutesToCurrentLocaleTime(minutes) {
  const currentDate = new Date(); // Get the current date and time in local timezone
  currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the desired minutes
  return currentDate.toLocaleString();
}

// Function to compare a given date-time string with the current date-time
export function isDateExpired(dateTimeString) {
  // Get the current date-time
  const currentDate = new Date();

  // Parse the input date string into a Date object
  const inputDate = new Date(dateTimeString);

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

export function logTable(urls) {
  // Prepare the table data
  const tableData = urls.map((url) => ({
    shortId: url.shortId,
    expired: isDateExpired(url.expiration),
    expiration: url.expiration,
  }));

  // Log the headers
  console.log("shortId | expired | expiration");
  // Log each row
  tableData.forEach(({ shortId, expired, expiration }) => {
    console.log(`${shortId}   | ${expired}   | ${expiration}`);
  });
  console.log("--------------------------------");
}
