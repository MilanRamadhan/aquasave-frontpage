"use client";

import { Box, Typography, Paper, Button, IconButton, CircularProgress, Toolbar, AppBar } from "@mui/material";
import { useState, useEffect } from "react";
import API from "@/app/utils/API";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "@/app/hooks/UseAuth";
import { useRouter } from "next/navigation";

const SensorSettings = () => {
  const auth = useAuth();
  const navigation = useRouter();
  const [sensors, setSensors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading

  const getTools = () => {
    setLoading(true); // Set loading menjadi true saat fetching
    API.get(`/tool/getToolsByUserId/${auth.auth.user?.id}`)
      .then((res) => {
        console.log(res.data.data);
        setSensors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading menjadi false setelah fetching selesai
      });
  };

  useEffect(() => {
    getTools();
  }, []);

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

      {/* Sensor Section */}
      <Box sx={{ p: 2, mt: 5 }}>
        <Paper sx={{ mt: 3, p: 2, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Sensor Yang Terpasang
          </Typography>
          {loading ? ( // Tampilkan loading jika dalam proses fetching
            <CircularProgress />
          ) : (
            sensors.map((sensor: any, index: number) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                <Paper sx={{ p: 1, borderRadius: 5, bgcolor: "#E3F2FD", width: "100%", textAlign: "center" }}>
                  <Typography variant="h6">{sensor.toolName}</Typography>
                  <Typography variant="body1">
                    Total penggunaan Air : <span className="font-bold">{sensor.totalUsedWater} Liter</span>
                  </Typography>
                </Paper>
              </Box>
            ))
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default SensorSettings;
