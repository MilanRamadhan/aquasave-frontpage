"use client";

import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";
import API from "@/app/utils/API";
import Link from "next/link";

const laporanData = [
  { bulan: "Januari", liter: "2500L" },
  { bulan: "Februari", liter: "3100L" },
  { bulan: "Maret", liter: "2700L" },
  { bulan: "April", liter: "4050L" },
  { bulan: "Mei", liter: "5000L" },
  { bulan: "Juni", liter: "5025L" },
  { bulan: "Juli", liter: "2505L" },
  { bulan: "Agustus", liter: "3701L" },
  { bulan: "September", liter: "4070L" },
  { bulan: "Oktober", liter: "4070L" },
  { bulan: "November", liter: "4070L" },
  { bulan: "Desember", liter: "4070L" },
];

const ReportPage = () => {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#E3F2FD" }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#2D70AB", color: "white" }}>
        <IconButton onClick={router.back} sx={{ color: "white" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>Laporan</Typography>
      </Box>

      <Paper elevation={3} sx={{ m: 2, borderRadius: 3, overflow: "hidden" }}>
        <Typography variant="h6" sx={{ p: 2, bgcolor: "#D1E9FF", textAlign: "center", fontWeight: "bold" }}>Data</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#BBDEFB" }}>Bulan</TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "#BBDEFB" }}>Liter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laporanData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.bulan}</TableCell>
                  <TableCell>{row.liter}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReportPage;
