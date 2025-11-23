
import { useState, useCallback } from "react";
import { getDecryptedToken } from "./DecryptToken";
import api from "../api/api";

export default function useGetData<T>(endpiont: string) {

  const [data, setData] = useState<T | null>(null);

   const fetchData = useCallback(async () => {
    try {
      const token = getDecryptedToken();
      if (!token) return;
      const res = await api.get(`${endpiont}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json; charset=UTF-8",
        },
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    
    }
  }, [endpiont]);


  return { data, fetchData };
}
