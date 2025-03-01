"use client";

import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, FormControl, Select, MenuItem, Toolbar, AppBar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import API from "@/app/utils/API";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/UseAuth";

const ReportPage: React.FC = () => {
  const [datas, setDatas] = useState<any[]>([]);
  const auth = useAuth();
  const navigation = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [periode, setPeriode] = useState("hari");
  const [data, setData] = useState<any[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [totalUsedWater, setTotalUsedWater] = useState<number | null>(null);

  const getTools = async () => {
    try {
      const res = await API.get(`/tool/getToolsByUserId/${auth.auth.user?.id}`);
      setTools(res.data.data);
      if (res.data.data.length > 0) {
        await getHistoryThisDay(res.data.data[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getHistoryThisDay = async (toolId: string) => {
    try {
      const res = await API.get(`/history/getHistory/${auth.auth.user?.id}/${toolId}?filter=${periode}`);
      setDatas(res.data.data);
      const total = res.data.data.reduce((acc: number, item: { totalUsedWater: number }) => acc + item.totalUsedWater, 0);
      setTotalUsedWater(total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!auth.auth.isAuthenticated) {
      navigation.replace("/auth/login");
      return;
    }

    setLoading(true);
    getTools().finally(() => setLoading(false));
  }, [auth.auth.isAuthenticated, navigation, periode]);

  if (!auth.auth.isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#F8F9FA" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(45deg, #1E3A8A 30%, #3B82F6 90%)",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "start", alignItems: "center", gap: 2 }}>
          <IconButton onClick={navigation.back} sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "0.5px" }}>
            Grafik
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Dropdown Pilih Periode */}
      <Box sx={{ mt: 10 }}>
        <FormControl fullWidth>
          <Select value={periode} onChange={(e) => setPeriode(e.target.value)} displayEmpty sx={{ bgcolor: "white", borderRadius: 2 }}>
            <MenuItem value="hari">Hari</MenuItem> {/* Mengubah dari "harian" ke "hari" */}
            <MenuItem value="minggu">Minggu</MenuItem>
            <MenuItem value="bulan">Bulan</MenuItem> {/* Mengubah dari "bulanan" ke "bulan" */}
            <MenuItem value="tahun">Tahun</MenuItem> {/* Menambahkan opsi "tahun" */}
          </Select>
        </FormControl>
      </Box>

      <Paper elevation={3} sx={{ m: 2, borderRadius: 3, overflow: "hidden" }}>
        <Typography variant="h6" sx={{ p: 2, bgcolor: "#D1E9FF", textAlign: "center", fontWeight: "bold" }}>
          Data
        </Typography>

        {/* Loading */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", bgcolor: "#BBDEFB", textAlign: "center" }}>Bulan</TableCell>
                  <TableCell sx={{ fontWeight: "bold", bgcolor: "#BBDEFB", textAlign: "center" }}>Liter</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>{data.time}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{data.totalUsedWater}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default ReportPage;
