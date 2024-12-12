import "./index.css";
import { GlobalProvider } from "./context/GlobalState";
import Panel from "./components/PanelGrid";
import { Main } from "./components/MainGrid";

function App() {
  return (
    <>
      <GlobalProvider>
        <div className="grid-container">
          <div className="grid panel-grid">
            <Panel />
          </div>
          <div className="grid main-grid">
            <Main />
          </div>
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
