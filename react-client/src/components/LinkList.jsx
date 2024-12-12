/* eslint-disable react/prop-types */
import { Flex, Box } from "@chakra-ui/react";

const LinkList = ({ items, onDelete }) => {
  const handleDelete = (shortId) => {
    onDelete(shortId); // Call the parent function with the shortId
  };

  return (
    <Flex direction="column" gap="1.5rem" width={"100%"}>
      {items.map((item) => (
        <Flex key={item.shortId} justify="space-between" align="center">
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
            <span
              role="img"
              aria-label="Delete"
              onClick={() => handleDelete(item.shortId)} // Pass shortId to handleDelete
              style={{ cursor: "pointer", paddingLeft: "1.5rem" }} // Add cursor pointer for better UX
            >
              🗑️
            </span>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default LinkList;
