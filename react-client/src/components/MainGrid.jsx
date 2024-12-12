import { Flex, Box, Stack } from "@chakra-ui/react";
import { useState } from "react";

import InputUrl from "./SubComponents/InputUrl";
import DropDownMenu from "./SubComponents/DropDownMenu";
import AddUrlButton from "./SubComponents/AddUrlButton";

const Main = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSelect = (selectedMinutes) => {
    console.log("Selected time in minutes:", selectedMinutes);
    setSelectedTime(selectedMinutes);
  };

  return (
    <>
      <Stack width={"100%"}>
        <h1 className="MainHeading">Main</h1>
        <Stack className="MainGrid-Stack" width={"100%"}>
          <div></div>
          <Flex className="MainGrid-Flex">
            <Box width={"60%"}>
              <InputUrl placeholder="www.example.com" />
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
            <AddUrlButton />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default Main;
