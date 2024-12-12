/* eslint-disable react/prop-types */
import { Flex, Box } from "@chakra-ui/react";

const YourComponent = ({ items }) => {
  return (
    <Flex direction="column" gap="1.5rem" width={"100%"}>
      {items.map((item) => (
        <Flex key={item.id} justify="space-between" align="center">
          <Box>
            <a
              className="shortlink-text"
              href={item.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              www.shortid.com/{item.shortId}
            </a>
          </Box>
          <Box>
            <span role="img" aria-label="Delete">
              🗑️
            </span>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default YourComponent;
