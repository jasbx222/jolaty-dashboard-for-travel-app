// hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useLogin from "./useLogin";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// البيانات اللي نرسلها للـ API
interface LoginUser {
  email: string;
  password: string;
}

// الريسبونس اللي يرجع من السيرفر
interface LoginResponse {
  token: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}

export const useLoginMutation = (endpoint: string) => {
  const navigate = useNavigate();
  const { login } = useLogin();

  return useMutation<LoginResponse, AxiosError<{ message: string }>, LoginUser>({
    mutationFn: async (formData) => {
      const response = await login(endpoint, formData);
      return response as unknown as LoginResponse;
    },

    onSuccess: (data) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.data.id,
          email: data.data.email,
          name: data.data.name,
        
        })


      );

      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/home");
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "حدثت مشكلة أثناء تسجيل الدخول",
        text: error.response?.data?.message || "تأكد من اتصالك بالإنترنت",
      });
    },
  });
};
