import React from "react";
import ReactDOM from "react-dom";
import { SearchableNestedDropdown } from "./snd/snd.jsx";

import "./styles.css";

const Data = [
  {
    Caption: "Accomodation",
    ID: 1,
    Folder: true
  },
  {
    Caption: "Admin",
    ID: 2,
    Folder: true
  },
  {
    Caption: "item 1",
    ID: 3,
    Folder: false
  }
];

const Data_Accom = [
  {
    Caption: "Flat",
    ID: 4,
    Folder: false
  },
  {
    Caption: "House",
    ID: 5,
    Folder: false
  },
  {
    Caption: "Castle",
    ID: 6,
    Folder: false
  }
];

function App() {
  return (
    <div className="App">
      <h1>Searchable Nested Dropdown</h1>
      
      <ul>
        <li>
          <SearchableNestedDropdown 
            Data={Data} 
            Placeholder="Please enter some data"
            OnPageRequest={handlePageRequest} />
        </li>
        <li>
          <SearchableNestedDropdown 
            Data={Data} 
            Value={{ Item: { Caption: "Value Caption" } }}
            Placeholder="Please enter some data"
            OnPageRequest={handlePageRequest} />
        </li>
      </ul>
    </div>
  );
}

function handlePageRequest(item, callBack) {
  if (item.ID === 1) {
    callBack(Data_Accom);
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
