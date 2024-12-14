/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { Input } from "@chakra-ui/react"; // Import Chakra UI's Input component
import { forwardRef } from "react"; // Import React's forwardRef for forwarding refs

/**
 * Custom URL input component that automatically prefixes "https://www." to the input value if missing.
 *
 * @param {Object} props - The component props.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - Callback invoked when the input value changes.
 * @param {Function} props.onKeyDown - Callback invoked when a key is pressed while the input is focused.
 * @param {React.Ref} ref - Forwarded ref for the input element.
 * @returns {JSX.Element} - The rendered input component.
 */
const InputUrl = forwardRef((props, ref) => {
  const { placeholder, value, onChange, onKeyDown } = props;

  /**
   * Handles changes to the input field, ensuring the "https://www." prefix is added if necessary.
   *
   * @param {Object} e - The change event triggered by the input field.
   */
  const handleChange = (e) => {
    const inputType = e.nativeEvent.inputType;

    // Allow deletions (backspace or delete) without modifying the value
    if (inputType.startsWith("delete")) {
      onChange(e);
      return;
    }

    let newValue = e.target.value;

    // Automatically add "https://www." prefix if missing
    if (newValue.length >= 4 && !newValue.startsWith("https://www.")) {
      newValue = "https://www." + newValue;
    }

    // Pass the modified value back to the parent component
    onChange({
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    });
  };

  return (
    <Input
      ref={ref} // Forwarded ref for direct manipulation of the input element
      size="2xl" // Custom input size
      placeholder={placeholder} // Placeholder text for the input
      value={value} // Current input value
      onChange={handleChange} // Custom change handler to enforce prefix rules
      onKeyDown={onKeyDown} // Passes key press events to parent if provided
    />
  );
});

export default InputUrl; // Export the custom input component
