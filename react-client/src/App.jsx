import "./index.css";
import { VStack } from "@chakra-ui/react";

function App() {
  return (
    <>
      <div className="grid-container">
        <div className="grid panel-grid">
          <VStack class="VStack-panel">
            <h2>Panel</h2>
            <div id="shortlinks"></div>
          </VStack>
        </div>
        <div className="grid main-grid">
          <VStack class="VStack-main">
            <h1>Header</h1>
            <h2>Main</h2>
            <h2>Main</h2>
          </VStack>
        </div>
      </div>
    </>
  );
}

export default App;
