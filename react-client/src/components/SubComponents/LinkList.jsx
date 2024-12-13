// LinkList.jsx
/* eslint-disable react/prop-types */
import { Flex, Box } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

const LinkList = ({ items, onDelete, onLinkClick }) => {
  const handleDelete = (shortId) => {
    onDelete(shortId);
  };

  const handleLinkClickInternal = (qrCode) => {
    // Kutsutaan parentin onLinkClick-funktiota, annetaan qrCode
    if (onLinkClick) {
      onLinkClick(qrCode);
    }
  };

  return (
    <Flex direction="column" gap="1rem" width={"100%"}>
      {items.map((item) => (
        <Flex key={item.shortId} justify="space-between" align="center">
          <Box paddingLeft={"30px"}>
            <Tooltip size="xl" content={item.originalUrl}>
              <a
                className="shortlink-text"
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClickInternal(item.qrCode)}
              >
                www.shortUrl.com/{item.shortId}
              </a>
            </Tooltip>
          </Box>
          <Box>
            <span
              role="img"
              aria-label="Delete"
              onClick={() => handleDelete(item.shortId)}
              style={{ cursor: "pointer", paddingRight: "30px" }}
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
