import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    colors: {
      primary: "#92278f",
      linkText: "#179be5",
      lightGrayText: "#878686",
      heading: "#000000",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
