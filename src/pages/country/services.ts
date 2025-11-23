
import { getDecryptedToken } from '../../hooks/DecryptToken';
import api from '../../api/api';

export default {
  getAll: async (perPage?:number,page?:number) => {
   
      const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      const res = await api.get(`country? ${page? `page=${page}&perPage=${perPage}`:``}    `, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    
  },

  AddCountry :async(data:any)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.post("country" ,data, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
  },
  UpdateAds :async(data:any,id:number)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.post(`country/update/${id}` ,data, {
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


