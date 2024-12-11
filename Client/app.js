import { fetchUrls } from "./api.js";
import { ListOfShortLinks } from "./components/ListOfShortLinks.js"; // Import the ListOfShortLinks component

// Function to fetch and log the URLs
const updateLinks = async () => {
  try {
    const { success, urls } = await fetchUrls();

    if (success) {
      ListOfShortLinks({ urls, divId: "shortlinks" }); // Pass the divId dynamically
    } else {
      console.error("Failed to fetch URLs.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call the function immediately
updateLinks();

// Set the function to run every 5 seconds
setInterval(updateLinks, 5000);
