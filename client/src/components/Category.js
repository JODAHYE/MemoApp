import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList, setCategory } from "../modules/category";
import { useCategory } from "../hooks/useCategory";
import { getMemoList, setColor, setSkip } from "../modules/post";
import { customColor } from "../style/theme";
import { checkCorrect } from "../lib/checkCorrect";

const Category = ({ isCategoryOpen, onCategoryToggle }) => {
  const dispatch = useDispatch();

  const { createCategory, deleteCategory } = useCategory();
  const { categories, category } = useSelector((state) => state.category);

  const [isAddBtnClick, setIsAddBtnClick] = useState(false);
  const [isDeleteBtnClick, setIsDeleteBtnClick] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

  const onChangeInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onCancel = useCallback(() => {
    setIsAddBtnClick(false);
    setIsDeleteBtnClick(false);
  }, []);

  const onCreate = useCallback(() => {
    if (!value) return;
    if (!checkCorrect(value)) {
      return alert("특수문자는 사용할수 없습니다.");
    }
    createCategory({ name: value }).then(() => {
      dispatch(getCategoryList());
      setValue("");
    });
  }, [value, createCategory]);

  const onDelete = useCallback(() => {
    deleteCategory(value).then(() => {
      dispatch(getCategoryList());
      setValue("");
      dispatch(setCategory(""));
      dispatch(getMemoList(0));
    });
  }, [value, deleteCategory]);

  const onCategoryClick = useCallback((e) => {
    dispatch(setSkip(0));
    dispatch(setColor(""));
    dispatch(setCategory(e.target.innerHTML));
  }, []);

  const showAllMemos = useCallback(() => {
    dispatch(setSkip(0));
    dispatch(setColor(""));
    dispatch(setCategory(""));
  }, []);

  return (
    <Wrap view={isCategoryOpen ? "block" : "none"}>
      <Title>Folder</Title>
      <CategoryList>
        <CategoryItem onClick={showAllMemos}>All</CategoryItem>
        {categories &&
          categories.length > 0 &&
          categories.map((item, i) => (
            <CategoryItem
              onClick={onCategoryClick}
              key={item.name + i}
              active={category === item.name && true}
            >
              {item.name}
            </CategoryItem>
          ))}
      </CategoryList>
      {!isAddBtnClick && !isDeleteBtnClick && (
        <>
          <CategoryBtn
            onClick={() => {
              setIsAddBtnClick(true);
            }}
          >
            <Icon src="../../img/folder-plus.svg" />
          </CategoryBtn>
          <CategoryBtn
            onClick={() => {
              setIsDeleteBtnClick(true);
            }}
          >
            <Icon src="../../img/folder-minus.svg" />
          </CategoryBtn>
        </>
      )}
      {isAddBtnClick && (
        <>
          <Input
            onChange={onChangeInput}
            value={value}
            placeholder="Folder name to add"
          />
          <ControllBtn onClick={onCreate}>Add</ControllBtn>
          <ControllBtn onClick={onCancel}>Cancel</ControllBtn>
        </>
      )}
      {isDeleteBtnClick && (
        <>
          <Input
            onChange={onChangeInput}
            value={value}
            placeholder="Folder name to delete"
          />
          <ControllBtn onClick={onDelete}>Delete</ControllBtn>
          <ControllBtn onClick={onCancel}>Cancel</ControllBtn>
        </>
      )}
      <CancelCategoryBtn onClick={onCategoryToggle}>Cancel</CancelCategoryBtn>
    </Wrap>
  );
};

export default Category;

const Wrap = styled.div`
  position: absolute;
  top: 0;
  width: 12%;
  background: #f6f6f6;
  padding: 10px;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 480px) {
    display: ${(props) => props.view};
    position: fixed;
    left: 0;
    bottom: 0;
    width: 50%;
    z-index: 400;
    box-shadow: 0px 0px 700px 700px rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.h3``;

const CancelCategoryBtn = styled.button`
  display: none;
  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
    width: 100%;
    outline: none;
    border: none;
    border-radius: 6px;
    margin-top: 5px;
    padding: 4px;
    background: ${customColor.button};
  }
`;

const CategoryList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0px;
  padding: 0px;
  word-wrap: break-word;
`;

const CategoryItem = styled.li`
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 6px;
  border-bottom: 1px solid #6b6b6b;
  ${(props) =>
    props.active &&
    css`
      color: orange;
    `};
`;

const CategoryBtn = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
`;

const Icon = styled.img`
  width: 20px;
`;

const Input = styled.input`
  width: 95%;
  padding: 4px;
  background: ${customColor.inputColor};
  border-radius: 6px;
  outline: none;
  border: none;
`;

const ControllBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 4px;
  margin: 1px;
  border-radius: 6px;
  background: ${customColor.button};
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;
