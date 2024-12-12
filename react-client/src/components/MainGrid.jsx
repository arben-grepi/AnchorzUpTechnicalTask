import { Flex, Box, Stack } from "@chakra-ui/react";

export const Main = () => {
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
