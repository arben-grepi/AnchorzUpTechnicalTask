/* eslint-disable react/prop-types */

import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const InputUrl = forwardRef((props, ref) => {
  const { placeholder, value, onChange, onKeyDown } = props;

  const handleChange = (e) => {
    const inputType = e.nativeEvent.inputType;

    // If the user is deleting text (backspace or delete), don't add the prefix
    if (inputType.startsWith("delete")) {
      onChange(e);
      return;
    }

    let newValue = e.target.value;
    if (newValue.length >= 4 && !newValue.startsWith("https://www.")) {
      newValue = "https://www." + newValue;
    }

    // Pass the modified value back up
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
