import React, { useEffect, useState, type FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Service from "../services";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

export type DestinationForm = {
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  video_url?: string | null;
  country_id: number;
  images?: File[] | null;
};

const countries = [
  { id: 1, name: "Syria" },
  { id: 2, name: "Iraq" },
  { id: 3, name: "Lebanon" },
];
import {  useMap } from "react-leaflet";

export default function UpdateDestination({
  open,
  id,
  setOpen,
}: {
  open: boolean;
  id:number;
  setOpen: (val: boolean) => void;
}) {
  const queryClient = useQueryClient();

// Component لتحديث حجم الخريطة بعد فتح Dialog
function MapResize() {
  const map = useMap();
  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);
  return null;
}
function SetMapView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}
  const [form, setForm] = useState<DestinationForm>({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    video_url: null,
    country_id: 1,
    images: null,
  });

  const [mapOpen, setMapOpen] = useState(false); // Dialog الخريطة

  const handleChange = (field: keyof DestinationForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // دمج الصور الجديدة مع الموجودة (إذا أردت السماح بإضافة أكثر من مرة)
      const newFiles = Array.from(e.target.files);
      setForm((prev) => ({
        ...prev,
        images: prev.images ? [...prev.images, ...newFiles] : newFiles,
      }));
    }
  };

  const mutation = useMutation({
    mutationFn: (newDestination: DestinationForm) => {
      const formData = new FormData();
       if (newDestination.name)
      formData.append("name", newDestination.name);
       if (newDestination.description)
      formData.append("description", newDestination.description);
       if (newDestination.latitude)
      formData.append("latitude", newDestination.latitude);
       if (newDestination.longitude)
      formData.append("longitude", newDestination.longitude);
       if (newDestination.country_id)
      formData.append("country_id", newDestination.country_id.toString());
      if (newDestination.video_url)
        formData.append("video_url", newDestination.video_url);
      if (newDestination.images && newDestination.images.length > 0) {
        newDestination.images.forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      }

      return Service.UpdateDestination(formData,id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destination"] });
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      alert("حدث خطأ أثناء الإضافة");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  // Component لتحديد الموقع على الخريطة
  const LocationMarker = ({
    onSelect,
  }: {
    onSelect: (lat: number, lng: number) => void;
  }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useMapEvents({
      click(e:any) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onSelect(e.latlng.lat, e.latlng.lng);
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Box sx={{ p: 4 }}>
      

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="الاسم"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
               
                  fullWidth
                />
                <TextField
                  label="الوصف"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  multiline
                  rows={3}
               
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="خط العرض"
                    value={form.latitude}
                    onChange={(e) => handleChange("latitude", e.target.value)}
                 
                    fullWidth
                  />
                  <TextField
                    label="خط الطول"
                    value={form.longitude}
                    onChange={(e) => handleChange("longitude", e.target.value)}
                 
                    fullWidth
                  />
                </Stack>
                <Button variant="outlined" onClick={() => setMapOpen(true)}>
                  اختيار الموقع على الخريطة
                </Button>

                <TextField
                  select
                  label="الدولة"
                  value={form.country_id}
                  onChange={(e) =>
                    handleChange("country_id", Number(e.target.value))
                  }
                  fullWidth
                >
                  {countries.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="رابط الفيديو (اختياري)"
                  value={form.video_url ?? ""}
                  onChange={(e) =>
                    handleChange("video_url", e.target.value || null)
                  }
                  fullWidth
                />
                <Button variant="contained" component="label">
                  رفع الصور
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
                {form.images && (
                  <Typography variant="body2">
                    {form.images.length} صورة مختارة
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "جاري التعديل..." : "تعديل الوجهة"}
                </Button>
              </Stack>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog للخريطة */}
  <Dialog open={mapOpen} onClose={() => setMapOpen(false)} maxWidth="md" fullWidth>
  <DialogContent>
    <Typography variant="h6" gutterBottom>
      اختر الموقع على الخريطة
    </Typography>
    <Box
      sx={{
        height: 500, // زيادة الارتفاع
        width: "100%",
        border: "1px solid #ccc", // حدود خفيفة
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      <MapContainer

  style={{ height: 500, width: "100%" }}
>
    <SetMapView center={[34.945332, 39.002504]} zoom={6} />
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    {...({
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    } as any)}
  />
  <LocationMarker
    onSelect={(lat, lng) => {
      handleChange("latitude", lat.toString());
      handleChange("longitude", lng.toString());
      setMapOpen(false);
    }}
  />
  <MapResize />
</MapContainer>

    </Box>
    <Button variant="contained" onClick={() => setMapOpen(false)}>
      إغلاق
    </Button>
  </DialogContent>
</Dialog>

    </>
  );
}
