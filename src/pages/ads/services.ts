
import { getDecryptedToken } from '../../hooks/DecryptToken';
import api from '../../api/api';

export default {
  getAll: async (page?:number,perPage?:number) => {
   
      const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      const res = await api.get( `ads?${page?`page=${page}&perPage=${perPage}`:``} `, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    
  },

  AddAds :async(data:FormData)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.post("ads" ,data, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
  },
  UpdateAds :async(data:FormData,id:number)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.post(`ads/update/${id}` ,data, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
  },


  DeleteAds : async (id:number)=>{
       const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.delete(`ads/${id}`,  {
        headers: { Authorization: `Bearer ${token}` },
      });

  }
  }


