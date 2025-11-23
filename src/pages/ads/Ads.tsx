import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { Search, Plus } from "lucide-react";
import type { AdsType } from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import getAll from "./services";
import DeleteAds from "./services";
import CreateAds from "./create/CreateAds";
import UpdateAds from "./updateAds/UpdateAds";
export default function Ads() {
  const [search, setSearch] = useState("");
  const [add, setAdd] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  const [edit, setEdit] = useState(false);
  const [Id, setId] = useState(0);
  const queryClient =useQueryClient()
  const query = useQuery<AdsType>({
    queryKey: ["ads",page, rowsPerPage],
    queryFn: () => getAll.getAll( page + 1 , rowsPerPage),
  });

  const handleEdit = (id: number) => {
    setEdit(true);
    setId(id);
  };
  const mutation = useMutation({
    mutationFn: () => DeleteAds.DeleteAds(Id),
    onSuccess: () => {
      console.log("deleted success");
        queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
  const HandleDelete = (id: number) => {
    setId(id);
    mutation.mutate();
  };

  // useGetData returns an object like { data: AdsType | null, fetchData: ... }
  // derive the AdsType value from query.data.data without calling setState during render
  const ads = query?.data?.data ?? [];
  console.log("query", query.data);

  // Filtering
  const filtered =
    ads?.filter((slider) => {
      const matchSearch =
        slider.type.includes(search) || 
        slider.title.includes(search);

      // حسب التايب: ماكو country لذلك مستحيل نفلتر دولة
      const matchCountry = true;

      return matchSearch && matchCountry;
    }) ?? [];

  return (
    <Box sx={{ p: 4 }} dir="rtl">
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          onClick={() => setAdd(true)}
          variant="contained"
          startIcon={
            <Plus
              style={{
                margin: "4px",
              }}
            />
          }
          sx={{ borderRadius: 3, py: 1.2 }}
        >
          إضافة
        </Button>
      </Box>
      <CreateAds open={add} setOpen={setAdd} />
      <UpdateAds open={edit} setOpen={setEdit} id={Id} />

      {/* Search only — لأن ماكو دولة بالتايب */}
      <Grid container spacing={2} mb={4}>
        <Grid>
          <TextField
            fullWidth
            placeholder="بحث حسب النوع أو العنوان  ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Grid>
      </Grid>

      <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">الصورة</TableCell>
                <TableCell align="center">نوع السلايدر</TableCell>
                <TableCell align="center">العنوان</TableCell>
                <TableCell align="center">الوجهة</TableCell>
                <TableCell align="center">الاجرائات</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((slider) => (
                <TableRow key={slider.id} hover>
                  <TableCell align="center">
                    <img
                      src={slider.image}
                      alt="slider"
                      style={{
                        width: 110,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    {slider.type === "general" ? (
                      <Chip
                        label="عام"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      />
                    ) : (
                      <Chip
                        label="حسب الدولة"
                        color="secondary"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </TableCell>

                  <TableCell align="center">{slider.title}</TableCell>

                  <TableCell align="center">{slider?.destination?.name}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ m: 2 }}
                      onClick={() => handleEdit(slider.id)}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>HandleDelete(slider.id)}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
         {/* Pagination */}
              <TablePagination
                component="div"
                count={query?.data?.total || 0} // عدد العناصر الكلي
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0); // ارجع للصفحة الأولى عند تغيير الصفوف
                }}
                rowsPerPageOptions={[5, 15, 30, 50]}
              />
      </Card>
    </Box>
  );
}
