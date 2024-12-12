/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

const AddUrlButton = ({ onClick }) => {
  return (
    <Button className="primary-button" size="1xl" onClick={onClick}>
      <p>Shorten URL</p>
    </Button>
  );
};

export default AddUrlButton;
