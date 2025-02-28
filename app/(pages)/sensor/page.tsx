"use client";

import { Box, Typography, Paper, Button, IconButton, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import API from "@/app/utils/API";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "@/app/hooks/UseAuth";

const SensorSettings = () => {
  const auth = useAuth();
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
      <Box sx={{ bgcolor: "#3B6994", color: "white", p: 2, display: "flex", alignItems: "center" }}>
        <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <ArrowBackIcon sx={{ cursor: "pointer", mr: 2 }} />
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Penggunaan Air
        </Typography>
      </Box>

      {/* Sensor Section */}
      <Box sx={{ p: 2 }}>
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
