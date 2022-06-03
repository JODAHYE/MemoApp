import Axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosInstance = Axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/category`,
});

const CategoryAPI = {
  getCategoryList: async () => {
    const response = await axiosInstance.get("/list/all", {
      headers: {
        Authorization: cookies.get("colorit-accessToken"),
      },
    });
    const data = await response.data;
    return data;
  },

  createCategory: async (body) => {
    const response = await axiosInstance.post("/create", body, {
      headers: {
        Authorization: cookies.get("colorit-accessToken"),
      },
    });
    const data = await response.data;
    return data;
  },

  deleteCategory: async (categoryName) => {
    const response = await axiosInstance.delete("/delete", {
      headers: {
        Authorization: cookies.get("colorit-accessToken"),
      },
      params: {
        name: categoryName,
      },
    });
    const data = await response.data;
    return data;
  },
};

export default CategoryAPI;
