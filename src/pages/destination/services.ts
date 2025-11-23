
import { getDecryptedToken } from '../../hooks/DecryptToken';
import api from '../../api/api';

export default {
getAll: async (page?: number, perPage?: number, filters?: { country_id?: string; keyword?: string }) => {
  const token = getDecryptedToken();
  if (!token) throw new Error("No token");

  const params: any = {};

  // Pagination
  if (page) params.page = page;
  if (perPage) params.perPage = perPage;

  // Filters
  if (filters?.country_id) {
    params["filters[0][name]"] = "country_id";
    params["filters[0][operation]"] = "=";
    params["filters[0][value]"] = filters.country_id;
  }

  if (filters?.keyword) {
    params.keyword = filters.keyword;
  }

  const res = await api.get(`destination`, {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
},


  AddDestination:async(data:any)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.post("destination" ,data, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
  },
  UpdateDestination :async(data:any,id:number)=>{
    const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.post(`destination/update/${id}` ,data, {
        headers: { Authorization: `Bearer ${token}` },
      });

    
  },


  DeleteDestination : async (id:number)=>{
       const token = getDecryptedToken();
      if (!token) throw new Error("No token");
      await api.delete(`destination/${id}`,  {
        headers: { Authorization: `Bearer ${token}` },
      });

  }
  }


