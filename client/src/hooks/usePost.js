import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { setCurrentMenu } from "../modules/menu";
import { getCategoryFilterList, getMemoList } from "../modules/post";
const cookies = new Cookies();
export const usePost = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { skip, color } = useSelector((state) => state.post);
  const writeMemo = async (body) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/post/save`,
      body,
      {
        headers: {
          Authorization: cookies.get("colorit-accessToken"),
        },
      }
    );
    const data = await response.data;
    if (data.success) {
      alert(data.msg);
      dispatch(setCurrentMenu("My memos"));
    }
  };

  const deleteMemo = async (title, postId, setIsDetailClick) => {
    if (window.confirm(`Are you sure to delete <${title}>?`)) {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/post/delete`,
        {
          headers: {
            Authorization: cookies.get("colorit-accessToken"),
          },
          params: {
            postId,
          },
        }
      );
      const data = await response.data;
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

  const updateMemo = async (body, setIsUpdateClick) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/post/update`,
      body,
      {
        headers: {
          Authorization: cookies.get("colorit-accessToken"),
        },
      }
    );
    const data = await response.data;
    if (category) {
      dispatch(getCategoryFilterList(skip, category, color));
    } else {
      dispatch(getMemoList(skip));
    }
    return data;
  };
  return {
    writeMemo,
    deleteMemo,
    updateMemo,
  };
};
