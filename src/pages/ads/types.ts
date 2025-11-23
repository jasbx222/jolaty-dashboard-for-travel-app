export type AdsType = {
  data: [
    {
      id: number;
      title: string;
      image: string;
      expires_at: string;
      type: string;
      destination: {
        name:string
      };
    }
  ];

  page: number;
  perPage: number;
  lastPage: number;
  total: number;
};
export type FormData = {
  title: string;
  image: string;
  expires_at: string;
  type: "slider" | "general";
  destination_id: number | string|null;
};
