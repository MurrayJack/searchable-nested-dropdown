import * as React from "react";
import * as snd from "./snd.styles.jsx";
import { useState, useEffect } from "react";
import { HotKeys } from 'react-hotkeys';

import {
  MdSearch,
  MdFolder,
  MdKeyboardArrowRight,
  MdCropSquare,
  MdHighlightOff
} from "react-icons/md";

/*
IItem: {
  Caption: string,
  ID: number,
  Folder: boolean
}

IValue: {
  Item: IItem, 
  Parent: IItem,
}


*/

export const SearchableNestedDropdown = ({
  Value /*: IValue */,
  Data /*: IItem[] */,
  Placeholder /* string */,
  OnPageRequest /*: (item: IItem) => Promise<IItem[]>  */,
  OnChange /*: (item: IItem) => void */
}) => {
  const [value, setValue] = useState(Value);
  const [state, setControlState] = useState("Close");
  const [currentFolder, setCurrentFolderData] = useState(Data);
  const [mode, setMode] = useState("Value");

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
    console.log("handleCloseControl");
    setControlState("Close");
  };

  const handleOnOpenClick = () => {
    setControlState("Open");
  };

  const handleOnValueClear = (e) => {
    e.stopPropagation();
    OnChange(undefined);
    setValue(undefined);
  }

  return (
    <snd.Wrapper>
      <Header
        Mode={mode}
        Value={value}
        Placeholder={Placeholder}
        OnCloseClick={handleCloseControl}
        OnOpenClick={handleOnOpenClick}
        OnValueClear={handleOnValueClear} />

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

const Header = ({ Mode, Value, Placeholder, OnValueClear, OnCloseClick, OnOpenClick }) => {
  const handlers = {
    'esc': OnCloseClick,
    'down': OnOpenClick
  }

  const keyMap = {
    open: 'down',
    close: 'esc'
  }

  return (
    <HotKeys onKeyPress={()=> console.log("here")} keyMap={keyMap} handlers={handlers} onClick={OnOpenClick} tabIndex={0}>
      <snd.Header >
        {Mode === "Value" ? (
          <HeaderCaption
            Placeholder={Placeholder}
            Value={Value}
            OnValueClear={OnValueClear}
          />
        ) : null}
      </snd.Header>
    </HotKeys>
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

const HeaderCaption = ({ Placeholder, Value, OnValueClear }) => {
  return Value && Value.Item ? (
    <React.Fragment>
      <snd.Caption>{Value.Item.Caption}</snd.Caption>
      <snd.IconWrapper>
        <button onClick={OnValueClear} title="Remove Value">
          <MdHighlightOff />
        </button>
      </snd.IconWrapper>
    </React.Fragment>
  ) : (
      <snd.Placeholder>{Placeholder}</snd.Placeholder>
    );
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
