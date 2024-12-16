// LinkList.jsx
/* eslint-disable react/prop-types */

import { Flex, Box } from "@chakra-ui/react"; // Import layout components from Chakra UI
import { Tooltip } from "@/components/ui/tooltip"; // Import custom Tooltip component
import { useContext, useState } from "react"; // Import React hook for context management
import { GlobalContext } from "../context/GlobalState"; // Import the global state context

/**
 * Renders a list of shortened links with associated actions like clicking and deleting.
 *
 * @param {Object[]} items - Array of link objects to display.
 * @param {Function} onDelete - Callback to handle deletion of a link.
 * @param {Function} onLinkClick - Optional callback to handle a link click event.
 * @returns {JSX.Element} - The rendered list of links.
 */
const LinkList = ({ items, onDelete, onLinkClick }) => {
  // Access the global state method to increment click counts
  const { incrementClickCount } = useContext(GlobalContext);

  // State to track clicked items
  const [clickedItems, setClickedItems] = useState({});

  /**
   * Handles the deletion of a link.
   *
   * @param {string} shortId - The unique identifier of the link to delete.
   */
  const handleDelete = (shortId) => {
    onDelete(shortId); // Trigger parent-provided deletion handler
  };

  /**
   * Handles internal logic for when a link is clicked.
   *
   * @param {string} qrCode - The QR code associated with the link.
   * @param {string} shortId - The unique identifier of the clicked link.
   * @param {number} clickCount - The current click count for the link.
   */
  const handleLinkClickInternal = (qrCode, shortId) => {
    // Increment click count in the global state
    incrementClickCount(shortId);
    // Mark the item as clicked
    setClickedItems((prev) => ({
      ...prev,
      [shortId]: true,
    }));

    // Invoke the parent-provided link click handler, if available
    if (onLinkClick) {
      onLinkClick(qrCode);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div className="last-child-padding" key={item.shortId}>
          <Flex justify="space-between" gap="10px">
            <Tooltip
              alignItems="center"
              content={item.originalUrl}
              contentProps={{
                style: { fontSize: "1.5rem", padding: "1rem" }, // Equivalent to 2xl size
              }}
            >
              <a
                className="shortlink-text"
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer" // Security best practice for external links
                onClick={() =>
                  handleLinkClickInternal(
                    item.qrCode,
                    item.shortId,
                    item.clickCount
                  )
                }
              >
                https://short.link/{item.shortId}
              </a>
            </Tooltip>

            {/* Provides a delete action for the link */}
            <Box
              role="img"
              aria-label="Delete"
              onClick={() => handleDelete(item.shortId)}
              style={{ cursor: "pointer" }}
              alignContent={"center"}
            >
              🗑️
            </Box>
          </Flex>

          {/* Show paragraph about click count only if clicked */}
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
