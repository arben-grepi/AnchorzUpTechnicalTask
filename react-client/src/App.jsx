import "./index.css";
import { GlobalProvider } from "./context/GlobalState";
import Panel from "./components/Panel";

function App() {
  return (
    <>
      <GlobalProvider>
        <div className="grid-container">
          <div className="grid panel-grid">
            <Panel id="panel" />
          </div>
          <div className="grid main-grid"></div>
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
