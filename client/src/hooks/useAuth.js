import axios from "axios";

export const useAuth = () => {
  const signup = async (body, setOnSignup) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/user/signup`,
      body
    );
    const data = await response.data;
    if (!data.success) {
      return alert(data.msg);
    }
    alert("Account has been created successfully");
    setOnSignup(false);
  };

  return {
    signup,
  };
};
