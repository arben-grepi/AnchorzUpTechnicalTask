/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";
import { ensureUrlPrefix } from "./utils"; // Import the utility function

const InputUrl = forwardRef((props, ref) => {
  const {
    placeholder,
    value,
    size = "md",
    width = "300px",
    onChange,
    onKeyDown,
  } = props;

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

    const newValue = ensureUrlPrefix(e.target.value); // Use utility to ensure the prefix

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
      ref={ref}
      size={size}
      width={width}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
});

export default InputUrl;
