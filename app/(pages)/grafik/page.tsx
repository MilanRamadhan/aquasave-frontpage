"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";
import API from "@/app/utils/API";
import { Box, Typography, Paper, CircularProgress, FormControl, Select, MenuItem, AppBar, Toolbar, IconButton } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GrafikPage: React.FC = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [periode, setPeriode] = useState("hari"); // Mengubah dari "harian" ke "hari"
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
      setData(res.data.data);
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

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Grafik */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: "bold", color: "#3B6994" }}>
              Penggunaan Air {periode.charAt(0).toUpperCase() + periode.slice(1)}
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalUsedWater" stroke="#4CAF50" strokeWidth={2} fill="#A5D6A7" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Statistik */}
          <Paper
            sx={{
              p: 2,
              mt: 2,
              mx: 2,
              bgcolor: "#E3F2FD",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              boxShadow: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {totalUsedWater ?? 0} L
              </Typography>
              <Typography variant="body2">Penggunaan Total</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {data.length > 0 ? Math.max(...data.map((d) => d.totalUsedWater)) : 0} L
              </Typography>
              <Typography variant="body2">Tertinggi</Typography>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default GrafikPage;
