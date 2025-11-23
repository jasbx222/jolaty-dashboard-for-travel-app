import api from "../../api/api";
import CryptoJS from "crypto-js";

interface LoginResponse {
  token: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY_TOKEN;

export default function useLogin() {
  const login = async (
    endpoint: string,
    data: LoginPayload
  ): Promise<LoginResponse> => {
    if (!SECRET_KEY) {
      throw new Error("المفتاح السري للتشفير غير موجود.");
    }

    try {
      const res = await api.post(endpoint, data);

      const token = res?.data?.token;
      const userData = res?.data?.data;

      if (typeof token !== "string" || !userData) {
        throw new Error("الاستجابة غير صالحة من الخادم.");
      }

      const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();

      localStorage.setItem("token", encryptedToken);

      return {
        token,
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        },
      };
    } catch (error: any) {
      console.error("فشل تسجيل الدخول:", error);
      throw error;
    }
  };

  return { login };
}
