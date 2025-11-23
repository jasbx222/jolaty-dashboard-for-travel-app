import  { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Stack,
  TablePagination,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Service from "./services";
import { Plus } from "lucide-react";
import CreateCountries from "./create/CreateCountries";
import UpdateCountries from "./update/UpdateCountries";
export type Country = {
  data: [
    {
      id: number;
      name: string;
      latitude: string;
      longitude: string;
    }
  ];
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
};
export default function CountriesPage() {
  const [page, setPage] = useState(1);
  const [Id, setId] = useState(0);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const query = useQuery<Country>({
    queryKey: ["country", page, rowsPerPage],
    queryFn: () => Service.getAll( rowsPerPage ,page + 1),
  });

  const data = query.data;

  const handleEdit = (id: number) => {
    setEdit(true);
    setId(id);
  };
const queryClient =useQueryClient();
 const mutation = useMutation({
    mutationFn: () => Service.DeleteAds(Id),
    onSuccess: () => {
      console.log("deleted success");
        queryClient.invalidateQueries({ queryKey: ["country"] });
    },
  });
  const HandleDelete = (id: number) => {
    setId(id);
    mutation.mutate();
  };

  return (
    <Box sx={{ p: 4 }}>
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

      <CreateCountries open={add} setOpen={setAdd} />
      <UpdateCountries id={Id} open={edit} setOpen={setEdit} />

      <Grid container spacing={3}>
        {data?.data.map((country: any) => (
          <Grid key={country.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {country.name.charAt(0).toUpperCase() + country.name.slice(1)}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  <Chip
                    label={`Latitude: ${country.latitude}`}
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                  />
                  <Chip
                    label={`Longitude: ${country.longitude}`}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Stack>

                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(country.id)}
                  >
                    تعديل
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => HandleDelete(country.id)}
                  >
                    حذف
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data?.total || 0} // عدد العناصر الكلي
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // ارجع للصفحة الأولى عند تغيير الصفوف
        }}
        rowsPerPageOptions={[5, 15, 30, 50]}
      />
    </Box>
  );
}
