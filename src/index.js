import React from "react";
import ReactDOM from "react-dom";
import { SearchableNestedDropdown } from "./snd/snd.jsx";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Searchable Nested Dropdown</h1>
      <SearchableNestedDropdown />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
