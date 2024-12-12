/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, Box } from "react";
import Logo from "./SubComponents/Logo";

import LinkList from "./LinkList";
import { Flex, Stack } from "@chakra-ui/react";

const Panel = () => {
  const { urls, getUrls, deleteUrl } = useContext(GlobalContext);

  useEffect(() => {
    console.log("IN USE_EFFECT");
    getUrls();
    const intervalId = setInterval(() => {
      console.log("Updating URLs...");
      getUrls();
    }, 60000); // every minute

    return () => clearInterval(intervalId); // Poistetaan edellinen ajastin ennen uuden luomista, kun komponentti poistetaan käytöstä tai efekti päivittyy.
  }, []);

  const handleDelete = (shortId) => {
    deleteUrl(shortId);
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <Stack
        spacing="1rem" // Controls spacing between child elements
        align="center" // Centers items horizontally
        justify="center" // Centers items vertically
      >
        <Logo />
        <h2>Panel</h2>
        <LinkList items={urls} onDelete={handleDelete} />
      </Stack>
    </div>
  );
};

export default Panel;
