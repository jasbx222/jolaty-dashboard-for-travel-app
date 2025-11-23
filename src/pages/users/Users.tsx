import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  TablePagination,
} from "@mui/material";
import Service from "./services";
import {  Ban, CheckCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ClientResponse } from "./types";

export default function UsersManagement() {
  const [Id, setId] = useState(0);
  
  const QueryClient = useQueryClient();
const [page, setPage] = useState(0); 
const [rowsPerPage, setRowsPerPage] = useState(1);

const query = useQuery<ClientResponse>({
  queryKey: ["clients", page, rowsPerPage],
  queryFn: () => Service.getAll(rowsPerPage ,page + 1 ), 
});
  const data = query.data;
  // const [search, setSearch] = useState("");
  const mutation = useMutation({
    mutationFn: () => Service.toggleBlock(Id),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
  const toggleBlock = (id: number) => {
    mutation.mutate();
    setId(id);
  };

  return (
    <Box sx={{ p: 4 }} dir="rtl">
      {/* Title */}
      <Typography variant="h5" fontWeight={700} mb={4}>
        إدارة المستخدمين
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={4}>
        {/* Search */}
        <Grid>
          {/* <TextField
            fullWidth
            placeholder="ابحث باسم المستخدم..."
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
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          /> */}
        </Grid>
      </Grid>

      {/* Table */}
      <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">الاسم</TableCell>
                <TableCell align="center">رقم الهاتف</TableCell>
                <TableCell align="center">الحالة</TableCell>
                <TableCell align="center">الإجراء</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.data.map((cl) => (
                <TableRow key={cl.id} hover>
                  {/* Name */}
                  <TableCell align="center">
                    <Typography fontWeight={600}>{cl.name}</Typography>
                  </TableCell>

                  {/* Phone */}
                  <TableCell align="center">{cl.phone}</TableCell>

                  {/* Status */}
                  <TableCell align="center">
                    {cl.is_active  ? (
                      <Chip
                        label="نشط"
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                    ) : (
                      <Chip
                        label="محظور"
                        color="error"
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </TableCell>

                  {/* Block / Unblock Button */}
                  <TableCell align="center">
                    <IconButton
                      onClick={() => toggleBlock(cl.id)}
                      color={cl.is_active ? "success" : "error"}
                    >
                      {cl.is_active ? (
                        <Tooltip title=" الحظر">
                          <Ban color="red" size={22} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="الغاء الحظر">
                          <CheckCircle size={22} />
                        </Tooltip>
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
         <TablePagination
  component="div"
  count={data?.total || 0}
  page={page}
  onPageChange={(_, newPage) => setPage(newPage)}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // ضروري
  }}
  rowsPerPageOptions={[1, 15, 30, 50]}
/>

        </TableContainer>
      </Card>
    </Box>
  );
}
