import Axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const axiosInstance = Axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URI}/post`,
  withCredentials: true,
});

const PostAPI = {
  getPostList: async (skip, color) => {
    const response = await axiosInstance.get("/list", {
      params: { skip, color },
    });
    const data = await response.data;
    return data;
  },

  getCategoryFilterList: async (skip, category, color) => {
    const response = await axiosInstance.get("/list/filter", {
      params: {
        skip,
        category,
        color,
      },
    });
    const data = await response.data;
    return data;
  },

  createPost: async (body) => {
    const response = await axiosInstance.post("/save", body);
    const data = await response.data;
    return data;
  },

  deletePost: async (postId) => {
    const response = await axiosInstance.delete("/delete", {
      params: {
        postId,
      },
    });
    const data = await response.data;
    return data;
  },

  updatePost: async (body) => {
    const response = await axiosInstance.post("/update", body);
    const data = await response.data;
    return data;
  },
};

export default PostAPI;
