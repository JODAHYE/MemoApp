import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/category`,
  withCredentials: true,
});

const CategoryAPI = {
  getCategoryList: async () => {
    const response = await axiosInstance.get("/list/all");
    const data = await response.data;
    return data;
  },

  createCategory: async (body) => {
    const response = await axiosInstance.post("/create", body);
    const data = await response.data;
    return data;
  },

  deleteCategory: async (categoryName) => {
    const response = await axiosInstance.delete("/delete", {
      params: {
        name: categoryName,
      },
    });
    const data = await response.data;
    return data;
  },
};

export default CategoryAPI;
