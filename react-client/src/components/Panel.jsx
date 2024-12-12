/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect } from "react";

import LinkList from "./LinkList";

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
    <div>
      <h2>Panel</h2>
      <LinkList items={urls} onDelete={handleDelete} />
    </div>
  );
};

export default Panel;
