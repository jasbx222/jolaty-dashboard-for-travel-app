
import { getDecryptedToken } from '../../hooks/DecryptToken';
import api from '../../api/api';

export default {
  getAll: async (perPage:number,page:number) => {
   
      const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      const res = await api.get(`client?page=${page}&perPage=${perPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    
  },

 
  toggleBlock :async(id:number)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.put(`client/toggle-active/${id}` , {
        headers: { Authorization: `Bearer ${token}` },
      });

    
  }


  }


