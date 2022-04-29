import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePost } from "../hooks/usePost";
import { useDispatch, useSelector } from "react-redux";
import { getMemoList } from "../modules/post";
import { customColor } from "../style/theme";
const MemoDetailPopup = ({ setIsDetailClick, memo }) => {
  const dispatch = useDispatch();
  const { deleteMemo, updateMemo } = usePost();
  const { skip } = useSelector((state) => state.post);
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const contentField = useRef();
  const titleField = useRef();

  useEffect(() => {
    if (isUpdateClick) {
      titleField.current.innerText = memo.title;
      contentField.current.innerText = memo.content;
      contentField.current.focus();
    }
  }, [memo, isUpdateClick]);

  const onDelete = useCallback(() => {
    deleteMemo(memo.title, memo._id, setIsDetailClick).then(() => {
      dispatch(getMemoList(skip));
    });
  }, [memo, deleteMemo, skip, setIsDetailClick]);

  const onUpdate = useCallback(() => {
    const body = {
      _id: memo._id,
      title: titleField.current.innerText,
      content: contentField.current.innerText,
    };
    updateMemo(body).then(() => {
      dispatch(getMemoList(skip));
      setIsUpdateClick(false);
    });
  }, [memo._id, skip, updateMemo]);

  return (
    <Wrap>
      {isUpdateClick ? (
        <div>
          <ControllBtn onClick={onUpdate}>Complete</ControllBtn>
          <ControllBtn
            onClick={() => {
              setIsUpdateClick(false);
            }}
          >
            Cancel
          </ControllBtn>
          <CancelBtn
            onClick={() => {
              setIsDetailClick(false);
            }}
          />
        </div>
      ) : (
        <div>
          <ControllBtn
            onClick={() => {
              setIsUpdateClick(true);
            }}
          >
            Update
          </ControllBtn>
          <ControllBtn onClick={onDelete}>Delete</ControllBtn>
          <CancelBtn
            onClick={() => {
              setIsDetailClick(false);
            }}
          >
            <Icon src="../../img/cancel-circle.svg" />
          </CancelBtn>
        </div>
      )}
      {isUpdateClick ? (
        <Title
          ref={titleField}
          contentEditable="true"
          spellCheck="false"
          active={true}
        ></Title>
      ) : (
        <Title>{memo.title}</Title>
      )}

      <Date>{memo.date.substring(0, 10)}</Date>
      {isUpdateClick ? (
        <Content
          ref={contentField}
          contentEditable="true"
          spellCheck="false"
          active={true}
        ></Content>
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
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
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
const CancelBtn = styled.button`
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
  border: ${(props) => props.active && "1px solid #8C8C8C"};
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
  border: ${(props) => props.active && "1px solid #8C8C8C"};
  outline: none;
  line-height: 1.3em;
  &:focus {
    border: 1px solid ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
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
