import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import AddAds from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FormData } from "../types";
import type { DestinationResponse } from "../../destination/types";
import Service from "../../destination/services";
export default function CreateAds({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const queryClient = useQueryClient();
 const query = useQuery<DestinationResponse>({
    queryKey: ["destination"],
    queryFn: () => Service.getAll(),
  });
  const data = query.data?.data;
  const [form, setForm] = useState<FormData>({
    title: "cvcv",
    image: "",
    expires_at: "",
    type: "slider",
    destination_id: null,
  });

  const handleChange = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange("image", e.target.files[0]);
    }
  };
  const mutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("expires_at", form.expires_at);
      formData.append("type", form.type);
      if (form.destination_id)
        formData.append("destination_id", String(form.destination_id));
      if (form.image) formData.append("image", form.image);

      return AddAds.AddAds(formData); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>إضافة سلايدر جديد</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="العنوان"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <TextField
            label="رابط الصورة"
            type="file"
            onChange={handleFileChange}
          />
          <TextField
            label="تاريخ الانتهاء"
            type="date"
            value={form.expires_at}
            onChange={(e) => handleChange("expires_at", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="النوع"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <MenuItem value="slider">Slider</MenuItem>
            <MenuItem value="banner">banner</MenuItem>
          </TextField>
         <TextField
            select
            label="الوجهة"
            value={form.destination_id ?? ""}
            onChange={(e) =>
              handleChange("destination_id", Number(e.target.value))
            }
          >
            <MenuItem value="">بدون وجهة</MenuItem>

            {data?.map((dest: any) => (
              <MenuItem key={dest.id} value={dest.id}>
                {dest.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleSubmit}>
            إضافة
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
