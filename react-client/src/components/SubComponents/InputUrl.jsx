/* eslint-disable react/prop-types */

import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const InputUrl = forwardRef((props, ref) => {
  const { placeholder, value, onChange, onKeyDown } = props;

  const handleChange = (e) => {
    let newValue = e.target.value;

    // Check if the value is at least 4 chars and doesn't start with the prefix
    if (newValue.length >= 4 && !newValue.startsWith("https://www.")) {
      newValue = "https://www." + newValue;
    }

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
      size="2xl"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
});

export default InputUrl;
