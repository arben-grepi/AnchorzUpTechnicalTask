/* eslint-disable react/prop-types */
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"; // Import custom menu components
import { Button } from "@chakra-ui/react"; // Import Chakra UI Button
import { useState } from "react"; // Import React's useState hook

/**
 * Formats a given number of minutes into a more human-readable format (e.g., hours, days, months).
 *
 * @param {number} minutes - The duration in minutes to format.
 * @returns {string} - The formatted duration as a string.
 */
function formatMinutes(minutes) {
  const oneHour = 60;
  const oneDay = 1440; // 24 hours in minutes
  const oneMonth = 43200; // Approximation: 30 days in minutes

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

/**
 * A dropdown menu component for selecting a time duration.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.placeholder="set a duration"] - The initial placeholder text for the menu button.
 * @param {number[]} props.times - An array of time durations (in minutes) for the dropdown options.
 * @param {Function} props.onSelectTime - Callback function invoked with the selected time (in minutes).
 *
 * @returns {JSX.Element} - The rendered dropdown menu component.
 */
const DropDownMenu = ({ placeholder, times, onSelectTime }) => {
  // State to manage the current placeholder value displayed on the menu button
  const [placeholderValue, setPlaceHolderValue] = useState(
    placeholder || "set a duration"
  );

  /**
   * Handles the selection of a dropdown item.
   *
   * @param {number} index - The selected time duration in minutes.
   */
  const handleSelect = (index) => {
    console.log("Selected time in minutes:", index);

    // Update the placeholder text to reflect the selected duration
    setPlaceHolderValue(formatMinutes(index));

    // Invoke the callback with the selected time, if provided
    if (typeof onSelectTime === "function") {
      onSelectTime(index);
    }
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="2xl">
          {placeholderValue} {/* Displays the current placeholder value */}
        </Button>
      </MenuTrigger>
      <MenuContent size="xl">
        {times.map((timeInMinutes, index) => (
          <MenuItem
            key={index}
            value={timeInMinutes}
            onClick={() => handleSelect(timeInMinutes)} // Handle item selection
          >
            {/* Menu item displayed as a button */}
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
