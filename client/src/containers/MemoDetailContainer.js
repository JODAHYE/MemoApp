import React from 'react';
import { useSelector } from 'react-redux';
import MemoDetail from '../components/MemoDetail';

const MemoDetailContainer = ({onClose}) => {
  const {post} = useSelector(state=>state.post);

  return (<MemoDetail post={post} onClose={onClose} />);
};

export default MemoDetailContainer;
