// utils.js

/**
 * Handles the deletion of a link.
 *
 * @param {string} shortId - The unique identifier of the link to delete.
 * @param {Function} onDelete - Parent-provided callback to delete the link.
 */
export const handleDeleteLink = (shortId, onDelete) => {
  if (typeof onDelete === "function") {
    onDelete(shortId);
  }
};

/**
 * Handles the logic for clicking a link.
 *
 * @param {string} shortId - The unique identifier of the clicked link.
 * @param {Function} incrementClickCount - Function to update the global click count.
 * @param {Function} setClickedItems - State updater to track clicked items.
 * @param {Function} onLinkClick - Optional parent-provided callback for handling the link click.
 * @param {string} qrCode - QR code associated with the link.
 */
export const handleLinkClick = (
  shortId,
  incrementClickCount,
  setClickedItems,
  onLinkClick,
  qrCode
) => {
  incrementClickCount(shortId);
  setClickedItems((prev) => ({
    ...prev,
    [shortId]: true,
  }));

  if (typeof onLinkClick === "function") {
    onLinkClick(qrCode);
  }
};
