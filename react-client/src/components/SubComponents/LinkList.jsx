// LinkList.jsx
/* eslint-disable react/prop-types */
import { Flex, Box } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const LinkList = ({ items, onDelete, onLinkClick }) => {
  const { incrementClickCount } = useContext(GlobalContext);

  const handleDelete = (shortId) => {
    onDelete(shortId);
  };

  const handleLinkClickInternal = (qrCode, shortId, clickCount) => {
    // First increment the click count in the global state (server-side as well)
    incrementClickCount(shortId);

    // Then show the click count on the browsers console.
    console.log(
      `URL www.shortUrl.com/${shortId} clicked ${clickCount + 1} times`
    );

    // If parent component passed an onLinkClick, call it with the QR code
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
                onClick={() =>
                  handleLinkClickInternal(
                    item.qrCode,
                    item.shortId,
                    item.clickCount
                  )
                }
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
