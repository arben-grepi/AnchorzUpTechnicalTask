/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect } from "react";
import { startTimer } from "../../../utils";

import LinkList from "./LinkList";

const Panel = () => {
  const { urls, getUrls, deleteUrl } = useContext(GlobalContext);

  useEffect(() => {
    getUrls();
    const interval = setInterval(() => {
      getUrls();
    }, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (shortId) => {
    deleteUrl(shortId); // Call deleteUrl from GlobalContext
  };

  return (
    <div>
      <h2>Panel</h2>
      <LinkList items={urls} onDelete={handleDelete} />
    </div>
  );
};

export default Panel;
