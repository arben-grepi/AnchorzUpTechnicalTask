import "./index.css"; // Import global styles
import { GlobalProvider } from "./context/GlobalState"; // Import the global context provider
import Panel from "./components/PanelGrid"; // Panel component for managing URLs
import Main from "./components/MainGrid"; // Main component for creating and interacting with URLs

/**
 * Root component of the application.
 * Wraps the application with the global context provider and lays out the main grid structure.
 *
 * @returns {JSX.Element} - The rendered application.
 */
function App() {
  return (
    <>
      {/* Wrap the application with the global state provider */}
      <GlobalProvider>
        <div className="grid-container">
          {/* Panel section for displaying and managing existing URLs */}
          <div className="panel-grid">
            <Panel />
          </div>

          {/* Main section for creating new shortened URLs */}
          <div className="main-grid">
            <Main />
          </div>
        </div>
      </GlobalProvider>
    </>
  );
}

export default App; // Export the root component
