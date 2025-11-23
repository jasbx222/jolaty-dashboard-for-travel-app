import { useState, useEffect } from "react";
import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";

import { Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { getDecryptedToken } from "../../hooks/DecryptToken";
// import useUpdate from "../../hooks/useUpdate";
type Term = {
  key: string;
  value: string;
};
export default function WhatsApp() {
  const query = useQuery<Term>({
    queryKey: ["whatsapp-phone"],
    queryFn: async () => {
      const res = await api.get("setting/whatsapp-phone", {
        headers: {
          Authorization: `Bearer ${getDecryptedToken()}`,
        },
      });

      return res.data;
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const QueryClient = useQueryClient();
  // تحديث الـ state عند وصول البيانات من الباك
  useEffect(() => {
    if (query?.data) {
      setTitle(query.data.key);
      setContent(query.data.value);
    }
  }, [query.data]);

  // const { update } = useUpdate();
  const mutation = useMutation({
    mutationFn: async () => {
      await api.post(
        `setting/whatsapp-phone`,
        { key: title, value: content },
        {
          headers: {
            Authorization: `Bearer ${getDecryptedToken()}`,
          },
        }
      );
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["whatsapp-phone"] });
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <Card className="w-full max-w-2xl rounded-3xl shadow-xl   ">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <TextField
                fullWidth
                label="العنوان"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{ style: { borderRadius: 16 } }}
              />
              <TextField
                fullWidth
                label="رقم الهاتف"
                variant="outlined"
                multiline
                minRows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                InputProps={{ style: { borderRadius: 16 } }}
              />
              <Button
                type="submit"
                variant="contained"
                className="w-full rounded-xl font-semibold py-3 text-lg shadow-lg transition-all"
              >
                حفظ التعديلات
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
