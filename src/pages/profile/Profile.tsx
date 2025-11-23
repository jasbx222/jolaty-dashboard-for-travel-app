import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Edit2 } from "lucide-react";
import api from "../../api/api";
import { getDecryptedToken } from "../../hooks/DecryptToken";
import useGetData from "../../hooks/useGetData";

export interface User {
  name?: string;
  email?: string;
  password?: string;
}

const Profile = () => {
  const { data: userInfo, fetchData } = useGetData<User>("auth/profile");

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  // لما توصل بيانات المستخدم → نحدث الفورم
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
      });
    }
  }, [userInfo]);

  // تغيير الحقول
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // حفظ التغييرات
  const handleSave = async () => {
    try {
      await api.put("auth/profile", formData, {
        headers: { Authorization: `Bearer ${getDecryptedToken()}` },
      });

      await fetchData();
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 5, px: 2, overflow: "auto" }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {userInfo?.name || ""}
        </Typography>

        <Typography variant="body2">
          {userInfo?.email || ""}
        </Typography>

        <Button
          variant="outlined"
          startIcon={<Edit2 style={{ margin: "8px" }} />}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "إلغاء" : "تعديل"}
        </Button>
      </Stack>

      {editMode && (
        <Box mt={4} sx={{ overflow: "auto" }}>
          <Stack spacing={2}>
            <TextField
              label="الاسم"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="البريد الإلكتروني"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="كلمة المرور"
              name="password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              fullWidth
            />

            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
              حفظ التغييرات
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
