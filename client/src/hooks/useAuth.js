import AuthAPI from "../lib/api/AuthAPI";

export const useAuth = () => {
  const signup = async (body, setOnSignup) => {
    const data = await AuthAPI.signup(body);
    if (!data.success) {
      return alert(data.msg);
    }
    alert("회원가입 완료");
    setOnSignup(false);
  };

  return {
    signup,
  };
};
