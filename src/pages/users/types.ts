export type Client = {
  id: number;
  name: string;
  phone: string;
  is_active: boolean;
  created_at: string; // تاريخ على شكل string
};

export type ClientResponse = {
  data: Client[];
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
};
