"use client";

import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import { useState } from "react";
import API from "@/app/utils/API";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SensorSettings = () => {
  const [sensors, setSensors] = useState(["Sensor 1"]);

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
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Sensor Yang Terpasang</Typography>
          {sensors.map((sensor, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
              <Paper sx={{ p: 1, borderRadius: 5, bgcolor: "#E3F2FD", width: "60%", textAlign: "center" }}>
                <Typography>{sensor}</Typography>
              </Paper>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default SensorSettings;
