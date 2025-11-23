export type DestinationImage = {
  id: number;
  image_path: string;
};

export type Country = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
};

export type Destination = {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  video_url: string | null;
  country_id: Country;
  images: DestinationImage[];
};

export type DestinationResponse = {
  data: Destination[];
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
};


export type DestinationForm = {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  video_url: string | null;
  country_id: number;
  images:File[]|null
}
