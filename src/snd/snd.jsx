import * as React from "react";
import * as snd from "./snd.styles.jsx";
import { useState, useEffect } from "react";
import {
  MdSearch,
  MdFolder,
  MdKeyboardArrowRight,
  MdCropSquare
} from "react-icons/md";

export const SearchableNestedDropdown = ({ Data, OnPageRequest }) => {
  const [state, setControlState] = useState("Close");
  const [currentFolder, setCurrentFolderData] = useState(Data);
  const [value, setValue] = useState(null);
  const [mode, setMode] = useState("Value");
  const [location, setLocation] = useState({
    Parent: undefined,
    Location: undefined
  });

  const handleFolderClick = Item => {
    OnPageRequest(Item, newData => {
      setCurrentFolderData(newData);
      setMode("Folder");
    });
  };

  const handleItemClick = item => {
    setControlState("Close");
    setValue(item);
    setMode("Value");
  };

  const handleCloseControl = () => {
    if (state === "Open") {
      setControlState("Close");
    } else {
      setControlState("Open");
    }
  };

  const handleOnOpenClick = () => {
    setControlState("Open");
  }

  return (
    <snd.Wrapper>
      <Header Mode={mode} Value={value} OnCloseClick={handleCloseControl} OnOpenClick={handleOnOpenClick} />
      {state === "Open" ? (
        <Dropdown
          Data={currentFolder}
          OnItemClick={handleItemClick}
          OnFolderClick={handleFolderClick}
        />
      ) : null}
    </snd.Wrapper>
  );
};

// const header states
/*
- Mode: "Search" | "Value" | "Folder"

- In Search Mode
- In Folder Mode
- In Value Mode
*/

const Header = ({ Mode, Location, Value, OnClearSearch, OnCloseClick, OnOpenClick }) => {
  return (
    <snd.Header tabindex={0} onClick={OnOpenClick}>
      {Mode === "Search" ? <HeaderSearch OnCloseClick={OnCloseClick} /> : null}
      {Mode === "Value" ? (
        <HeaderValue Value={Value} OnCloseClick={OnCloseClick} />
      ) : null}
      {Mode === "Folder" ? <HeaderFolder OnCloseClick={OnCloseClick} /> : null}
    </snd.Header>
  );
};

const HeaderSearch = ({ OnCloseClick }) => {
  return [
    <snd.IconWrapper>
      <MdSearch />
    </snd.IconWrapper>,

    <snd.Input placeholder="search" />,

    <snd.IconWrapper>
      <button onClick={OnCloseClick}>X</button>
    </snd.IconWrapper>
  ];
};

const HeaderValue = ({ Value, OnCloseClick }) => {
  return Value ? [
    <snd.Caption>{Value.Caption}</snd.Caption>,

    <snd.IconWrapper>
      <button onClick={OnCloseClick}>X</button>
    </snd.IconWrapper>
  ] : <div>hello</div>;
};

const HeaderFolder = ({ Location, Parent, OnCloseClick }) => {
  return [
    <snd.IconWrapper>
      <button onClick={OnCloseClick}>&amp;</button>
    </snd.IconWrapper>,

    <snd.Caption>Back</snd.Caption>
  ];
};

const Dropdown = ({ Data, OnFolderClick, OnItemClick }) => (
  <snd.Dropdown>
    {Data
      ? Data.map(item =>
          item.Folder ? (
            <Folder Item={item} OnFolderClick={OnFolderClick} />
          ) : (
            <Item Item={item} OnItemClick={OnItemClick} />
          )
        )
      : null}
  </snd.Dropdown>
);

const Folder = ({ Item, OnFolderClick }) => (
  <snd.Folder onClick={() => OnFolderClick(Item)}>
    <snd.IconWrapper>
      <MdFolder />
    </snd.IconWrapper>
    <snd.Caption>{Item.Caption}</snd.Caption>
    <snd.IconWrapper>
      <MdKeyboardArrowRight />
    </snd.IconWrapper>
  </snd.Folder>
);

const Item = ({ Item, OnItemClick }) => (
  <snd.Item onClick={() => OnItemClick(Item)}>
    <snd.IconWrapper>
      <MdCropSquare />
    </snd.IconWrapper>
    <snd.Caption>{Item.Caption}</snd.Caption>
    <snd.IconWrapper />
  </snd.Item>
);
