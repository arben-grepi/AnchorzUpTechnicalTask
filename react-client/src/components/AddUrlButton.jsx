/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

const AddUrlButton = ({ onClick }) => {
  return (
    <Button className="add-url-button" size="1xl" onClick={onClick}>
      <p>Shorten URL</p>
    </Button>
  );
};

export default AddUrlButton;
