/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@chakra-ui/react"; // Import Chakra UI Stack for layout
import chalk from "chalk"; // Import chalk for colorful console logs
import { useContext, useEffect, useState } from "react"; // Import React hooks

import { GlobalContext } from "../../context/GlobalState"; // Import global state context
import Logo from "./Logo"; // Import Logo component
import LinkList from "../LinkList/LinkList"; // Import LinkList component
import { isDateExpired, logTable } from "./utils"; // Utility functions for date checks and logging

/**
 * PanelGrid component
 * Displays a list of shortened URLs, their associated QR codes, and manages expired URL deletion.
 */
const PanelGrid = () => {
  const { urls, getUrls, deleteUrl } = useContext(GlobalContext); // Access global state and actions
  const [selectedQRCode, setSelectedQRCode] = useState(null); // Tracks the selected QR code for display

  // Fetch URLs when the component mounts and at regular intervals (every 10 seconds)
  useEffect(() => {
    getUrls(); // Initial fetch of URLs
    const intervalId = setInterval(() => {
      getUrls(); // Periodic fetch of URLs
    }, 10000);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  // Check for expired URLs whenever the list of URLs updates
  useEffect(() => {
    DeleteExpiredURLs();
  }, [urls]);

  /**
   * Deletes all expired URLs from the list.
   * Logs details of expired URLs and their deletion process.
   */
  function DeleteExpiredURLs() {
    console.log("Checking all URLs for expiration...");
    if (urls.length === 0) return; // No URLs to check

    logTable(urls); // Log the current list of URLs in table format

    urls.forEach((url) => {
      if (isDateExpired(url.expiration)) {
        handleDelete(url.shortId); // Delete the expired URL
        console.log(chalk.red("URL expired:"), chalk.yellow(url.shortId));
        console.log(
          chalk.green(
            `DELETED URL with id ${url.shortId}. Long URL: ${url.originalUrl}`
          )
        );
      }
    });
  }

  /**
   * Handles the deletion of a URL.
   * Clears the selected QR code if it corresponds to the deleted URL.
   *
   * @param {string} shortId - The unique identifier of the URL to delete.
   */
  const handleDelete = (shortId) => {
    const urlToDelete = urls.find((url) => url.shortId === shortId);

    // Clear the QR code display if it corresponds to the URL being deleted
    if (urlToDelete && selectedQRCode === urlToDelete.qrCode) {
      setSelectedQRCode(null);
    }

    deleteUrl(shortId); // Proceed with the deletion via global state action
  };

  /**
   * Handles the selection of a QR code for display.
   *
   * @param {string} qrCode - The Base64-encoded QR code of the selected link.
   */
  const handleLinkClick = (qrCode) => {
    setSelectedQRCode(qrCode); // Set the selected QR code for display
  };

  return (
    <Stack
      className={`panel-stack ${
        urls.length === 0 ? "panel-stack-empty-urls" : ""
      }`}
    >
      <Logo id="AnchorzUpLogo" /> {/* Display the logo */}
      {urls.length > 0 && <h2>My shortened URLs</h2>}
      {/* Display the selected QR code if one is set */}
      {selectedQRCode && (
        <img
          src={selectedQRCode}
          alt="QR code for selected link"
          style={{
            width: "200px",
            height: "200px",
            marginBottom: "30px",
            marginTop: "10px",
          }}
        />
      )}
      {/* Render the list of URLs with actions for deletion and QR code selection */}
      <LinkList
        items={urls} // Pass the list of URLs to display
        onDelete={handleDelete} // Provide the deletion handler
        onLinkClick={handleLinkClick} // Handle QR code selection
      />
    </Stack>
  );
};

export default PanelGrid; // Export the PanelGrid component
