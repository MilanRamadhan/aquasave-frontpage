"use client";

import API from "@/app/utils/API";
import Link from "next/link";
import { Box, Typography, Paper, AppBar, CircularProgress } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/UseAuth";

const tips = [
  {
    title: "Keran Air Menyala lebih Lama Dari Biasanya",
    message: "Tutup Segera untuk Menghemat!",
    time: "Today",
  },
  {
    title: "Penggunaan Air Anda Hari ini Sudah Melebihi 500 Liter",
    message: "Mari lebih Hemat Untuk Sisa Hari ini.",
    time: "Yesterday",
  },
  {
    title: "Anda Telah Mencapai Batas Penggunaan Air Hari Ini",
    message: "Pastikan Penggunaan Air lebih Efisien.",
    time: "This Week",
  },
];

const Notifikasi = () => {
  const auth = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading

  const getNotifications = () => {
    setLoading(true); // Set loading true saat mulai fetching
    API.get(`/notification/${auth.auth.user?.id}`)
      .then((res) => {
        console.log(res.data.data);
        setNotifications(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading false setelah fetching selesai
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100vh", bgcolor: "#F8F9FA", overflowY: "auto" }}>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(45deg, #1E3A8A 30%, #3B82F6 90%)",
          color: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "0.5px" }}>
            Notifikasi
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Konten */}
      <Box sx={{ p: 2, mt: 10 }}>
        {loading ? ( // Menampilkan loading jika dalam proses fetching
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          notifications.map((notification: any, index: number) => (
            <Paper key={index} sx={{ p: 2, mb: 2, borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3B6994" }}>
                {notification.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line" }}>
                {notification.message}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line" }}>
                {new Date(notification.createdAt).toLocaleString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Notifikasi;
