import React from "react"; // Import React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering React applications

import App from "./App"; // Import the root application component

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"; // Import Chakra UI for styling

// Create a Chakra UI system with the default configuration and a custom theme (if needed)
const system = createSystem(defaultConfig, {
  theme: {}, // Extend or customize the Chakra UI theme here
});

// Render the root React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide Chakra UI styling and configuration to the application */}
    <ChakraProvider value={system}>
      <App /> {/* Render the main application */}
    </ChakraProvider>
  </React.StrictMode>
);
