import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { usePost } from "../hooks/usePost";
import { customColor } from "../style/theme";

const MemoDetailPopup = ({ setIsDetailClick, memo }) => {
  const { deleteMemo, updateMemo } = usePost();

  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const [memoColor, setMemoColor] = useState(memo.color);
  const [colorArrayIdx, setColorArrayIdx] = useState(0);
  const [updatedInfo, setUpdatedInfo] = useState({
    title: memo.title,
    content: memo.content,
  });

  const colorArray = [customColor.red, customColor.yellow, customColor.purple];

  const onDelete = useCallback(() => {
    deleteMemo(memo.title, memo._id, setIsDetailClick);
  }, [memo, deleteMemo, setIsDetailClick]);

  const onUpdate = useCallback(() => {
    const body = {
      _id: memo._id,
      title: updatedInfo.title,
      content: updatedInfo.content,
      color: memoColor,
    };
    updateMemo(body).then(() => {
      setIsUpdateClick(false);
    });
  }, [memoColor, updatedInfo, memo._id, updateMemo]);

  const onUpdateInfo = useCallback(
    (e) => {
      setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
    },
    [updatedInfo]
  );

  const colorChange = useCallback(() => {
    if (colorArrayIdx >= colorArray.length - 1) setColorArrayIdx(0);
    setColorArrayIdx((prev) => prev + 1);
    setMemoColor(colorArray[colorArrayIdx]);
  }, [colorArrayIdx, colorArray]);

  const closeDetailPopup = useCallback(() => {
    setIsDetailClick(false);
  }, [setIsDetailClick]);

  const onUpdateButtonToggle = useCallback(() => {
    setIsUpdateClick((prev) => !prev);
  }, []);

  return (
    <Wrap color={isUpdateClick ? memoColor : "#fff"}>
      {isUpdateClick ? (
        <div>
          <ControllBtn onClick={onUpdate}>Complete</ControllBtn>
          <ControllBtn onClick={onUpdateButtonToggle}>Cancel</ControllBtn>
          <Btn onClick={colorChange}>
            <Icon src="../../img/paint-brush.svg" />
          </Btn>
          <Btn onClick={closeDetailPopup}>
            <Icon src="../../img/cancel-circle.svg" />
          </Btn>
        </div>
      ) : (
        <div>
          <ControllBtn onClick={onUpdateButtonToggle}>Update</ControllBtn>
          <ControllBtn onClick={onDelete}>Delete</ControllBtn>
          <Btn onClick={closeDetailPopup}>
            <Icon src="../../img/cancel-circle.svg" />
          </Btn>
        </div>
      )}
      {isUpdateClick ? (
        <UpdateTitleField
          name="title"
          value={updatedInfo.title}
          onChange={onUpdateInfo}
          active={true}
        />
      ) : (
        <Title>{memo.title}</Title>
      )}

      <Date>{memo.date.substring(0, 10)}</Date>
      {isUpdateClick ? (
        <UpdateContentField
          name="content"
          value={updatedInfo.content}
          onChange={onUpdateInfo}
          active={true}
        />
      ) : (
        <Content>{memo.content}</Content>
      )}
    </Wrap>
  );
};

export default MemoDetailPopup;

const Wrap = styled.div`
  width: 30vw;
  height: 60vh;
  position: fixed;
  top: 50%;
  left: 50%;
  background: ${(props) => props.color};
  transform: translate(-50%, -50%);
  padding: 10px 22px;
  overflow-y: auto;
  box-sizing: border-box;
  z-index: 500;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-shadow: 0px 0px 1000px 1000px rgba(0, 0, 0, 0.5);
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    display: flex;
    justify-content: flex-end;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 90vw;
    padding: 6px;
  }
`;

const Btn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
`;

const Icon = styled.img`
  width: 20px;
`;

const Title = styled.p`
  border-bottom: 1px solid #eee;
  margin: 0;
  outline: none;
  &:focus {
    border: 1px solid ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Date = styled.p`
  border-bottom: 1px solid #eee;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Content = styled.p`
  margin: 0;
  white-space: pre-wrap;
  outline: none;
  line-height: 1.3em;
  &:focus {
    border: 1px solid ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;
const UpdateTitleField = styled.input`
  border: 1px solid #fff;
  outline: none;
  width: 100%;
  padding: 4px;
  background: transparent;
  box-sizing: border-box;
  &:focus {
    border: 1px solid ${customColor.buttonActive};
  }
`;
const UpdateContentField = styled.textarea`
  width: 100%;
  height: 70%;
  resize: none;
  border: 1px solid #fff;
  outline: none;
  padding: 4px;
  background: transparent;
  box-sizing: border-box;
  &:focus {
    border: 1px solid ${customColor.buttonActive};
  }
`;

const ControllBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;
