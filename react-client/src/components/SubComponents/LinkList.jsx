// LinkList.jsx
/* eslint-disable react/prop-types */

import { Flex, Box } from "@chakra-ui/react"; // Import layout components from Chakra UI
import { Tooltip } from "@/components/ui/tooltip"; // Import custom Tooltip component
import { useContext } from "react"; // Import React hook for context management
import { GlobalContext } from "../../context/GlobalState"; // Import the global state context

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
  const handleLinkClickInternal = (qrCode, shortId, clickCount) => {
    // Increment click count in the global state
    incrementClickCount(shortId);

    // Log the updated click count to the console
    console.log(
      `URL https://short.link/${shortId} clicked ${clickCount + 1} times`
    );

    // Invoke the parent-provided link click handler, if available
    if (onLinkClick) {
      onLinkClick(qrCode);
    }
  };

  return (
    <Flex direction="column" gap="1rem" width={"100%"}>
      {items.map((item) => (
        <Flex key={item.shortId} justify="space-between" align="center">
          {/* Displays the shortened link with a tooltip for the full URL */}
          <Box paddingLeft={"30px"}>
            <Tooltip size="xl" content={item.originalUrl}>
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
          </Box>
          {/* Provides a delete action for the link */}
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
