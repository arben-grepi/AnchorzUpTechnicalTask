const fetchUrls = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/urls");

    // Check if response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response

    // Deconstruct the response data
    const { success, count, data: urls } = data;

    // Return the deconstructed values
    return { success, count, urls };
  } catch (error) {
    // Log error details and return default values
    console.error("Error fetching URLs:", error.message);
    return { success: false, count: 0, urls: [] }; // Return empty values in case of error
  }
};

export { fetchUrls };
