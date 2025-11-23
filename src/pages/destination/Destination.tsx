import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  TablePagination,
  TextField,
  MenuItem,
} from "@mui/material";
import Service from "./services";
import ServiecCountry from "../country/services";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type DestinationResponse } from "./types";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateDestination from "./create/CreateDestination";
import UpdateDestination from "./update/UpdateDestination";
import type { Country } from "../country/Country";

export default function Destinations() {
  const [add, setAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [edit, setEdit] = useState(false);

  // 🟦 الفلاتر
  const [countryId, setCountryId] = useState("");
  const [keyword, setKeyword] = useState("");
  const CountryData = useQuery<Country>({
    queryKey: ["country", page, rowsPerPage],
    queryFn: () => ServiecCountry.getAll(rowsPerPage, page + 1),
  });

  const Country = CountryData.data;

  const query = useQuery<DestinationResponse>({
    queryKey: ["destination", page, rowsPerPage, countryId, keyword],
    queryFn: () =>
      Service.getAll(page + 1, rowsPerPage, {
        country_id: countryId,
        keyword: keyword,
      }),
  });

  const data = query.data?.data;
  const QueryClient = useQueryClient();
  const [Id, setId] = useState(0);

  const mutation = useMutation({
    mutationFn: () => Service.DeleteDestination(Id),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["destination"] });
    },
  });

  const handleDelete = (id: number) => {
    setId(id);
    mutation.mutate();
  };

  const handleEdit = (id: number) => {
    setId(id);
    setEdit(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          select
          label="الدولة"
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">الكل</MenuItem>

          {Country?.data?.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="بحث بالاسم"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Button
          onClick={() => setAdd(true)}
          variant="contained"
          startIcon={<Plus />}
          sx={{ borderRadius: 3, py: 1.2 }}
        >
          إضافة
        </Button>
      </Box>

      <CreateDestination open={add} setOpen={setAdd} />
      <UpdateDestination id={Id} open={edit} setOpen={setEdit} />

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">الصورة</TableCell>
              <TableCell align="center">الاسم</TableCell>
              <TableCell align="center">الوصف</TableCell>
              <TableCell align="center">الدولة</TableCell>
              <TableCell align="center">الإحداثيات</TableCell>
              <TableCell align="center">الإجراءات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">
                  {item.images.length > 0 && (
                    <img
                      src={item.images[0].image_path}
                      style={{
                        width: 100,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  )}
                </TableCell>

                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.country_id.name}</TableCell>

                <TableCell align="center">
                  {item.latitude}, {item.longitude}
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    sx={{ m: 1 }}
                    onClick={() => handleEdit(item.id)}
                  >
                    تعديل
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={query?.data?.total || 0}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 15, 30, 50]}
        />
      </TableContainer>
    </Box>
  );
}
