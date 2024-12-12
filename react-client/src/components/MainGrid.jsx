import { Flex, Box, Stack } from "@chakra-ui/react";
// import { useState } from "react";

// import { AddUrlButton } from "./SubComponents/AddUrlButton";
// import { InputUrl } from "./SubComponents/InputUrl";

const Main = () => {
  return (
    <>
      <Stack>
        <h1>Main</h1>
        <Flex className="MainGrid-Flex">
          <Box>
            <p>TextBox</p>
          </Box>
          <Box>
            <p>alasvetolaatikko</p>
          </Box>
        </Flex>
        <Box paddingTop={"2rem"} id="AddUrlButton">
          Nappi
        </Box>
      </Stack>
    </>
  );
};

export default Main;
