import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  color: #1c3646;
  font-size: 14px;
`;

export const Header = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  display: flex;
  height: 40px;
  align-items: center;
`;

const Dropdown_Animation = keyframes`
  to {
    height: 300px;
  }
`;

export const Dropdown = styled.ul`
  border-radius: 3px;
  height: 0;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid #ddd;
  box-shadow: 0 0 4px #ddd;
  animation: ${Dropdown_Animation} 0.25s linear forwards;
  overflow: hidden;

  // open
  border-radius: 0px 0px 3px 3px;
  border-top: 0;
`;

export const Folder = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  user-select: none;
  transition: all ease-in-out 0.25s;
  cursor: pointer;

  &:hover {
    background-color: #dce5eb;
  }
`;

export const IconWrapper = styled.span`
  display: inline-block;
  flex: 0 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Caption = styled.span`
  flex: 1;
  margin-left: 5px;
`;
Caption.displayName = "HeaderCaptionValue";

export const Placeholder = styled.span`
  flex: 1;
  margin-left: 5px;
  color: #999;
`;
Placeholder.displayName = "HeaderPlaceholderValue";

export const Item = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #dce5eb;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: 0;
  font-size: 14px;
`;
