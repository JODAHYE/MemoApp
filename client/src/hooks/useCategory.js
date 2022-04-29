import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const useCategory = () => {
  const createCategory = async (body) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/category/create`,
      body,
      {
        headers: {
          Authorization: cookies.get("colorit-accessToken"),
        },
      }
    );
    const data = await response.data;
    if (!data.success) {
      return alert(data.msg);
    }
    return data;
  };

  const deleteCategory = async (categoryName) => {
    if (
      window.confirm(
        `Are you sure yto delete the folder? Memos in that folder will also be deleted.`
      )
    ) {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/category/delete`,
        {
          headers: {
            Authorization: cookies.get("colorit-accessToken"),
          },
          params: {
            name: categoryName,
          },
        }
      );
      const data = await response.data;
      if (!data.success) {
        return alert(data.msg);
      }
      return data;
    }
  };

  return { createCategory, deleteCategory };
};
