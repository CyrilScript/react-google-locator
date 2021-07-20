import "./App.css";
import AutoCompleteLocate from "./locate/AutoCompleteLocate";
import DirectLocation from "./locate/DirectLocation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br />
        <p>AutoComplete Location Component</p>
        <br />
        <div className="autocomplete_wrapper">
          <AutoCompleteLocate />
        </div>
        <br /> <br />
        <div style={{ borderTop: "1px solid white" }}>
          <p>Direct Location Component</p>

          <DirectLocation />
        </div>
      </header>
    </div>
  );
}

export default App;
