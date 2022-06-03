import { useDispatch, useSelector } from "react-redux";
import PostAPI from "../lib/api/PostAPI";
import { setCurrentMenu } from "../modules/menu";
import { getCategoryFilterList, getMemoList } from "../modules/post";

export const usePost = () => {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);
  const { skip, color } = useSelector((state) => state.post);

  const createMemo = async (body) => {
    const data = await PostAPI.createPost(body);
    if (data.success) {
      alert(data.msg);
      dispatch(setCurrentMenu("My memos"));
    }
  };

  const deleteMemo = async (title, postId, setIsDetailClick) => {
    if (window.confirm(`<${title}>를 삭제하시겠습니까?`)) {
      const data = await PostAPI.deletePost(postId);
      if (data.success) {
        alert(data.msg);
        setIsDetailClick(false);
        if (category) {
          dispatch(getCategoryFilterList(skip, category, color));
        } else {
          dispatch(getMemoList(skip));
        }
      }
      return data;
    }
  };

  const updateMemo = async (body) => {
    const data = await PostAPI.updatePost(body);
    if (category) {
      dispatch(getCategoryFilterList(skip, category, color));
    } else {
      dispatch(getMemoList(skip));
    }
    return data;
  };

  return {
    createMemo,
    deleteMemo,
    updateMemo,
  };
};
