import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  TextField,
} from "@mui/material";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// --- Location Picker for Map ---
type LocationPickerProps = {
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
};
function LocationPicker({ setLat, setLng }: LocationPickerProps) {
  useMapEvents({
    click(e: any) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });
  return null;
}

// --- Add Country Modal ---
type AddCountryModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};
import Service from "../services";
export default function CreateCountries({
  open,
  setOpen,
}: AddCountryModalProps) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const QueryClient = useQueryClient();
  const data = {
    name: name,
    latitude: latitude,
    longitude: longitude,
  };
  const mutation = useMutation({
    mutationFn: () => Service.AddCountry(data),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["country"] });
    },
  });
  const handleSubmit = () => {
    mutation.mutate();
        setOpen(false)
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          إضافة دولة جديدة
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="اسم الدولة"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography>اختر الموقع على الخريطة:</Typography>
          <Box sx={{ height: 200 }}>
            <MapContainer
              center={[33.3128, 44.3615]}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker setLat={setLatitude} setLng={setLongitude} />
              {latitude && longitude && (
                <Marker position={[latitude, longitude]} />
              )}
            </MapContainer>
          </Box>

          <Typography>
            Latitude: {latitude}, Longitude: {longitude}
          </Typography>

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            إضافة
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
