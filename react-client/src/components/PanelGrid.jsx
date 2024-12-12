// Panel.jsx
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";
import Logo from "./SubComponents/Logo";
import LinkList from "./SubComponents/LinkList";
import { Stack } from "@chakra-ui/react";

const Panel = () => {
  const { urls, getUrls, deleteUrl } = useContext(GlobalContext);
  const [selectedQRCode, setSelectedQRCode] = useState(null);

  useEffect(() => {
    console.log("IN USE_EFFECT");
    getUrls();
    const intervalId = setInterval(() => {
      console.log("Updating URLs...");
      getUrls();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

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

export default Panel;
