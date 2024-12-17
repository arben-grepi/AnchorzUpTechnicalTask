/* eslint-disable react/prop-types */

import { Flex, Box } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { handleDeleteLink, handleLinkClick } from "./utils"; // Import utilities

const LinkList = ({ items, onDelete, onLinkClick }) => {
  const { incrementClickCount } = useContext(GlobalContext);
  const [clickedItems, setClickedItems] = useState({});

  return (
    <div>
      {items.map((item) => (
        <div className="last-child-padding" key={item.shortId}>
          <Flex justify="space-between" gap="10px">
            <Tooltip
              alignItems="center"
              content={item.originalUrl}
              contentProps={{
                style: { fontSize: "1.5rem", padding: "1rem" },
              }}
            >
              <a
                className="shortlink-text"
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleLinkClick(
                    item.shortId,
                    incrementClickCount,
                    setClickedItems,
                    onLinkClick,
                    item.qrCode
                  )
                }
              >
                https://short.link/{item.shortId}
              </a>
            </Tooltip>

            <Box
              role="img"
              aria-label="Delete"
              onClick={() => handleDeleteLink(item.shortId, onDelete)}
              style={{ cursor: "pointer" }}
              alignContent={"center"}
            >
              🗑️
            </Box>
          </Flex>

          {clickedItems[item.shortId] && (
            <p className="click-count-text">
              This link has been clicked {item.clickCount} times!
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default LinkList;
