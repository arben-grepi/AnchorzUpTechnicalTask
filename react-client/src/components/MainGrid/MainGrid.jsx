import { Flex, Stack } from "@chakra-ui/react";
import { useState, useContext, useEffect, useRef } from "react";

import InputUrl from "../InputUrl/InputUrl";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import AddUrlButton from "../AddUrlButton";
import { GlobalContext } from "../../context/GlobalState";
import { addUrlHandler } from "./utils"; // Import the handler

const Main = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { error, loading, createUrl } = useContext(GlobalContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    let timer;
    if (showMessage || error) {
      timer = setTimeout(() => setShowMessage(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [showMessage, error]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUrlHandler(
        originalUrl,
        selectedTime,
        createUrl,
        setSuccessMessage,
        setShowMessage,
        setOriginalUrl,
        inputRef
      );
    }
  };

  return (
    <>
      <Stack width={"100%"}>
        <div className="heading-div">
          <h1>URL Shortener</h1>
        </div>
        <div>
          {loading && <p className="primary-text">Loading...</p>}
          {showMessage && successMessage && (
            <p className="success-text">{successMessage}</p>
          )}
        </div>
        <Flex className="main-flex">
          <InputUrl
            size="2xl"
            width="90%"
            ref={inputRef}
            placeholder="https://www.example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <DropDownMenu
            className="dropdown-menu"
            alignItems="center"
            size="2xl"
            width="100px"
            placeholder="Select Duration"
            times={[1, 2, 5, 30, 120, 1500, 45000]}
            onSelectTime={setSelectedTime}
          />
        </Flex>
      </Stack>
      <div className="add-url-button-div">
        <AddUrlButton
          onClick={() =>
            addUrlHandler(
              originalUrl,
              selectedTime,
              createUrl,
              setSuccessMessage,
              setShowMessage,
              setOriginalUrl,
              inputRef
            )
          }
        />
      </div>
    </>
  );
};

export default Main;
