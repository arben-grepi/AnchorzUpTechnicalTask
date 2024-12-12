import { Flex, Box, Stack } from "@chakra-ui/react";
import { useState, useContext, useEffect, useRef } from "react";

import InputUrl from "./SubComponents/InputUrl";
import DropDownMenu from "./SubComponents/DropDownMenu";
import AddUrlButton from "./SubComponents/AddUrlButton";
import { GlobalContext } from "../context/GlobalState";

const Main = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { error, loading, createUrl } = useContext(GlobalContext);

  // Create a ref to access the input element
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTimeSelect = (selectedMinutes) => {
    console.log("Selected time in minutes:", selectedMinutes);
    setSelectedTime(selectedMinutes);
  };

  const handleAddUrl = async () => {
    console.log("clicked");
    console.log(originalUrl);
    if (!originalUrl) {
      alert("Please enter a URL before adding");
      return;
    }
    if (!selectedTime) {
      alert("Please select a duration");
      return;
    }

    console.log("Adding URL:", originalUrl);
    console.log("Selected time in minutes:", selectedTime);
    await createUrl(originalUrl, selectedTime);

    if (!error) {
      setSuccessMessage("URL shortened successfully!");
      setShowMessage(true);

      // Clear input fields
      setOriginalUrl("");
      setSelectedTime(selectedTime);
    }
  };

  // Hide success or error messages after 5 seconds
  useEffect(() => {
    let timer;
    if (showMessage || error) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showMessage, error]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddUrl();
    }
  };

  return (
    <>
      <Stack width={"100%"}>
        <h1 className="MainHeading">URL Shortener</h1>
        {loading && <p className="primary-text">Loading...</p>}
        {showMessage && successMessage && (
          <p style={{ color: "green" }}>{successMessage}</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Stack className="MainGrid-Stack" width={"100%"}>
          <div></div>
          <Flex className="MainGrid-Flex">
            <Box width={"60%"}>
              <InputUrl
                ref={inputRef}
                placeholder="www.example.com"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>
            <Box>
              <DropDownMenu
                placeholder="Select Duration"
                times={[2, 5, 30, 120, 1500, 45000]}
                onSelectTime={handleTimeSelect}
              />
            </Box>
          </Flex>
          <Box paddingTop={"2rem"} id="AddUrlButton">
            <AddUrlButton onClick={handleAddUrl} />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Main;
