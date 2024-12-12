import "./index.css";
import { VStack } from "@chakra-ui/react";
import { GlobalProvider } from "./context/GlobalState";
import Panel from "./components/Panel";

function App() {
  return (
    <>
      <GlobalProvider>
        <div className="grid-container">
          <div className="grid panel-grid">
            <VStack className="VStack-panel">
              <Panel />
            </VStack>
          </div>
          <div className="grid main-grid">
            <VStack className="VStack-main">
              <h1>Header</h1>
              <h2>Main</h2>
              <h2>Main</h2>
            </VStack>
          </div>
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
