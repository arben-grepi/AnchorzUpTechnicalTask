/* eslint-disable react/prop-types */
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

function formatMinutes(minutes) {
  const oneHour = 60;
  const oneDay = 1440; // 24 * 60
  const oneMonth = 43200; // ~30 days * 24 * 60 (approximation)

  if (minutes < oneHour) {
    return `${minutes} min`;
  } else if (minutes < oneDay) {
    const hours = Math.floor(minutes / oneHour);
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes < oneMonth) {
    const days = Math.floor(minutes / oneDay);
    return `${days} day${days > 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(minutes / oneMonth);
    return `${months} month${months > 1 ? "s" : ""}`;
  }
}

const DropDownMenu = ({ placeholder, times, onSelectTime }) => {
  const [placeholderValue, setPlaceHolderValue] = useState(
    placeholder || "set a duration"
  );

  const handleSelect = (timeInMinutes) => {
    // Update the placeholder text first
    setPlaceHolderValue(formatMinutes(timeInMinutes));

    // If a callback is provided, call it with the raw minutes value
    if (typeof onSelectTime === "function") {
      onSelectTime(timeInMinutes);
    }
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="2xl">
          {placeholderValue}
        </Button>
      </MenuTrigger>
      <MenuContent size="xl">
        {times.map((timeInMinutes, index) => (
          <MenuItem
            key={index}
            value={timeInMinutes}
            onClick={() => handleSelect(timeInMinutes)}
          >
            <Button className="menu-item-button" variant="outline" size="lg">
              {formatMinutes(timeInMinutes)}
            </Button>
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default DropDownMenu;
