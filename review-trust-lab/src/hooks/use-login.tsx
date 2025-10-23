import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "@/providers/auth";
import { AuthState } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import url from "@/services/serverHelper";

export const useLogin = () => {
  const nav = useNavigate();
  const { setAuth } = useAuth();
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      const { data }: { data: AuthState } = await axios.post(
        `${url}/auth/google/login`,
        { code }
      );
      console.log(data);
      // Expecting backend to return { token, user: { id, email, name, roles } }
      setAuth(data);
      nav("/courses");
    },
    onError: () => console.log("Login failed"),
  });
  return login;
};
