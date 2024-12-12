import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect } from "react";

import LinkList from "./LinkList";

const Panel = () => {
  const { urls, getUrls } = useContext(GlobalContext);

  useEffect(() => {
    getUrls();
    const interval = setInterval(() => {
      getUrls();
    }, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  console.log(urls);

  return (
    <div>
      <h2>Panel</h2>
      <LinkList items={urls} />
    </div>
  );
};

export default Panel;
