/* eslint-disable react-hooks/exhaustive-deps */
// Panel.jsx
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import Logo from "./SubComponents/Logo";
import LinkList from "./SubComponents/LinkList";
import { isDateExpired } from "../utils";
import { Stack } from "@chakra-ui/react";
import chalk from "chalk";

const PanelGrid = () => {
  const { urls, getUrls, deleteUrl } = useContext(GlobalContext);
  const [selectedQRCode, setSelectedQRCode] = useState(null);

  useEffect(() => {
    getUrls();
    const intervalId = setInterval(() => {
      console.log("Updating URLs...");
      getUrls();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Run DeleteExpiredURLs whenever urls update
    DeleteExpiredURLs();
  }, [urls]);
  function DeleteExpiredURLs() {
    console.log("Checking all URLs for expiration...");
    console.table(
      urls.map((url) => ({
        shortId: url.shortId,
        expired: isDateExpired(url.expiration),
        expiration: url.expiration,
      }))
    );

    urls.forEach((url) => {
      if (isDateExpired(url.expiration)) {
        deleteUrl(url.shortId);
        console.log(chalk.red("URL expired:"), chalk.yellow(url.shortId));
        console.log(
          chalk.green(
            `DELETED URL with id ${url.shortId}. Long URL: ${url.originalUrl}`
          )
        );
      }
    });
  }

  const handleDelete = (shortId) => {
    deleteUrl(shortId);
  };

  // UUSI FUNKTIO: asetetaan valittu QR-koodi
  const handleLinkClick = (qrCode) => {
    setSelectedQRCode(qrCode);
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <Stack spacing="1rem" align="center" justify="center">
        <Logo />
        <h2>My shortened URLs</h2>

        {/* Jos selectedQRCode on asetettu, näytetään kuva */}
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

        <LinkList
          items={urls}
          onDelete={handleDelete}
          onLinkClick={handleLinkClick}
        />
      </Stack>
    </div>
  );
};

export default PanelGrid;
