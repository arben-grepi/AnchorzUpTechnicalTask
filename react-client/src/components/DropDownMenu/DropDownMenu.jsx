/* eslint-disable react/prop-types */
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

import { formatMinutes, handleSelectTime } from "./utils"; // Import utilities

const DropDownMenu = ({
  placeholder,
  times,
  onSelectTime,
  size = "md",
  width = "auto",
}) => {
  const [placeholderValue, setPlaceholderValue] = useState(
    placeholder || "set a duration"
  );

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size={size} width={width}>
          {placeholderValue}
        </Button>
      </MenuTrigger>
      <MenuContent>
        {times.map((timeInMinutes, index) => (
          <MenuItem
            key={index}
            value={timeInMinutes}
            onClick={() =>
              handleSelectTime(timeInMinutes, setPlaceholderValue, onSelectTime)
            }
          >
            <Button
              className="menu-item-button"
              variant="outline"
              size={size}
              width={width}
            >
              {formatMinutes(timeInMinutes)}
            </Button>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default DropDownMenu;
