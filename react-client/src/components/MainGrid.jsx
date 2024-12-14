import { Flex, Box, Stack } from "@chakra-ui/react"; // Import Chakra UI layout components
import { useState, useContext, useEffect, useRef } from "react"; // Import React hooks

import InputUrl from "./SubComponents/InputUrl"; // Input component for entering the URL
import DropDownMenu from "./SubComponents/DropDownMenu"; // Dropdown for selecting duration
import AddUrlButton from "./SubComponents/AddUrlButton"; // Button to add the URL
import { GlobalContext } from "../context/GlobalState"; // Context for global state management

/**
 * Main component for the URL shortener application.
 * Handles URL input, duration selection, and URL creation.
 */
const Main = () => {
  // State to manage selected duration, input URL, and success message
  const [selectedTime, setSelectedTime] = useState(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Destructure global context for error handling, loading state, and URL creation
  const { error, loading, createUrl } = useContext(GlobalContext);

  // Reference for the input element to manage focus
  const inputRef = useRef(null);

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * Handles selection of duration from the dropdown menu.
   *
   * @param {number} selectedMinutes - The selected duration in minutes.
   */
  const handleTimeSelect = (selectedMinutes) => {
    setSelectedTime(selectedMinutes);
  };

  /**
   * Handles the addition of a new URL.
   * Validates the input and duration, creates the URL, and manages UI feedback.
   */
  const handleAddUrl = async () => {
    if (!originalUrl) {
      alert("Please enter a URL before adding");
      return;
    }
    if (!selectedTime) {
      alert("Please select a duration");
      return;
    }

    // Create the URL using the global context function
    await createUrl(originalUrl, selectedTime);
    console.log(`URL added: ${originalUrl} for ${selectedTime} minutes`);

    if (!error) {
      // Display success message and reset input fields
      setSuccessMessage("URL shortened successfully!");
      setShowMessage(true);
      setOriginalUrl(""); // Clear the input field
      setSelectedTime(null); // Reset the duration selection

      // Re-focus the input field
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Automatically hide success or error messages after 5 seconds
  useEffect(() => {
    let timer;
    if (showMessage || error) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [showMessage, error]);

  /**
   * Handles keydown events, triggering URL addition on pressing Enter.
   *
   * @param {KeyboardEvent} e - The keydown event object.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddUrl();
    }
  };

  return (
    <>
      <Stack width={"100%"}>
        <h1 className="MainHeading">URL Shortener</h1>
        <Box marginLeft={"60px"}>
          {/* Display loading, success, or error messages */}
          {loading && <p className="primary-text">Loading...</p>}
          {showMessage && successMessage && (
            <p style={{ color: "green" }}>{successMessage}</p>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>

        <Stack className="MainGrid-Stack" width={"100%"}>
          <div></div>
          <Flex className="MainGrid-Flex">
            <Box width={"60%"}>
              <InputUrl
                ref={inputRef} // Attach ref to manage focus
                placeholder="www.example.com" // Placeholder text for input
                value={originalUrl} // Bind input value to state
                onChange={(e) => setOriginalUrl(e.target.value)} // Update state on input change
                onKeyDown={handleKeyDown} // Trigger URL addition on Enter
              />
            </Box>
            <Box>
              <DropDownMenu
                placeholder="Select Duration" // Placeholder for the dropdown
                times={[1, 2, 5, 30, 120, 1500, 45000]} // Predefined duration options in minutes
                onSelectTime={handleTimeSelect} // Handle duration selection
              />
            </Box>
          </Flex>
          <Box paddingTop={"2rem"} id="AddUrlButton">
            <AddUrlButton onClick={handleAddUrl} /> {/* Button to add URL */}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Main; // Export the Main component
