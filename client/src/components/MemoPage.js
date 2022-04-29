import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Category from "./Category";
import MemoList from "./MemoList";
import MemoWrite from "./MemoWrite";
import Nav from "./Nav";

const MemoPage = () => {
  const { menu } = useSelector((state) => state.menu);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onCategoryToggle = useCallback(() => {
    setIsCategoryOpen(!isCategoryOpen);
  }, [isCategoryOpen]);

  return (
    <Wrap>
      <Nav />
      <ContentBox>
        <CategoryOpenBtn onClick={onCategoryToggle}>
          <Icon src="../../img/folder-open.svg" />
        </CategoryOpenBtn>
        <Category
          isCategoryOpen={isCategoryOpen}
          onCategoryToggle={onCategoryToggle}
        />
        {menu === "Write" && <MemoWrite />}
        {menu === "My memos" && <MemoList />}
      </ContentBox>
    </Wrap>
  );
};

export default MemoPage;

const Wrap = styled.div`
  width: 90%;
  height: 100%;
  position: relative;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 94%;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  min-height: 90vh;
  position: relative;
  padding: 50px 0;
  margin: 0 auto;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    padding: 10px 0;
  }
`;

const CategoryOpenBtn = styled.button`
  @media (min-width: 320px) and (max-width: 480px) {
    border-radius: 50%;
    background: #fff;
    padding: 6px;
    border: none;
    outline: none;
    position: fixed;
    top: 5px;
    z-index: 200;
    box-shadow: 2px 2px 2px 2px #b4b4b5;
  }
`;

const Icon = styled.img`
  width: 20px;
`;
