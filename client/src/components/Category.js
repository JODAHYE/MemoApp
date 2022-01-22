import React from 'react';
import styled from 'styled-components';
import {MdCreateNewFolder} from 'react-icons/md';
import {HiOutlineFolderRemove} from 'react-icons/hi';
const Wrap = styled.div`
  position: absolute;
  top: 0;
  width: 12%;
  background:#F6F6F6;
  padding: 10px;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 40%;
    position: fixed;
    top: 56px;
    left: 0; 
    z-index: 500;
    bottom: 0;
    display: ${props=>props.view};
  }
  `;
const Folder = styled.ul`
`;
const FolderItem = styled.li`
  list-style-image: url( "img/folder.png" );
  font-size: 14px;
  cursor: pointer;
  padding: 6px; 
  border-bottom:1px solid #6B6B6B;
`;
const AddBtn = styled(MdCreateNewFolder)`
  cursor: pointer;
  padding: 4px;
  background: #000;
  color: #fff;
  font-size: 20px;
  border-right: 1px solid #fff;
`;
const RemoveBtn = styled(HiOutlineFolderRemove)`
  cursor: pointer;
  padding: 4px;
  background: #000;
  color: #fff;
  font-size: 20px;
`;
const Input = styled.input`
  width: 95%;
  padding:2px;
  outline: none;
  border: none;
`;
const SubBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 4px;
  background: #000;
  color: #fff;
  margin: 1px;
`;

const Dark = styled.div`
@media (min-width: 320px) and (max-width: 480px) {
  display: ${props=>props.view};
  width: 60%;
  height: 100vh;
  position:fixed;
  top: 56px;
  right: 0;
  background: #000;
  opacity: 0.7;
}`;
const Category = ({onFolderToggle, isFolderOpen, onAllFolders, categories, onFolderClick, onAddClick, onCancel, onAdd, add, value, onChangeInput, onRemoveClick, remove, onRemove}) => {
  return (
    <Wrap view={isFolderOpen?'block':'none'}>
      <Folder>
        <FolderItem onClick={onAllFolders}>전체보기</FolderItem>
        {categories.map((v, i)=><FolderItem onClick={onFolderClick} key={i}>{v}</FolderItem>)}
      </Folder>
      {(!add&&!remove)&&<><AddBtn onClick={onAddClick} /><RemoveBtn onClick={onRemoveClick} /></>}
      {add&&<><Input onChange={onChangeInput} value={value}/> 
      <SubBtn onClick={onAdd}>추가</SubBtn><SubBtn onClick={onCancel}>취소</SubBtn></>}
      {remove&&<><Input onChange={onChangeInput} value={value} placeholder='삭제할 폴더명' /><SubBtn onClick={onRemove}>삭제</SubBtn><SubBtn onClick={onCancel}>취소</SubBtn></>}
      <Dark view={isFolderOpen?'block':'none'} onClick={onFolderToggle}/>
    </Wrap>
  );
};

export default Category;
