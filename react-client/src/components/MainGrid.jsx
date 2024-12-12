import { Flex, Box, Stack } from "@chakra-ui/react";
// import { useState } from "react";

import InputUrl from "./SubComponents/InputUrl";
import DropDownMenu from "./SubComponents/DropDownMenu";
import AddUrlButton from "./SubComponents/AddUrlButton";

const Main = () => {
  return (
    <>
      <Stack width={"100%"}>
        <h1 className="MainHeading">Main</h1>
        <Stack className="MainGrid-Stack" width={"100%"}>
          <div></div>
          <Flex className="MainGrid-Flex">
            <Box width={"60%"}>
              <InputUrl />
            </Box>
            <Box>
              <DropDownMenu />
            </Box>
          </Flex>
          <Box paddingTop={"2rem"} id="AddUrlButton">
            <AddUrlButton />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Main;
