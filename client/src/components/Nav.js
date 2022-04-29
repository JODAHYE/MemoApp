import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setCategory } from "../modules/category";
import { setCurrentMenu } from "../modules/menu";
import { setColor, setSkip } from "../modules/post";
import { logout } from "../modules/user";
import { customColor } from "../style/theme";

const Nav = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const onMenuClick = useCallback((e) => {
    if (e.target.innerText === "My memos") {
      dispatch(setCategory());
      dispatch(setSkip(0));
      dispatch(setColor(""));
    }
    dispatch(setCurrentMenu(e.target.innerText));
  }, []);
  return (
    <Wrap>
      <Button onClick={onMenuClick}>Write</Button>
      <Button onClick={onMenuClick}>My memos</Button>
      <Button onClick={onLogout}>Logout</Button>
    </Wrap>
  );
};

export default Nav;
const Wrap = styled.div`
  width: 100%;
  padding: 20px;
  border-bottom: 3px solid #fff;
  margin: 0 auto;
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 10px 0;
    background: #f0f0f0;
    border-bottom: 2px solid #fff;
  }
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  background: ${customColor.button};
  &:active {
    background: ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
    padding: 6px;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;
